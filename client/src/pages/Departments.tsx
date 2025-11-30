import React from 'react'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import Header from '../components/Departments/Header'
import AllDepartments from '../components/Departments/AllDepartments'

const Departments = () => {
  return (
    <>
      <Navbar/>
        <div className='bg-[#e4d9f24d]'>
          <Header/>
          <AllDepartments/>
        </div>
      <Footer/>
    </>
  )
}

export default Departments
