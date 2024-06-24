const catchAsyncErrors = require("../middleware/catchAsynErrors")
const { pool } = require("../config/database")
const errorHandler = require("../utils/errorHandler")


//get all products

exports.getAllProducts = catchAsyncErrors(async(req, res, next) => {
    
    try{
        const [allProducts] = await pool.execute('SELECT * FROM products WHERE is_deleted = 0')
        
        if(allProducts.length > 0) {
            res.status(200).json({
                success: true,
                allProducts
            })
        }else{
            return next(new errorHandler("No products found", 404))
        }
    }catch(error){
        return next(new errorHandler("Something went wrong", 500))
    }
})

//get product details

exports.getProductDetails = catchAsyncErrors(async(req, res, next) => {
    const { product_id } = req.params

    if(!product_id){
        return next(new errorHandler("product id not provided", 400))
    }

    try{
        const [productDetails] = await pool.execute('SELECT * FROM products WHERE id = ?', [product_id])

        if(productDetails.length > 0){
            res.status(200).json({
                success: true,
                productDetails
            })
        }else{
            return next(new errorHandler("Product not found" ,404))
        }
    }catch(error){
        return next(new errorHandler(`Something went wrong ${error}`, 500))
    }
})