
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";

// Flag paths use the uploaded images
const flagImages = {
  it: "/jf-assets/c9f967e4-d38a-4854-a331-cc8314a35f30.png",
  en: "/jf-assets/ef6a7238-0f0d-4725-b680-1f648b5e0e4b.png"
};

const LanguageSelector = () => {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === "it" ? "en" : "it");
  };

  const nextLocale = locale === "it" ? "en" : "it";
  const altText = locale === "it" ? "Switch to English" : "Passa all'italiano";

  return (
    <Button
      onClick={toggleLanguage}
      className="text-gray-300 hover:text-white transition-colors bg-transparent hover:bg-transparent p-0"
      title={altText}
    >
      <img 
        src={flagImages[locale]} 
        alt={locale === "it" ? "Bandiera italiana" : "British flag"}
        className="h-6 w-auto rounded"
      />
    </Button>
  );
};

export default LanguageSelector;
