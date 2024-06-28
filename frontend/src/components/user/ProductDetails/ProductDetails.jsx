import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductDetails } from '../../../features/products/productsThunks'
import StarIcon from '@mui/icons-material/Star';
import { Loader } from '../../../layouts'
import { Breadcrumbs, Rating } from '@mui/material'
import { toast } from 'react-toastify';
import ButtonLoader from '../../../layouts/ButtonLoader/ButtonLoader';
import { addToCart } from '../../../features/cart/cartThunks';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const ProductDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {product_id} = useParams()

  const { isAuthenticated } = useSelector((state) => state.user)
  const { productDetails, productLoading } = useSelector((state) => state.products)
  const { cartLoading, cart } = useSelector((state) => state.cart)

  const handleAddtoCart = (product_id) => {
    if(isAuthenticated){
      dispatch(addToCart(product_id))
      navigate('/cart')
    }else{
      toast.error("Login to add products to the cart")
    }
  }

  const handleGotoCart = () => {
    if(isAuthenticated){
      navigate('/cart')
    }else{
      toast.error("Login to add products to the cart")
    }
  }


  useEffect(() => {
    dispatch(getProductDetails(product_id))
  }, [dispatch])

  return (
    <>
      {productLoading ? (
        <Loader />
      ) : (
        <>
          <div className='w-full flex-center'>
              <div className='flex justify-start items-start max-w-[1200px] w-full mt-[1rem]'>
                  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                      <Link to="/" className='hover:underline ' color="inherit">
                          Home
                      </Link>
                      <p className='text-primary text-ellipsis whitespace-nowrap overflow-hidden max-w-[170px]'>{productDetails.map((product) => product.name)}</p>
                  </Breadcrumbs>
              </div>
          </div>
          <div className='flex justify-center w-full py-[2rem]'>
            <div className='max-w-[1100px] w-full flex'>
              {productDetails.map((product, key) => (
                <div key={product.id} className='flex gap-[3rem]'>
                  <div className='flex-center'>
                    <img className='min-w-[450px] max-w-[450px] flex-1 p-[0.5rem] rounded-[10px]' src={product.image_url} alt={product.name} />
                  </div>
                  <div className='flex flex-col py-[2rem] gap-[2rem] flex-[2]'>
                    <div className='flex flex-col gap-[0.5rem]'>
                      <h2 className='font-extrabold text-[35px] '>{product.name}</h2>
                      <p className='text-lightGray text-[15px]'>#{product.category}</p>
                      <Rating
                        name="text-feedback"
                        value={4}
                        readOnly
                        precision={0.5}
                        size="large"
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </div>
                    <div>
                      <p className='text-[green] font-medium text-[14px]'>Best Price</p>
                      <div className="flex items-center gap-[0.7rem]">
                          <p className="font-[Roboto] text-black font-semibold text-[30px]">₹{new Intl.NumberFormat('en-IN').format(product.price)}</p>
                          <p className="line-through font-[Roboto] text-[#777] text-[22px] font-normal">{product.mrp ? `₹${new Intl.NumberFormat('en-IN').format(product.mrp)}` : ""}</p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-[0.5rem]'>
                      <p className='font-bold text-[14px] text-darkGray2'>Description</p>
                      <p className='text-[14px] text-mediumGray'>
                        {product.description}
                      </p>
                    </div>
                    <div className='w-fit'>
                      {cart.find((item) => item.id === product.id) ? (
                          <button
                            onClick={() => handleGotoCart()}
                            disabled={cartLoading}  
                            className='bg-primary hover:bg-secondary hover:shadow-lg disabled:bg-[#ffa1a1] transition-all duration-150 py-[0.8rem] w-[190px] text-white font-medium shadow-md rounded-[3px]'>
                              {cartLoading ? (
                                <ButtonLoader />
                              ) : (
                                  <>
                                    Go to Cart
                                  </>
                              )}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddtoCart(product.id)}
                            disabled={cartLoading}  
                            className='bg-primary hover:bg-secondary hover:shadow-lg disabled:bg-[#ffa1a1] transition-all duration-150 py-[0.8rem] w-[190px] text-white font-medium shadow-md rounded-[3px]'>
                              {cartLoading ? (
                                <ButtonLoader />
                              ) : (
                                    <>
                                      Add to Cart
                                    </>
                                  )
                              }
                          </button>
                        )}
                    </div>
                  </div>
              </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails