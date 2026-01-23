import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin, Clock, Phone, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import WorkWithUsModal from "@/components/WorkWithUsModal";

interface FooterProps {
  hideCta?: boolean;
}

const Footer = ({ hideCta = false }: FooterProps) => {
  const [isWorkWithUsModalOpen, setIsWorkWithUsModalOpen] = useState(false);

  return (
    <footer id="contacto" className="bg-card border-t border-border/30">
      {/* CTA Section */}
      {!hideCta && (
        <div className="border-b border-border/30">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-5xl md:text-6xl text-primary mb-4">
                ¿Tienes Hambre?
              </h2>
              <p className="text-white text-lg mb-8">
                Ven a vivir la experiencia 11ONCE. Te esperamos con los brazos abiertos y la parrilla encendida.
              </p>
              <Button
    variant="whiteOutline"
    size="xl"
    asChild
    className="w-full sm:w-auto max-w-full"
  >
    <a
      href="https://www.instagram.com/11oncecl"
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-center justify-center gap-2
        whitespace-normal text-center
        px-4
      "
    >
      <Instagram className="w-5 h-5 shrink-0" />
      <span className="text-sm sm:text-base">
        Contáctanos por Instagram
      </span>
    </a>
  </Button>

            </div>
          </div>
        </div>
      )}
      
      {/* Info Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img 
              src={images.logoLB} 
              alt="11ONCE"
              className="h-10 md:h-12 mb-2 object-contain"
            />
            <p className="text-white">
              Restobar con los mejores smash burgers y comida mexicana de la ciudad.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg uppercase tracking-wider text-foreground">
              Encuéntranos
            </h4>
            <div className="space-y-3">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Chorrillos+775,+Quilpué"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary/80 transition-colors cursor-pointer underline text-primary text-base"
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-primary">Chorrillos 775, Quilpué</span>
              </a>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex flex-col text-base">
                  <span className="text-white">Martes a Jueves de 12:00 a 00:00 hrs.</span>
                  <span className="text-white">Viernes y Sabado de 12:00 a 02:00 hrs.</span>
                  <span className="text-white">Domingo de 12:00 a 18:00 hrs.</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-white">Consulta por Instagram</span>
              </div>
            </div>
          </div>
          
          {/* Enlaces */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg uppercase tracking-wider text-foreground">
              Enlaces
            </h4>
            <div className="space-y-3">
              <a 
                href="https://www.instagram.com/11oncecl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span className="font-medium">@11oncecl</span>
              </a>
              <Link
                to="/concurso"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-medium">Concurso Miami</span>
              </Link>
              <button
                onClick={() => setIsWorkWithUsModalOpen(true)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Briefcase className="w-6 h-6" />
                <span className="font-medium">Trabaja con nosotros</span>
              </button>
            </div>
            <p className="text-white text-sm">
              Siguenos para ver nuestras novedades, promociones y el día a día del restobar.
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} 11ONCE Restobar. Todos los derechos reservados.
          </p>
          <p className="text-white text-sm">
            Hecho por Restify SpA.
          </p>
        </div>
      </div>

      <WorkWithUsModal
        open={isWorkWithUsModalOpen}
        onOpenChange={setIsWorkWithUsModalOpen}
      />
    </footer>
  );
};

export default Footer;
