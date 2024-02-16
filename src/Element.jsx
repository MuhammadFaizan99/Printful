import React from 'react'
import Navbar from './component/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './component/Footer/Footer'

export default function Element() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
