import { Instagram, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-card border-t border-border/30">
      {/* CTA Section */}
      <div className="border-b border-border/30">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-5xl md:text-6xl text-primary mb-4">
              ¿Tienes Hambre?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Ven a vivir la experiencia 11ONCE. Te esperamos con los brazos abiertos y la parrilla encendida.
            </p>
            <Button variant="hero" size="xl" asChild>
              <a 
                href="https://www.instagram.com/11oncecl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <Instagram className="w-6 h-6" />
                Contáctanos por Instagram
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Info Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-4xl text-primary mb-2">11ONCE</h3>
            <p className="text-muted-foreground">
              Restobar con los mejores smash burgers y comida mexicana de la ciudad.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg uppercase tracking-wider text-foreground">
              Encuéntranos
            </h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Chile</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>Abierto todos los días</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>Consulta por Instagram</span>
              </div>
            </div>
          </div>
          
          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg uppercase tracking-wider text-foreground">
              Síguenos
            </h4>
            <a 
              href="https://www.instagram.com/11oncecl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Instagram className="w-6 h-6" />
              <span className="font-medium">@11oncecl</span>
            </a>
            <p className="text-muted-foreground text-sm">
              Siguenos para ver nuestras novedades, promociones y el día a día del restobar.
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} 11ONCE Restobar. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground text-sm">
            Hecho con 🔥 en Chile
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
