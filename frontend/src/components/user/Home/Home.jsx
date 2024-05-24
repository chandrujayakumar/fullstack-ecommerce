import React from 'react'
import { Loader } from "../../../layouts"
import { useSelector } from 'react-redux'

const Home = () => {

  const { loading } = useSelector((state) => state.user)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          
        </div>
      )}
    </>
  )
}

export default Home