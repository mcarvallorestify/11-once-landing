import { Button } from "@/components/ui/button";
import { Instagram, MapPin, Clock } from "lucide-react";
import fondo1 from "@/assets/hero-burger.jpg";
import { WHATSAPP_NUMBER, RESERVATION_MESSAGE } from "@/constants/whatsapp";
import { images } from "@/constants/images";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondo1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-24 md:pt-32 pb-32">
        <div className="animate-fade-in">
          {/* Logo */}
          <div className="relative inline-block mb-8">
            <img 
              src={images.logoLB} 
              alt="11ONCE"
              className="h-32 md:h-[10rem] lg:h-[12rem] w-auto object-contain mx-auto"
            />
            <p className="font-heading text-xl md:text-2xl lg:text-3xl text-white uppercase tracking-[0.3em] mt-2">
              RESTOBAR
            </p>
          </div>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 font-light">
            Smash Burgers • Comida Mexicana • Tablas para compartir • Tragos
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="xl" 
              asChild
              className="mb-2"
            >
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RESERVATION_MESSAGE)}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                Realiza tu reserva
              </a>
            </Button>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="white" size="xl" asChild>
                <a href="#menu">Ver Carta</a>
              </Button>
              <Button variant="whiteOutline" size="lg" asChild>
                <a 
                  href="https://www.instagram.com/11oncecl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Instagram className="w-5 h-5" />
                  Síguenos
                </a>
              </Button>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center items-center mb-8">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
                <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Quick Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-start text-base text-white mb-20">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Chorrillos+775,+Quilpué"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-primary transition-colors cursor-pointer underline text-white"
            >
              <MapPin className="w-4 h-4 text-primary mt-0.5" />
              <span className="text-white">Chorrillos 775, Quilpué</span>
            </a>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-primary mt-0.5" />
              <div className="flex flex-col text-sm">
                <span className="text-white">Martes a Jueves de 12:00 a 00:00 hrs.</span>
                <span className="text-white">Viernes y Sabado de 12:00 a 02:00 hrs.</span>
                <span className="text-white">Domingo de 12:00 a 18:00 hrs.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
