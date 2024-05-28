import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { updateGlobalRecommendList } from './reducer/globalReducer'

const Layout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchFirstGlobal()
  }, [])

  const fetchFirstGlobal = async () => {
    const response = await axios.get('http://localhost:3001/getGlobal')
    if (response.status === 200) {
      console.log(response.data[0].globalRecommendation)
      dispatch(updateGlobalRecommendList(response.data[0].globalRecommendation))
    }
  }
  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default Layout
