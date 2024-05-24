import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { Login } from "../../components"
import { logoutuser } from '../../features/user/userThunks';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            FullStack eCommerce
          </div>
          <div className='flex items-center gap-[3rem] font-medium text-[15px]'>
            <div className={`relative ${popLogin ? 'z-[-1]' : 'z-0'} flex-center h-full`} onMouseEnter={() => handleMouseHover(true)} onMouseLeave={() => handleMouseHover(false)}>
              <FontAwesomeIcon className='flex-center mr-[10px]' icon={faUser} />
              Profile
              <div className='absolute top-0 h-[48px] w-full'>
              </div>
              {showDropDown && (
                isAuthenticated ? (
                  <div className={` bg-white absolute top-[48px] w-[222px] shadow-[0_1px_10px_rgba(0,0,0,0.08)] border-[1px] border-[#f5f5f6] p-[1rem]`}>
                    <div className='flex flex-col gap-[1rem] font-normal items-start'>
                      <div>
                        <h2 className='font-bold text-[25px]'>Hi, {"\n"} {user[0].fullname}</h2>
                      </div>
                      <button className='btn-fill w-full'
                        onClick={logout}
                        >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={` bg-white absolute top-[48px] w-[222px] shadow-[0_1px_10px_rgba(0,0,0,0.08)] border-[1px] border-[#f5f5f6] p-[1rem]`}>
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
            
            <Link to="/cart"><FontAwesomeIcon className='mr-[10px]' icon={faCartShopping} />Cart</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default header