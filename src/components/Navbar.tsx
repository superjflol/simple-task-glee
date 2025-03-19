
import { useState, useEffect } from "react";
import { Menu, X, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

// Rimozione del CSS non necessario
<lov-delete file_path="src/app/components/Navbar.css" />

// Nuovo componente NavLink per gestire meglio i link della navbar
const NavLink = ({ 
  to, 
  label, 
  isActive, 
  onClick 
}: { 
  to: string; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative transition-colors px-2 py-1 ${
        isActive ? "text-white font-medium" : "text-gray-300 hover:text-white"
      }`}
    >
      {label}
      {isActive && (
        <motion.div 
          layoutId="navbar-indicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D946EF]"
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
  const { translations } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("top");

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
  useEffect(() => {
    const handleScroll = () => {
      // Cambia lo stile della navbar in base allo scroll
      setIsScrolled(window.scrollY > 20);

      // Aggiorna la sezione attiva solo se siamo nella home page
      if (isHomePage) {
        const sections = {
          top: document.getElementById('top'),
          community: document.getElementById('community'),
          'top-players': document.getElementById('top-players'),
          resources: document.getElementById('resources')
        };

        const viewportHeight = window.innerHeight;
        const viewportMiddle = window.scrollY + (viewportHeight / 2);

        let currentSection = 'top';
        let minDistance = Infinity;

        Object.entries(sections).forEach(([id, element]) => {
          if (element) {
            const rect = element.getBoundingClientRect();
            const absDistance = Math.abs((window.scrollY + rect.top) - viewportMiddle);
            if (absDistance < minDistance) {
              minDistance = absDistance;
              currentSection = id;
            }
          }
        });

        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Gestisce l'hash iniziale all'apertura della pagina
    const handleInitialHash = () => {
      if (isHomePage) {
        const hash = location.hash.slice(1);
        if (hash) {
          const element = document.getElementById(hash);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
              setActiveSection(hash);
            }, 100);
          }
        } else {
          window.scrollTo(0, 0);
          setActiveSection('top');
        }
      }
    };

    handleInitialHash();
    handleScroll(); // Esamina lo scroll anche all'inizio

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, location.hash]);

  // Verifica se un link è attivo
  const isLinkActive = (link: typeof navLinks[0]): boolean => {
    if (link.path) {
      return location.pathname === link.path;
    }
    return isHomePage && activeSection === link.hash;
  };

  // Gestisce il click su un link della navbar
  const handleNavClick = (link: typeof navLinks[0]) => {
    setIsMobileMenuOpen(false);
    
    if (link.path) {
      // Navigazione a una pagina separata
      return;
    } else if (link.hash && isHomePage) {
      // Scrolling interno nella home page
      const element = document.getElementById(link.hash);
      if (element) {
        window.history.pushState(null, '', `#${link.hash}`);
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(link.hash);
      }
    } else if (link.hash) {
      // Siamo su una pagina diversa e vogliamo tornare alla home con un hash
      localStorage.setItem('scrollToSection', link.hash);
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
                link.path ? (
                  <RouterLink key={link.key} to={link.path} onClick={() => handleNavClick(link)}>
                    <NavLink
                      to={link.path}
                      label={link.label}
                      isActive={isLinkActive(link)}
                      onClick={() => {}}
                    />
                  </RouterLink>
                ) : (
                  <NavLink
                    key={link.key}
                    to={`#${link.hash}`}
                    label={link.label}
                    isActive={isLinkActive(link)}
                    onClick={() => handleNavClick(link)}
                  />
                )
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
                link.path ? (
                  <RouterLink
                    key={link.key}
                    to={link.path}
                    className={`text-gray-300 hover:text-white py-2 transition-colors ${
                      isLinkActive(link) ? "text-white font-medium pl-2 border-l-2 border-[#D946EF]" : ""
                    }`}
                    onClick={() => handleNavClick(link)}
                  >
                    {link.label}
                  </RouterLink>
                ) : (
                  <button
                    key={link.key}
                    className={`text-left text-gray-300 hover:text-white py-2 transition-colors ${
                      isLinkActive(link) ? "text-white font-medium pl-2 border-l-2 border-[#D946EF]" : ""
                    }`}
                    onClick={() => handleNavClick(link)}
                  >
                    {link.label}
                  </button>
                )
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
