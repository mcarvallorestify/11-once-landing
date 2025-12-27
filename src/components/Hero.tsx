import { Button } from "@/components/ui/button";
import { Instagram, MapPin, Clock } from "lucide-react";
import heroBurger from "@/assets/hero-burger.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBurger})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          {/* Logo */}
          <h1 className="font-display text-8xl md:text-[10rem] lg:text-[12rem] text-primary leading-none tracking-tight mb-2">
            11ONCE
          </h1>
          <p className="font-heading text-2xl md:text-3xl text-foreground/90 tracking-[0.3em] uppercase mb-8">
            Restobar
          </p>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light">
            Smash Burgers • Comida Mexicana • Tablas para compartir
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="hero" size="xl" asChild>
              <a href="#menu">Ver Carta</a>
            </Button>
            <Button variant="goldOutline" size="lg" asChild>
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
          
          {/* Quick Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Chile</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Abierto todos los días</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
