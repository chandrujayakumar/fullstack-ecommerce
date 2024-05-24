import { useEffect, useRef, useState } from 'react'
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate
} from 'react-router-dom'
import { Header, Footer } from './layouts'
import { Home, Account } from './components'
import { loaduser } from './features/user/userThunks'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './components/user/Orders/Orders'

function App() {

  const dispatch = useDispatch()
  const hasLoadedUser = useRef(false)

  const { loading, loadingLogin, isAuthenticated, message, error } = useSelector((state) => state.user)

  useEffect(() => {
    if(!hasLoadedUser.current){
      dispatch(loaduser())
      hasLoadedUser.current = true
    }

    if(!loadingLogin && message || !loading && message){
      toast.success(message)
    }else if(!loadingLogin && error){
      toast.error(error.message)
    }

  }, [dispatch, loading, loadingLogin, message, error])

  return (
    <Router>
      <ToastContainer 
            position='bottom-center'
            autoClose={5000}
            hideProgressBar={true}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            transition={Slide}
            theme='dark'
        />
      <div className='fixed top-0 left-0 right-0 shadow-[0_3px_16px_-4px_rgba(0,0,0,0.2)]'>
        <Header/>
      </div>
      <div className='mt-[87px] h-[200vh]'>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/account' element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
          <Route exact path='/orders' element={<Orders />} />
        </Routes>
      </div>
      <div>
        <Footer/>
      </div>
    </Router>    
  )
}

export default App
