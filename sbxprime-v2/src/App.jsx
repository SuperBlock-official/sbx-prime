import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import LaunchPopup from "./components/LaunchPopup";
import Home from "./pages/Home";
import Invest from "./pages/Invest";
import London from "./pages/London";
import LondonPledge from "./pages/LondonPledge";
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

export default function App() {
 return (
 <BrowserRouter>
 <ScrollToTop />
 <Nav />
 <main>
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/invest" element={<Invest />} />
 <Route path="/invest/london" element={<London />} />
 <Route path="/invest/:slug/prospectus" element={<Prospectus />} />
 <Route path="/invest/london-pledge" element={<LondonPledge />} />
 <Route path="/dashboard" element={<Dashboard />} />
 <Route path="/invest/:slug" element={<City />} />
 <Route path="/how-it-works" element={<HowItWorks />} />
 <Route path="/technology" element={<Technology />} />
 <Route path="/trust" element={<Trust />} />
 <Route path="/about" element={<About />} />
 <Route path="/whitepaper" element={<Whitepaper />} />
 <Route path="/faq" element={<Faq />} />
 <Route path="/register" element={<Register />} />
 <Route path="*" element={<Home />} />
 </Routes>
 </main>
 <Footer />
 <LaunchPopup />
 </BrowserRouter>
 );
}
