import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/shared/Navbar';
import Dashboard from './components/Dashboard';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import TermsCondition from './components/TermsCondition';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "/navbar",
    element: <Navbar/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/terms",
    element: <TermsCondition/>
  },
]);

function App() {

  return (
    <div>
        <RouterProvider router = {appRouter}/>
    </div>
  )
}

export default App;
