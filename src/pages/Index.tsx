
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

  useEffect(() => {
    // Gestisce lo scroll iniziale per l'hash o la sezione salvata
    const handleInitialScroll = () => {
      // Prima controlla se c'è una sezione salvata da un'altra pagina
      const savedSection = localStorage.getItem('scrollToSection');
      if (savedSection) {
        localStorage.removeItem('scrollToSection');
        setTimeout(() => {
          const element = document.getElementById(savedSection);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      }

      // Altrimenti controlla l'hash URL
      const hash = window.location.hash.slice(1);
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

    // Gestisce il rilevamento dello scroll
    const handleScroll = () => {
      // Mostra il pulsante per tornare in alto
      setVisible(window.scrollY > 300);
      
      // Mostra il pulsante per andare al footer quando è nella sezione membri
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
        <Community />
        <div ref={membersRef} id="top-players">
          <TopMembers />
        </div>
      </main>
      <footer ref={footerRef} id="resources">
        <Footer />
      </footer>
      
      {/* Pulsanti di navigazione */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Pulsante per tornare in alto */}
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
        
        {/* Pulsante per andare al footer - si mostra solo nella sezione Players */}
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
