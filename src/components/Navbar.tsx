
import { useState } from "react";
import { Menu, X, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

// NavLink component with underlining effect for current section
const NavLink = ({ 
  to, 
  label,
  hash,
  isActive,
  onClick 
}: { 
  to: string | null; 
  label: string;
  hash: string | null;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="relative px-2 py-1 text-gray-300 hover:text-white transition-colors"
    >
      {label}
      {isActive && (
        <motion.div 
          layoutId="underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D946EF]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { translations } = useLanguage();

  // Get the current active section from URL hash
  const currentHash = location.hash.replace('#', '');
  const pathname = location.pathname;

  // Definizione dei link della navbar
  const navLinks = [
    { key: "home", label: translations.home, path: "/", hash: null },
    { key: "community", label: translations.community, path: "/", hash: "community" },
    { key: "players", label: translations.players, path: "/", hash: "top-players" },
    { key: "resources", label: translations.resources, path: "/", hash: "resources" },
    { key: "best-games", label: "Best Games", path: "/best-games", hash: null },
    { key: "faq", label: "FAQ", path: "/faq", hash: null },
  ];

  // Check if a link is active based on path and hash
  const isLinkActive = (link: typeof navLinks[0]) => {
    if (link.path !== "/" && link.path === pathname) {
      return true;
    }
    if (link.path === "/" && pathname === "/" && !currentHash && link.key === "home") {
      return true;
    }
    if (link.hash && currentHash === link.hash) {
      return true;
    }
    return false;
  };

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
    
    if (link.path && link.path !== "/") {
      // Navigate to a separate page
      navigate(link.path);
    } else if (link.path === "/" && link.hash) {
      // For home page sections, navigate to home with hash
      navigate(`/${link.hash ? `#${link.hash}` : ''}`);
    } else {
      // For home with no hash
      navigate("/");
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
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-display font-bold text-white">
                Judgment<span className="text-[#D946EF]">Fleet</span>
              </span>
            </Link>
          </div>

          {/* Navigation - center */}
          <nav className="hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.key}
                  to={link.path}
                  hash={link.hash}
                  label={link.label}
                  isActive={isLinkActive(link)}
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
                  className={`text-left py-2 transition-colors ${
                    isLinkActive(link) ? "text-white font-medium" : "text-gray-300"
                  }`}
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
