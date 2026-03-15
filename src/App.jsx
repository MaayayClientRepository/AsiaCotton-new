import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Certifications from './pages/Certifications';
import Sustainability from './pages/Sustainability';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';

function AppContent() {
  const location = useLocation();

  return (
    <div className="relative">
      <Navbar isHome={location.pathname === '/'} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/certifications" element={<PageTransition><Certifications /></PageTransition>} />
          <Route path="/sustainability" element={<PageTransition><Sustainability /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
