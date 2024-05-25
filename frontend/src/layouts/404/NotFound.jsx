import React from 'react'
import { CgUnavailable } from "react-icons/cg";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
     <div className='w-full h-[80vh]'>
        <div className='flex-center flex-col h-full'>
            <h1 className='text-[120px] font-extrabold flex-center'>4<CgUnavailable className='text-primary' />4</h1>
            <p className='font-light mb-[2.5rem]'>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className='btn-fill'>Go to Home</Link>
        </div>
     </div>
    </>
  )
}

export default NotFound