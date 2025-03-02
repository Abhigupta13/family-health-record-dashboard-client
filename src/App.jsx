import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import MemberDetails from './components/ui/viewDetailsPage';
import AuthOptions from './components/auth/AuthOptions'; 

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth",
    element: <AuthOptions />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/terms",
    element: <TermsCondition />
  },
  {
    path: "/profile/view-profile",
    element: <ViewProfile />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/prescription-tracking",
    element: <PrescriptionTrack />
  },
  {
    path: "/doctor-access",
    element: <DoctorAccess />
  },
  {
    path: "/health-support",
    element: <HealthSupport />
  },
  {
    path: "/prescription-edit",
    element: <PrescriptionEdit />
  },
  {
    path: "/ocr-section",
    element: <OcrSection />
  },
  {
    path: "/cta-section",
    element: <CtaSection />
  },
  {
    path: "/testimonial",
    element: <Testimonial />
  },
  {
    path: "/contact-us",
    element: <ContactUs />
  },
  {
    path: "/emergency-call",
    element: <EmergencyContact />
  },
  {
    path: "/chat-with-us",
    element: <ChatWithUs />
  },
  {
    path: "/health-insight",
    element: <HealthInsight />
  },
  {
    path: "/family-member/:id/details",
    element: <MemberDetails />
  }
]);

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
