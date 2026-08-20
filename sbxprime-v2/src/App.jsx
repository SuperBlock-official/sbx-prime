import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import LaunchPopup from "./components/LaunchPopup";
import CookieConsent from "./components/CookieConsent";
import StickyCTA from "./components/StickyCTA";
import Home from "./pages/Home";
import Invest from "./pages/Invest";
import London from "./pages/London";
import LondonPledge from "./pages/LondonPledge";
import LondonFund from "./pages/LondonFund";
import Prospectus from "./pages/Prospectus";
import Dashboard from "./pages/Dashboard";
import City from "./pages/City";
import HowItWorks from "./pages/HowItWorks";
import Technology from "./pages/Technology";
import Trust from "./pages/Trust";
import About from "./pages/About";
import Whitepaper from "./pages/Whitepaper";
import Faq from "./pages/Faq";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import AdminApp from "./admin/AdminApp";
import { AssetsProvider } from "./lib/assetsStore";

function ScrollToTop() {
 const { pathname } = useLocation();
 useEffect(() => {
 window.scrollTo(0, 0);
 // GA4 SPA page_view on route change
 if (typeof window.gtag === "function") {
 window.gtag("event", "page_view", { page_path: pathname });
 }
 }, [pathname]);
 return null;
}

function PublicSite() {
 return (
 <AssetsProvider>
 <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-bold focus:text-white">
 Skip to content
 </a>
 <Nav />
 <main id="main">
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/invest" element={<Invest />} />
 <Route path="/invest/london" element={<London />} />
 <Route path="/invest/:slug/prospectus" element={<Prospectus />} />
 <Route path="/invest/london-pledge" element={<LondonPledge />} />
 <Route path="/invest/london-fund" element={<LondonFund />} />
 <Route path="/dashboard" element={<Dashboard />} />
 <Route path="/invest/:slug" element={<City />} />
 <Route path="/how-it-works" element={<HowItWorks />} />
 <Route path="/technology" element={<Technology />} />
 <Route path="/trust" element={<Trust />} />
 <Route path="/about" element={<About />} />
 <Route path="/whitepaper" element={<Whitepaper />} />
 <Route path="/faq" element={<Faq />} />
 <Route path="/register" element={<Register />} />
 <Route path="/verify" element={<Verify />} />
 <Route path="/privacy" element={<Legal />} />
 <Route path="/terms" element={<Legal />} />
 <Route path="*" element={<NotFound />} />
 </Routes>
 </main>
 <Footer />
 <StickyCTA />
 <LaunchPopup />
 <CookieConsent />
 </AssetsProvider>
 );
}

export default function App() {
 return (
 <BrowserRouter>
 <ScrollToTop />
 <Routes>
 {/* Admin gets its own chrome-free shell */}
 <Route path="/admin/*" element={<AdminApp />} />
 <Route path="/*" element={<PublicSite />} />
 </Routes>
 </BrowserRouter>
 );
}
