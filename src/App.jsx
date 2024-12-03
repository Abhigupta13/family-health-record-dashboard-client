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
import ViewProfile from './components/ViewProfile';
import ForgotPassword from './components/FogotPassword';
import Logout from './components/auth/Logout';
import PresciptionTrack from './components/PresciptionTrack';
import DoctorAccess from './components/DoctorAccess';
import PrescriptionEdit from './components/PrescriptionEdit';
import OcrSection from './components/OcrSection';
import CtaSection from './components/CtaSection';
import Testimonial from './components/Testimonial';
import HealthSupport from './components/HealthSupport';
import ContactUs from './components/ContactUs';
import ChatWithUs from './components/ChatWithUs';
import HealthInsight from './components/HealthInsight';
import EmergencyContact from './components/EmergencyCall';

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
  {
    path: "/profile/view-profile",
    element: <ViewProfile/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>
  },
  {
    path: "/logout",
    element: <Logout/>
  },
  {
    path: "/prescription-tracking",
    element: <PresciptionTrack/>
  },
  {
    path: "/doctor-access",
    element: <DoctorAccess/>
  },
  {
    path: "/health-support",
    element: <HealthSupport/>
  },
  {
    path: "/prescription-edit",
    element: <PrescriptionEdit/>
  },
  {
    path: "/ocr-section",
    element: <OcrSection/>
  },
  {
    path: "/cta-section",
    element: <CtaSection/>
  },
  {
    path: "/testimonial",
    element: <Testimonial/>
  },
  {
    path: "/contact-us",
    element: <ContactUs/>
  },
  {
    path: "/emergency-call",
    element: <EmergencyContact/>
  },
  {
    path: "/chat-with-us",
    element: <ChatWithUs/>
  },
  {
    path: "/health-insight",
    element: <HealthInsight/>
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
