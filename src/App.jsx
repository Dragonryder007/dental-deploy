import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { recordVisit } from './utils/visitorTracker';

import Chatbot from './components/Chatbot';

// Pages
import Home from './pages/Home';
import SmileDesigning from './pages/SmileDesigning';
import AlignersBraces from './pages/AlignersBraces';
import DentalImplants from './pages/DentalImplants';
import BookingPage from './pages/BookingPage';
import AssessmentPage from './pages/Assessment';
import ResultsPage from './pages/Results';
import FAQPage from './pages/FAQ';
import ImageUpload from './components/ImageUpload';
import { Login, Register } from './pages/Placeholders';
import Admin from './pages/Admin';
import Reviews from './pages/Reviews';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;
    recordVisit();
  }, [isAdmin]);

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/smile-designing" element={<SmileDesigning />} />
        <Route path="/aligners-braces" element={<AlignersBraces />} />
        <Route path="/dental-implants" element={<DentalImplants />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/ai-preview" element={<ImageUpload />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!isAdmin && <FloatingWhatsApp />}
      {!isAdmin && <Chatbot />}
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;
