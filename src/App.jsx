import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
])

function App() {

  return (

      <div>
        <RouterProvider router = {appRouter}/>
      </div>

  )
}

export default App
