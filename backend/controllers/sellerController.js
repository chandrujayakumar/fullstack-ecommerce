const { pool } = require("../config/database");
const catchAsyncErrors = require("../middleware/catchAsynErrors");
const errorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");
const { sendSellerToken } = require("../utils/jwtToken");
const cloudinary = require("../config/cloudinary");

//generate uuid

const generate_uuid = () => {
  return uuidv4();
};

//seller application

exports.sellerApplication = catchAsyncErrors(async (req, res, next) => {
  const { fullname, email, companyname, companyaddress, gstin } = req.body;

  const [existingSeller] = await pool.execute(
    "SELECT * FROM sellers WHERE gstin = ? || email = ?",
    [gstin, email]
  );
  const [appliedSeller] = await pool.execute(
    "SELECT * FROM seller_applications WHERE gstin = ? || email = ?",
    [gstin, email]
  );

  try {
    if (existingSeller.length > 0) {
      return next(new errorHandler("Already a seller", 400));
    } else {
      if (appliedSeller.length > 0) {
        return next(new errorHandler("Already applied."));
      } else {
        const uuid = generate_uuid();
        await pool.execute(
          "INSERT INTO seller_applications (id, full_name, email, company_name, company_address, gstin) VALUES (?, ?, ?, ?, ?, ?)",
          [uuid, fullname, email, companyname, companyaddress, gstin]
        );
        res.status(201).json({
          success: true,
          message: "Application submitted successfully",
        });
      }
    }
  } catch (error) {
    return next(new errorHandler("something went wrong", 500));
  }
});

//seller login

exports.sellerLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorHandler("Enter all the required fields.", 400));
  }

  const [seller] = await pool.execute("SELECT * FROM sellers WHERE email = ?", [
    email,
  ]);
  const [pass] = await pool.execute(
    "SELECT password FROM sellers WHERE email = ?",
    [email]
  );

  if (seller.length > 0 && pass[0].password === password) {
    sendSellerToken(seller, 201, res);
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid email or password.",
    });
  }
});

//logout

exports.sellerLogout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("SELLERAUTHCOOKIE", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Seller Logged Out.",
  });
});

//get seller details (dashboard)

exports.getSellerDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.user[0][0];

  try {
    const [sellerUser] = await pool.execute(
      "SELECT * FROM sellers WHERE id = ?",
      [id]
    );

    if (sellerUser.length > 0) {
      res.status(200).json({
        success: true,
        sellerUser,
      });
    } else {
      return next(new errorHandler("Seller not found", 404));
    }
  } catch (error) {
    return next(new errorHandler("Something went wrong", 500));
  }
});

//add product

exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, stock } = req.body;
  const { id } = req.user[0][0];

  if (!name || !description || !price || !stock) {
    return next(new errorHandler("Enter all the required fields", 400));
  }

  try {
    const [existingProduct] = await pool.execute(
      "SELECT * FROM products WHERE name = ? && seller_id = ?",
      [name, id]
    );

    if (existingProduct.length > 0) {
      return next(
        new errorHandler("You already have a product with this name", 400)
      );
    } else {
      if (!req.file) {
        return next(new errorHandler("No image file provided", 400));
      }

      const publicId = generate_uuid();

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `/products/${id}`,
            public_id: publicId,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(req.file.buffer);
      });

      const image_url = result.secure_url;

      await pool.execute(
        "INSERT INTO products (id, seller_id, name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [publicId, id, name, description, price, stock, image_url]
      );

      res.status(201).json({
        success: true,
        message: "product added successfully",
        data: {
          publicId,
          name,
          description,
          price,
          stock,
          image_url,
        },
      });
    }
  } catch (error) {
    return next(new errorHandler(`Something went wrong ${error.message}`, 500));
  }
});

//delete product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { public_id } = req.body;
  const { id } = req.user[0][0];

  try {
    const [existingProduct] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [public_id]
    );

    if (existingProduct.length > 0) {
      cloudinary.uploader.destroy(
        `products/${id}/${public_id}`,
        (error, result) => {
          if (error) {
            return next(new errorHandler("Error deleting the product", 500));
          }

          pool
            .execute("DELETE FROM products WHERE id = ?", [public_id])
            .then(() => {
              res.status(200).json({
                success: true,
                message: "product deleted successfully",
              });
            })
            .catch((error) => {
              return next(new errorHandler("Error deleting the product", 400));
            });
        }
      );
    } else {
      return next(new errorHandler("product doesn't exist", 404));
    }
  } catch (error) {
    return next(new errorHandler("Something went wrong", 500));
  }
});

//update product details

exports.updateProductDetails = catchAsyncErrors(async (req, res, next) => {
  const { id, name, description, price, stock } = req.body;

  if (!id || !name || !description || !price || !stock) {
    return next(new errorHandler("No fields should be left empty", 400));
  }

  try {
    const [existingProduct] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    if (existingProduct.length === 0) {
      return next(new errorHandler("No product exist"));
    } else {
      const seller_id = existingProduct[0].seller_id;
      const [sameNameProduct] = await pool.execute(
        "SELECT * FROM products WHERE name = ? AND id <> ? AND seller_id = ?",
        [name, id, seller_id]
      );

      if (sameNameProduct.length > 0) {
        return next(
          new errorHandler("You already have a product with this name", 400)
        );
      } else {
        if (!req.file) {
          await pool.execute(
            "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ? && seller_id = ?",
            [name, description, price, stock, id, seller_id]
          );

          res.status(200).json({
            success: true,
            message: "Product updated successfully",
          });
        } else {
          const publicId = id;

          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: `/products/${seller_id}`,
                public_id: publicId,
                overwrite: true,
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );
            stream.end(req.file.buffer);
          });

          const image_url = result.secure_url;

          await pool.execute(
            "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image_url = ? WHERE id = ? AND seller_id = ?",
            [name, description, price, stock, image_url, id, seller_id]
          );

          res.status(201).json({
            success: true,
            message: "product updated successfully",
            data: {
              publicId,
              name,
              description,
              price,
              stock,
              image_url,
            },
          });
        }
      }
    }
  } catch (error) {
    return next(new errorHandler(`Something went wrong ${error.message}`, 500));
  }
});
