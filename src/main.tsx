import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import WhyUs from './pages/WhyUs';
import WebDesign from './pages/WebDesign';
import WebDevelopment from './pages/WebDevelopment';
import Automation from './pages/Automation';
import AIIntegration from './pages/AIIntegration';
import WebsiteRelaunch from './pages/WebsiteRelaunch';
import Maintenance from './pages/Maintenance';
import SEOPerformance from './pages/SEOPerformance';
import Landingpages from './pages/Landingpages';
import About from './pages/About';
import References from './pages/References';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import Selbstcheck from './pages/Selbstcheck';
import './index.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leistungen" element={<Services />} />
          <Route path="/warum-wir" element={<WhyUs />} />
          <Route path="/webdesign" element={<WebDesign />} />
          <Route path="/webentwicklung" element={<WebDevelopment />} />
          <Route path="/automatisierung" element={<Automation />} />
          <Route path="/ki-integration" element={<AIIntegration />} />
          <Route path="/relaunch" element={<WebsiteRelaunch />} />
          <Route path="/wartung" element={<Maintenance />} />
          <Route path="/seo" element={<SEOPerformance />} />
          <Route path="/landingpages" element={<Landingpages />} />
          <Route path="/ueber-uns" element={<About />} />
          <Route path="/referenzen" element={<References />} />
          <Route path="/preise" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/selbstcheck" element={<Selbstcheck />} />
          <Route path="/impressum" element={<Legal />} />
          <Route path="/datenschutz" element={<Privacy />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </StrictMode>,
);
