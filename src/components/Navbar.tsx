
import { useState } from "react";
import { Menu, X, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

// Simple NavLink component without underlining effect
const NavLink = ({ 
  to, 
  label, 
  onClick 
}: { 
  to: string; 
  label: string; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="transition-colors px-2 py-1 text-gray-300 hover:text-white"
    >
      {label}
    </button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { translations } = useLanguage();

  // Definizione dei link della navbar
  const navLinks = [
    { key: "home", label: translations.home, path: null, hash: "top" },
    { key: "community", label: translations.community, path: null, hash: "community" },
    { key: "players", label: translations.players, path: null, hash: "top-players" },
    { key: "resources", label: translations.resources, path: null, hash: "resources" },
    { key: "best-games", label: "Best Games", path: "/best-games", hash: null },
    { key: "faq", label: "FAQ", path: "/faq", hash: null },
  ];

  // Determina se siamo nella home page
  const isHomePage = location.pathname === "/";

  // Effetto per gestire lo scroll
  useState(() => {
    const handleScroll = () => {
      // Cambia lo stile della navbar in base allo scroll
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  });

  // Gestisce il click su un link della navbar
  const handleNavClick = (link: typeof navLinks[0]) => {
    setIsMobileMenuOpen(false);
    
    if (link.path) {
      // Navigate to a separate page
      navigate(link.path);
    } else if (link.hash && isHomePage) {
      // Smooth scroll within homepage
      const element = document.getElementById(link.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.hash) {
      // Navigate to home
      navigate('/');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-jf-dark/90 backdrop-blur-md border-b border-white/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo - left */}
          <div className="flex-shrink-0">
            <RouterLink to="/" className="flex items-center gap-2">
              <span className="text-2xl font-display font-bold text-white">
                Judgment<span className="text-[#D946EF]">Fleet</span>
              </span>
            </RouterLink>
          </div>

          {/* Navigation - center */}
          <nav className="hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.key}
                  to={link.path || `#${link.hash}`}
                  label={link.label}
                  onClick={() => handleNavClick(link)}
                />
              ))}
            </div>
          </nav>

          {/* Right section - buttons */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <Button 
              className="bg-[#D946EF] hover:bg-[#D946EF]/90"
              onClick={() => window.open('https://twitter.com/JudgmentFleet', '_blank')}
            >
              <Twitter size={18} className="mr-2" />
              {translations.followOnTwitter}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSelector />
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-jf-gray border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  className="text-left text-gray-300 hover:text-white py-2 transition-colors"
                  onClick={() => handleNavClick(link)}
                >
                  {link.label}
                </button>
              ))}
              <Button 
                className="bg-[#D946EF] hover:bg-[#D946EF]/90 w-full"
                onClick={() => window.open('https://twitter.com/JudgmentFleet', '_blank')}
              >
                <Twitter size={18} className="mr-2" />
                {translations.followOnTwitter}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
