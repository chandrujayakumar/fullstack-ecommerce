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
import { SellerLogin, Apply, MainPage, SellerDashboard, SellerProducts, AddProduct } from './components/seller'
import { loaduser } from './features/user/userThunks'
import { loadSeller } from './features/seller/sellerThunks'
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
  const { sellerLoading, isSellerAuthenticated, sellerMessage, sellerError } = useSelector((state) => state.seller)

  useEffect(() => {
    
    if(!hasLoadedUser.current){
      dispatch(loaduser())
      dispatch(loadadminuser())
      dispatch(loadSeller())
      hasLoadedUser.current = true
    }

    if((!loadingLogin && message) || (!loading && message) || (!adminLoading && adminMessage) || (!sellerLoading && sellerMessage)){
      if(adminMessage){
        toast.success(adminMessage)
      }else if(sellerMessage){
        toast.success(sellerMessage)
      }else{
        toast.success(message)
      }
    }else if((!loadingLogin && error) || (!loading && error) || (!adminLoading && adminError) || (sellerError && !sellerLoading)){
      if(adminError){
        toast.error(adminError.message)
      }else if(sellerError){
        toast.error(sellerError.message)
      }else{
        toast.error(error.message)
      }
    }

  }, [dispatch, loading, adminLoading, loadingLogin, message, adminMessage, error, adminError, sellerLoading, sellerMessage, sellerError])

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
      <div className='z-[5000] fixed top-0 left-0 right-0 shadow-[0_3px_16px_-4px_rgba(0,0,0,0.2)] bg-white'>
        <Header />
      </div>
      <div className='mt-[87px]'>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/account' element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
          <Route exact path='/orders' element={<Orders />} />
          <Route exact path='/admin/login' element={isAdminAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login />} />
          <Route exact path='/admin/dashboard' element={isAdminAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route exact path='/seller' element={isSellerAuthenticated ? <Navigate to="/seller/dashboard"  />: <MainPage /> } />
          <Route exact path='/seller/apply' element={isSellerAuthenticated ? <Navigate to="/seller/dashboard" /> : <Apply /> } />
          <Route exact path='/seller/login' element={isSellerAuthenticated ? <Navigate to="/seller/dashboard" /> : <SellerLogin /> }/>
          <Route exact path='/seller/dashboard' element={isSellerAuthenticated ? <SellerDashboard /> : <Navigate to="/" /> }/>
          <Route exact path='/seller/dashboard/products' element={isSellerAuthenticated ? <SellerProducts /> : <Navigate to="/" />} />
          <Route exact path='/seller/dashboard/products/add' element={isSellerAuthenticated ? <AddProduct /> : <Navigate to="/" />} />
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
