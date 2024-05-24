import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { CiUser } from "react-icons/ci";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { Login } from "../../components"
import { logoutuser } from '../../features/user/userThunks';

const header = () => {

  const dispatch = useDispatch()

  const { loading, message, error, isAuthenticated, user } = useSelector((state) => state.user)

  const [showDropDown, setShowDropDown] = useState(false)
  const [popLogin, setPopLogin] = useState(false)

  
  const handleMouseHover = (isHovering) => {
    setShowDropDown(isHovering)
  }

  const openLogin = () => {
    setShowDropDown(false)
    setPopLogin(true)
  }


  const logout = () => {
    setShowDropDown(false)
    dispatch(logoutuser())
  }
  
  return (
    <>
    <Login trigger={popLogin} setTrigger={setPopLogin}/>
      <div className='flex-center w-full h-auto px-[5rem] py-[1.5rem]'>
        <div className='flex justify-between w-full'>
          <div className='flex-center'>
            <Link to="/">
              FullStack eCommerce
            </Link>
          </div>
          <div>
            <input type="text" placeholder='' />
          </div>
          <div className='flex items-center gap-[3rem] font-medium text-[14px]'>
            <div className={`relative ${popLogin ? 'z-[-1]' : 'z-0'} flex-center h-full`} onMouseEnter={() => handleMouseHover(true)} onMouseLeave={() => handleMouseHover(false)}>
                <div className='flex-center gap-[0.5rem]'>
                  <CiUser className='text-[18px]' />
                  Profile
                </div>
              <div className='absolute top-0 h-[48px] w-full'>
              </div>
              {showDropDown && (
                isAuthenticated ? (
                  <div className={`bg-white absolute top-[48px] w-[250px] shadow-[0_1px_10px_rgba(0,0,0,0.08)] border-[1px] border-[#f5f5f6] p-[1rem] rounded-[2px]`}>
                    <div className='flex flex-col gap-[1rem] font-normal items-start'>
                      <div className='border-b-[1px] border-lightGray3 w-full pb-[0.7rem]'>
                        <h2 className='font-bold text-[20px] text-darkGray2'>Hi,</h2>
                        <h2 className='truncate font-bold text-[25px] text-mediumGray3'>{user[0].fullname.split(' ')[0]}</h2>
                      </div>
                      <div className='flex flex-col font-normal gap-[0.4rem] w-full border-b-[1px] border-lightGray3 pb-[1rem] mb-[0.3rem]'>
                        <Link onClick={() => {setShowDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/account"><FontAwesomeIcon icon={faUser} />Account</Link>
                        <Link onClick={() => {setShowDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/orders"><FontAwesomeIcon icon={faBox} />Orders</Link>
                        <Link onClick={() => {setShowDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/contactus"><FontAwesomeIcon icon={faAddressBook} />Contact Us</Link>
                      </div>
                      <button className='btn-fill w-full'
                        onClick={logout}
                        >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={` bg-white absolute top-[48px] w-[222px] shadow-[0_1px_10px_rgba(0,0,0,0.08)] border-[1px] border-[#f5f5f6] p-[1rem] rounded-[2px]`}>
                    <div className='flex flex-col gap-[1rem] font-normal items-start'>
                      <div>
                        <h2 className='font-bold text-[25px]'>Hello</h2>
                        <p className='text-mediumGray text-[13px]'>Login to access your account</p>
                      </div>
                      <button className='btn w-full'
                        onClick={openLogin}
                        >
                        Login/Signup
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
            
            <Link className='flex-center gap-[0.5rem]' to="/cart"><PiShoppingCartSimpleThin className='text-[19px]' />Cart</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default header