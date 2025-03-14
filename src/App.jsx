import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import TermsCondition from './components/TermsCondition';
import ViewProfile from './components/ViewProfile';
import ForgotPassword from './components/FogotPassword';
import Logout from './components/auth/Logout';
import PrescriptionTrack from './components/PresciptionTrack';
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
import MemberDetails from './components/viewDetailsPage';
import AuthOptions from './components/auth/AuthOptions'; 
import Navbar from './components/shared/Navbar';
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/isLogged', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (response.ok && data.isLoggedIn) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthOptions />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} 
          />
          <Route path="/terms" element={<TermsCondition />} />
          <Route path="/profile/view-profile" element={<ViewProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/prescription-tracking" element={<PrescriptionTrack />} />
          <Route path="/doctor-access" element={<DoctorAccess />} />
          <Route path="/health-support" element={<HealthSupport />} />
          <Route path="/prescription-edit" element={<PrescriptionEdit />} />
          <Route path="/ocr-section" element={<OcrSection />} />
          <Route path="/cta-section" element={<CtaSection />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/emergency-call" element={<EmergencyContact />} />
          <Route path="/chat-with-us" element={<ChatWithUs />} />
          <Route path="/health-insight" element={<HealthInsight />} />
          <Route path="/family-member/:id/details" element={<MemberDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
