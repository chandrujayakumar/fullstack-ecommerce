import { useEffect, useRef, useState } from 'react'
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate
} from 'react-router-dom'
import { Header, Footer } from './layouts'
import { Home, Account } from './components'
import Orders from './components/user/Orders/Orders'
import { Login, Dashboard } from './components/admin'
import { loaduser } from './features/user/userThunks'
import { loadadminuser } from './features/admin/adminThunks'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './layouts/404/NotFound'

function App() {

  const dispatch = useDispatch()
  const hasLoadedUser = useRef(false)

  const { loading, loadingLogin, isAuthenticated, message, error } = useSelector((state) => state.user)
  const { adminLoading, isAdminAuthenticated, adminMessage, adminError  } = useSelector((state) => state.admin)

  useEffect(() => {
    
    if(!hasLoadedUser.current){
      dispatch(loaduser())
      dispatch(loadadminuser())
      hasLoadedUser.current = true
    }

    if((!loadingLogin && message) || (!loading && message) || (!adminLoading && adminMessage)){
      if(adminMessage){
        toast.success(adminMessage)
        }else{
        toast.success(message)
        }
      }else if((!loadingLogin && error) || (!loading && error) || (!adminLoading && adminError)){
        if(adminError){
          toast.error(adminError.message)
        }else{
          toast.error(error.message)
        }
      }

  }, [dispatch, loading, adminLoading, loadingLogin, message, adminMessage, error, adminError])

  return (
    <Router>
      <ToastContainer 
            position='bottom-center'
            autoClose={4000}
            hideProgressBar={true}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            transition={Slide}
            stacked
            limit={5}
            theme='dark'
        />
      <div className='fixed top-0 left-0 right-0 shadow-[0_3px_16px_-4px_rgba(0,0,0,0.2)] bg-white'>
        <Header />
      </div>
      <div className='mt-[87px]'>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/account' element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
          <Route exact path='/orders' element={<Orders />} />
          <Route exact path='/admin/login' element={isAdminAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login />} />
          <Route exact path='/admin/dashboard' element={isAdminAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </div>
      <div>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
