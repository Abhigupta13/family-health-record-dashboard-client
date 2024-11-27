import React from 'react'
import Navbar from './shared/Navbar'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import Login from './auth/Login'
import Signup from './auth/Signup'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <LandingPage/>
    </div>
  )
}

export default Home