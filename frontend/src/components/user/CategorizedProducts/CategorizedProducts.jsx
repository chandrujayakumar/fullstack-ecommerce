import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../features/cart/cartThunks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StarIcon from '@mui/icons-material/Star';
import OutlinedInput from '@mui/material/OutlinedInput';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Rating, Select, Pagination, Breadcrumbs, Typography  } from '@mui/material';
import { Loader } from '../../../layouts';
import { categoriesWithLinks } from '../data';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ITEM_HEIGHT = 48; 
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
            borderRadius: 7
        },
    },
    MenuListProps: {
        style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2px'
        },
    },
};




const CategorizedProducts = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { category: urlCategory } = useParams()

    const { productLoading, productDetails, products } = useSelector((state) => state.products)
    const { loading, isAuthenticated } = useSelector((state) => state.user);
  
    const [productCardHovered, setProductCardHovered] = useState(null)
    const [sortValue, setSortValue] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
  

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
        window.scrollTo(0, 0);
        if (urlCategory) {
            const foundCategory = categoriesWithLinks.find(cat => cat.link === urlCategory);
            if (foundCategory) {
                setCategoryName(foundCategory.name)
            }
        }
      }, [urlCategory]);

      const handleSortValueChange = (e) => {
        setSortValue(e.target.value)
      }

      const sortProducts = (products, sortValue) => {
        switch (sortValue) {
            case 'L2H':
                return [...products].sort((a, b) => a.price - b.price);
            case 'H2L':
                return [...products].sort((a, b) => b.price - a.price);
            default:
                return products;
        }
    };
    
        const filteredProducts = useMemo(() => {
            let filtered = [...products];
            if (categoryName) {
                filtered = filtered.filter(product => product.category === categoryName);
            }
            return sortProducts(filtered, sortValue);
        }, [products, categoryName, sortValue]);



        const handleChangePage = (event, value) => {
          setCurrentPage(value);
          window.scrollTo(0, 0);
        };
 
    return (
    <>
        {loading || productLoading ? (
            <Loader />
        ) : (
            <>
                <div className='flex flex-col w-full items-center py-[2rem] gap-[1rem]'>
                    <div className='flex justify-start items-start max-w-[1200px] w-full'>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link to="/" className='hover:underline ' color="inherit">
                                Home
                            </Link>
                            <p className='text-primary '>{categoryName}</p>
                        </Breadcrumbs>
                    </div>
                    {/* <h2 className='self-center font-extrabold text-darkGray text-[30px]'>{categoryName}</h2> */}
                    <div className='flex flex-col w-full max-w-[1200px] gap-[1rem]'>
                        <div className='w-full flex justify-end items-center gap-[2rem]'>
                            <FormControl size='small' sx={{ minWidth: 120 }}>
                                <InputLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Sort By</InputLabel>
                                <Select
                                    input={<OutlinedInput label="Tag" />} 
                                    value={sortValue} 
                                    onChange={handleSortValueChange}
                                    sx={{ borderRadius: '2px' }}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="L2H">Lowest to Highest Price</MenuItem>
                                    <MenuItem value="H2L">Highest to Lowest Price</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="flex-center w-full gap-[4rem]">
                            <div className="grid grid-cols-4 gap-[2rem]">
                            {filteredProducts.map((product, index) => (
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
                                    className={`absolute bottom-0 left-0 right-0 rounded-[0_0_3px_3px] bg-black h-[40px] text-white text-[13px] hover:bg-darkGray font-medium transition-all duration-50 ${productCardHovered === index ? "opacity-1" : "opacity-0"}`} >
                                    Add to Cart
                                    </button>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className='flex-center w-full mt-[2rem]'>
                            <Pagination
                                count={Math.ceil(filteredProducts.length / productsPerPage)}
                                page={currentPage}
                                onChange={handleChangePage}
                                color="primary"
                            />
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
  )
}

export default CategorizedProducts