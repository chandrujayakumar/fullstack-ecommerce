import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogin } from "../../../features/admin/adminThunks"
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from "../../../layouts"

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { adminLoading, isAdminAuthenticated, admin, adminMessage, adminError } = useSelector((state) => state.admin)

  const handleLoginForm = (event) =>{
    event.preventDefault()

    const loginForm = new FormData()
    loginForm.set("email", email)
    loginForm.set("password", password)

    dispatch(adminLogin(loginForm))
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    if(isAdminAuthenticated){
      setEmail("")
      setPassword("")
      navigate("/restricted-access/admin/dashboard")
    }
  }, [isAdminAuthenticated])
  
  return (
    <>
      {adminLoading ? (
        <Loader />
      ) : (
        <div className='fixed left-0 top-0 w-full h-full bg-white'>
          <div className='w-full'>
            <Link className='btn-fill max-w-[100px]' to="/">Home</Link>
          </div>
          <div className='flex-center w-full h-full'>
            <form onSubmit={handleLoginForm}>
              <div className='p-[2rem] rounded-[4px] shadow-[0_1px_10px_2px_rgba(0,0,0,0.1)] flex-center flex-col gap-[3.2rem]'>
                  <div className='relative text-[25px] font-bold'>
                    Login
                    <div className='absolute bottom-[-8px] w-full h-[3px] bg-primary rounded-full'></div>
                  </div>
                  <div className='flex flex-col gap-[2.5rem]'>
                    <input 
                      className='px-[1.2rem] py-[0.5rem] bg-[#ebebeb] rounded-[2px] border-[1px] border-transparent focus:outline-none focus:border-lightGray3 focus:bg-transparent transition-colors duration-200' 
                      type="email" 
                      placeholder='Email'
                      value={email}
                      onChange={handleEmailChange}
                      required 
                    />
                    <input 
                      className='px-[1.2rem] py-[0.5rem] bg-[#ebebeb] rounded-[2px] border-[1px] border-transparent focus:outline-none focus:border-lightGray3 focus:bg-transparent transition-colors duration-200' 
                      type="password" 
                      placeholder='Password'
                      value={password}
                      onChange={handlePasswordChange}
                      required 
                    />
                  </div>
                  <button className='btn-fill w-full rounded-[2px]'>
                    Login
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Login