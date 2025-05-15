
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useIsMobile } from "@/hooks/use-mobile";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MobilePortfolio from "./pages/MobilePortfolio";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 120,
      easing: 'ease-in-out',
      delay: 100
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Only render these routes on desktop */}
            {!isMobile && (
              <>
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/education" element={<Education />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/contact" element={<Contact />} />
              </>
            )}
            {/* If mobile and user tries to access a specific section, redirect to home with anchor */}
            {isMobile && (
              <>
                <Route path="/about" element={<MobilePortfolio />} />
                <Route path="/skills" element={<MobilePortfolio />} />
                <Route path="/projects" element={<MobilePortfolio />} />
                <Route path="/education" element={<MobilePortfolio />} />
                <Route path="/certificates" element={<MobilePortfolio />} />
                <Route path="/contact" element={<MobilePortfolio />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
