import React from 'react'
import { Loader } from "../../../layouts"
import { useSelector } from 'react-redux'

const Home = () => {

  const { loading } = useSelector((state) => state.user)
  const { adminLoading } = useSelector((state) => state.admin)

  return (
    <>
      {loading || adminLoading ? (
        <Loader />
      ) : (
        <div>
          Home
        </div>
      )}
    </>
  )
}

export default Home