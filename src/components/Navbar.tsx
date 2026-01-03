import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Instagram, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER, RESERVATION_MESSAGE } from "@/constants/whatsapp";
import { images } from "@/constants/images";

const navLinks = [
  { label: "Inicio", href: "/", isHash: false },
  { label: "Carta", href: "/#menu", isHash: true },
  { label: "Sobre nosotros", href: "/sobre-nosotros", isHash: false },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="inline-block"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                // Navigate to home and scroll to top after navigation
                navigate("/");
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }
            }}
          >
            <img 
              src={images.logoLB} 
              alt="11ONCE"
              className="h-8 md:h-10 object-contain"
            />
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (link.label === "Inicio" || link.label === "Sobre nosotros") {
                  e.preventDefault();
                  if (location.pathname !== link.href) {
                    navigate(link.href);
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }, 100);
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                } else if (link.isHash) {
                  e.preventDefault();
                  if (location.pathname !== "/") {
                    navigate("/");
                    setTimeout(() => {
                      const hash = link.href.split("#")[1];
                      const element = document.getElementById(hash);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 100);
                  } else {
                    const hash = link.href.split("#")[1];
                    const element = document.getElementById(hash);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }
              };
              
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={handleClick}
                  className="font-heading text-sm uppercase tracking-wider text-white/90 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
            <Button variant="hero" size="sm" asChild>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RESERVATION_MESSAGE)}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                Realiza tu reserva
              </a>
            </Button>
            <Button variant="whiteOutline" size="sm" asChild>
              <a 
                href="https://www.instagram.com/11oncecl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                @11oncecl
              </a>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border/50 py-6 px-4 animate-slide-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  setIsMobileMenuOpen(false);
                  if (link.label === "Inicio" || link.label === "Sobre nosotros") {
                    e.preventDefault();
                    if (location.pathname !== link.href) {
                      navigate(link.href);
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 100);
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  } else if (link.isHash) {
                    e.preventDefault();
                    if (location.pathname !== "/") {
                      navigate("/");
                      setTimeout(() => {
                        const hash = link.href.split("#")[1];
                        const element = document.getElementById(hash);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 100);
                    } else {
                      const hash = link.href.split("#")[1];
                      const element = document.getElementById(hash);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }
                };
                
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={handleClick}
                    className="font-heading text-lg uppercase tracking-wider text-white/90 hover:text-white transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button variant="hero" size="default" asChild className="mt-2 w-fit">
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RESERVATION_MESSAGE)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Realiza tu reserva
                </a>
              </Button>
              <Button variant="whiteOutline" size="default" asChild className="mt-2 w-fit">
                <a 
                  href="https://www.instagram.com/11oncecl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  @11oncecl
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
