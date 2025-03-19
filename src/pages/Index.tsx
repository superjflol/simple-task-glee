
import { useState, useEffect, useRef } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Community from "../components/Community";
import TopMembers from "../components/TopMembers";
import Footer from "../components/Footer";
import JudgmentFleetBanner from "../components/JudgmentFleetBanner";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [visible, setVisible] = useState(false);
  const [showFooterButton, setShowFooterButton] = useState(false);
  const location = useLocation();
  const membersRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle initial scroll for hash
    const handleInitialScroll = () => {
      const hash = location.hash.slice(1);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    handleInitialScroll();

    // Handle scroll detection
    const handleScroll = () => {
      // Show back-to-top button
      setVisible(window.scrollY > 300);
      
      // Show footer button when in the members section
      if (membersRef.current) {
        const membersSectionTop = membersRef.current.getBoundingClientRect().top;
        const membersSectionBottom = membersRef.current.getBoundingClientRect().bottom;
        setShowFooterButton(membersSectionTop <= 100 && membersSectionBottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-jf-dark text-white relative">
      <Navbar />
      <JudgmentFleetBanner />
      <main id="top">
        <Hero />
        <div ref={communityRef} id="community">
          <Community />
        </div>
        <div ref={membersRef} id="top-players">
          <TopMembers />
        </div>
      </main>
      <footer ref={footerRef} id="resources">
        <Footer />
      </footer>
      
      {/* Navigation buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Back to top button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: visible ? 1 : 0, 
            scale: visible ? 1 : 0.9,
            y: visible ? 0 : 10 
          }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            onClick={scrollToTop}
            className="rounded-full w-12 h-12 bg-[#D946EF] hover:bg-[#D946EF]/90 shadow-lg"
            size="icon"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
        
        {/* Footer navigation button - only shows in the Players section */}
        {showFooterButton && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={scrollToFooter}
              className="rounded-full w-12 h-12 bg-[#D946EF] hover:bg-[#D946EF]/90 shadow-lg"
              size="icon"
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
