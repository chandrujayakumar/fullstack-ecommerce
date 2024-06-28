import React, { useEffect, useRef, useState } from "react";
import { Loader } from "../../../layouts";
import ButtonLoader from "../../../layouts/ButtonLoader/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../../../layouts/Carousel/Carousel";
import CategoriesCarousel from "../../../layouts/CategoriesCarousel/CategoriesCarousel";
import { Button, Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from "../../../features/cart/cartThunks";
import { FaTruckFast } from "react-icons/fa6";
import { RiCustomerServiceLine } from "react-icons/ri";
import { GoShieldCheck } from "react-icons/go";

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { adminLoading } = useSelector((state) => state.admin);
  const { productLoading, products, productDetails } = useSelector((state) => state.products)
  const { cartLoading } = useSelector((state) => state.cart)

  const [productCardHovered, setProductCardHovered] = useState(null)

  const items = [
    "/carousel-img-1.png",
    "/carousel-img-2.png",
    "/carousel-img-3.png",
    "/carousel-img-4.png",
  ];

  const handleProductCardHover = (index) => {
    setProductCardHovered(index)
  }

  const handleMouseLeave = () => {
    setProductCardHovered(null)
  }

  const handleAddtoCart = (product_id) => {
    if(isAuthenticated){
      dispatch(addToCart(product_id))
      navigate('/cart')
    }else{
      toast.error("Login to add products to the cart")
    }
  }

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading || adminLoading ? (
        <Loader />
      ) : (
        <div className="flex-center py-[2rem]">
          <div className="max-w-[1280px] flex flex-col w-full gap-y-[4rem]">
            <Carousel items={items} />
            <div className="max-w-[1280px] w-full flex flex-col gap-y-[4rem]">
              <div className="flex flex-col gap-y-[2rem] w-full border-b-[1px] border-b-lightGray3 pb-[4rem]">
                  <h2 className="heading">
                    Browse By Category
                  </h2>
                <CategoriesCarousel />
              </div>
              <div className="flex flex-col gap-y-[2rem]">
                <div className="flex items-center justify-between">
                  <h2 className="heading">
                    Explore Products
                  </h2>
                  <Link to="/products" className="bg-primary text-white px-[1.2rem] py-[0.4rem] border-[1px] border-primary hover:bg-secondary transition-colors duration-100 font-medium rounded-[2px]">
                      View All products
                  </Link>
                </div>
                <div className="flex-center flex-col gap-[3rem]">
                  <div className="grid grid-cols-4 gap-[2rem]">
                    {products.slice(0, 8).map((product, index) => (
                      <div 
                        key={index}
                        onMouseOver={() => handleProductCardHover(index)} 
                        onMouseLeave={handleMouseLeave} 
                        className="relative flex flex-col bg-white w-[280px] h-fit shadow-lg border-[1px] border-lightGray4 rounded-[3px]"
                        >
                        <Link className="flex-center p-[2rem]" to={`/product/${product.id}`}>
                          <VisibilityOutlinedIcon className="absolute top-3 right-3"/>
                          <img className="h-[120px]" src={product.image_url} alt={product.name} />
                        </Link>
                        <div className="flex flex-col gap-[0.5rem] bg-[#fafafa] rounded-[0_0_3px_3px] px-[1.5rem] pt-[1.5rem] pb-[3.2rem]">
                          <h3 className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">{product.name}</h3>
                          <div className="flex items-center gap-[0.5rem]">
                              <p className="font-[Roboto] text-black font-semibold text-[17px]">₹{new Intl.NumberFormat('en-IN').format(product.price)}</p>
                              <p className="line-through font-[Roboto] text-[#777] text-[15px] font-normal">{product.mrp ? `₹${new Intl.NumberFormat('en-IN').format(product.mrp)}` : ""}</p>
                          </div>
                          <Rating
                            name="text-feedback"
                            value={4}
                            readOnly
                            precision={0.5}
                            size="medium"
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                        </div>
                          <button
                            onClick={() => handleAddtoCart(product.id)} 
                            disabled={cartLoading}
                            className={`absolute bottom-0 left-0 right-0 rounded-[0_0_3px_3px] bg-black h-[40px] text-white text-[13px] hover:bg-darkGray font-medium transition-all duration-50 ${productCardHovered === index ? "opacity-1" : "opacity-0"}`} >
                            {cartLoading ? (
                                <ButtonLoader width={20} height={20} />
                            ) : (
                              <>
                                Add to Cart
                              </>
                            )}
                          </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center my-[6rem]">
                <div className="flex max-w-[1000px] w-full justify-between">
                  <div className="flex-center flex-col gap-[1rem]">
                    <div className="flex-center text-white text-[45px] w-[120px] h-[120px] bg-black shadow-lg rounded-full">
                      <FaTruckFast />
                    </div>
                    <div className="flex-center flex-col">
                      <h3 className="font-bold text-[17px]">FREE AND FAST DELIVERY</h3>
                      <p className="text-[13px]">Free delivery for orders over ₹1000</p>
                    </div>
                  </div>
                  <div className="flex-center flex-col gap-[1rem]">
                    <div className="flex-center text-white text-[45px] w-[120px] h-[120px] bg-black shadow-lg rounded-full">
                      <RiCustomerServiceLine />
                    </div>
                    <div className="flex-center flex-col">
                      <h3 className="font-bold text-[17px]">24/7 CUSTOMER SERVICE</h3>
                      <p className="text-[13px]">Customer support is always there for you</p>
                    </div>
                  </div>
                  <div className="flex-center flex-col gap-[1rem]">
                    <div className="flex-center text-white text-[45px] w-[120px] h-[120px] bg-black shadow-lg rounded-full">
                      <GoShieldCheck />
                    </div>
                    <div className="flex-center flex-col">
                      <h3 className="font-bold text-[17px]">SECURE PAYMENTS</h3>
                      <p className="text-[13px]">Secure online transactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Home;
