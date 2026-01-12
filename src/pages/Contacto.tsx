import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { images } from "@/constants/images";
import { toast } from "@/hooks/use-toast";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://11once.cl/correos/enviar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.name,
          correo: formData.email,
          numero: formData.phone,
          mensaje: formData.message,
        }),
      });

      const result = await response.text();

      if (response.ok && result.trim() === "Ok") {
        toast({
          title: "¡Mensaje enviado!",
          description: "Gracias por contactarnos. Te responderemos pronto.",
        });
        // Limpiar formulario
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(result || "Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      toast({
        title: "Error al enviar",
        description: "No se pudo enviar el mensaje. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | 11ONCE Restobar</title>
        <meta 
          name="description" 
          content="Conoce la historia de 11ONCE Restobar. Más que un restobar, una experiencia culinaria única con smash burgers y comida mexicana." 
        />
        <link rel="canonical" href="https://11once.cl/sobre-nosotros" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-32 pb-20 bg-background relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Story Section */}
            <div className="max-w-4xl mx-auto mb-20">
              {/* Logo */}
              <div className="flex justify-center mb-16 md:mb-20 mt-8">
                <img 
                  src={images.logoLB} 
                  alt="11ONCE"
                  className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                />
              </div>
              
              {/* Story Text as Paragraphs */}
              <div className="text-center text-white space-y-6 text-base md:text-lg leading-relaxed">
                <h3 className="font-display text-2xl md:text-3xl text-primary mb-8">
                  11once: cuando el origen llama y el sabor responde
                </h3>
                
                <div className="space-y-6 text-justify max-w-3xl mx-auto">
                  <p>
                    Iván Huerta es chileno. Lleva doce años viviendo en Miami, recorriendo el mundo, creando proyectos y sumando experiencias. Pero hay algo que nunca se movió de lugar: Quilpué.
                  </p>
                  
                  <p className="text-primary font-medium text-xl text-center">
                    Porque uno puede vivir lejos, pero el origen no se negocia.
                  </p>
                  
                  <p>
                    En Estados Unidos, Iván ha desarrollado gran parte de su carrera profesional en la industria musical. Forma parte de los equipos de artistas de primer nivel como Nicky Jam, Karol G y la familia Solís, sí, la familia del mismísimo Marco Antonio Solís. Su trabajo es estratégico y silencioso, pero fundamental: lograr que la música de los artistas cruce fronteras, que suene y se instale desde España hasta Chile, recorriendo cada país donde se habla español. Detrás de muchas canciones que se escuchan en radios, plataformas y escenarios de habla hispana, está la mano, la gestión y la experiencia de Iván Huerta.
                  </p>
                  
                  <p>
                    Aun así, con una carrera construida fuera de Chile, Iván siempre tuvo claro algo: cuando llegara el momento de crear un proyecto propio, tenía que ser en Quilpué.
                  </p>
                  
                  <p>
                    Por eso, cuando decidió entrar al mundo gastronómico, no hubo dudas. Si iba a nacer algo suyo, tenía que volver al origen. No por estrategia, sino por amor. Por ese vínculo profundo con un pedacito de tierra que lo vio crecer y al que siempre quiso devolverle algo más que recuerdos.
                  </p>
                  
                  <p className="text-primary font-medium text-xl text-center">
                    Así nació 11once.
                  </p>
                  
                  <p>
                    No como un simple local de comida, sino como una idea con propósito: dar trabajo, crear oportunidades y construir un espacio donde personas queridas pudieran desarrollarse, crecer y sentirse parte de algo propio.
                  </p>
                  
                  <p>
                    El nombre apareció como aparecen las mejores ideas: sin aviso y sin cálculo. En un asado en casa, entre risas y conversación, alguien preguntó cómo se llamaría el lugar. Iván, jugando, dijo "once". Y enseguida remató con un muy chileno: "ch… entonces". Once… entonces. 11once.
                  </p>
                  
                  <p>
                    Las risas no faltaron. Algunos decían que era muy loco, que no tenía sentido. Pero ahí mismo empezó a tomar forma algo más grande. Porque esa frase ya vivía en la gente, en el lenguaje del día a día, y ese chilenismo, con su doble sentido, solo le hace gracia de verdad a los chilenos. El nombre no se inventó: se reconoció.
                  </p>
                  
                  <p>
                    Con el nombre definido, venía lo más importante: la cocina. Porque la historia puede ser bonita, pero si no es rica, no sirve.
                  </p>
                  
                  <p>
                    Para eso, Iván llamó a un pilar fundamental del proyecto: Gary, chef sudafricano con una sólida trayectoria internacional, forjada en Nueva York, en cruceros y en cocinas de distintas partes del mundo. Un chef marcado por las mezclas culturales, pero con un sello claro y potente: la cocina americana honesta, la hamburguesa bien hecha, casera y sin disfraces.
                  </p>
                  
                  <p>
                    La llamada fue directa: —Amigo, tómate un vuelo a Chile. Gary estaba en Sudáfrica. Pensó un momento y respondió: —Veamos qué pasa en Chile.
                  </p>
                  
                  <p>
                    Vino, conoció el proyecto y se sumó. Desde ese día, comenzó un trabajo serio y apasionado para dar forma a la carta, cuidando cada detalle, cada sabor y cada combinación.
                  </p>
                  
                  <p>
                    Pero 11once no es una sola persona. Es equipo. Es talento compartido. Es confianza. Personas que sostienen el proyecto día a día, como Eileen Espinoza, Ellen Godoy, Jacqueline Huerta y Claudio Aracena, parte esencial de esta historia. Los nombres de los platos, las ideas, el espíritu del lugar y la energía que se vive en el local nacen del trabajo conjunto, del respeto y de creer en lo que se está construyendo.
                  </p>
                  
                  <p>
                    Hoy, 11once tiene un objetivo claro: que Quilpué cuente con un espacio que genere trabajo, entregue un buen servicio y ofrezca sabores internacionales sin perder la identidad local. Un lugar cercano, honesto y con carácter.
                  </p>
                  
                  <p className="text-primary font-medium text-xl mt-8 text-center">
                    Porque 11once no nació para ser una moda. Nació desde el origen. Nació en equipo. Y, sobre todo, nació para quedarse.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="max-w-6xl mx-auto mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Left Side - Form Title and Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
                      Formulario
                    </h2>
                    <p className="text-white text-lg leading-relaxed">
                      Completa el formulario de contacto para comunicarte con nosotros. Ya sea para consultas, sugerencias o solicitudes, estaremos encantados de atenderte.
                    </p>
                  </div>
                </div>

                {/* Right Side - Form Fields */}
                <div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre completo"
                        className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/60 focus:border-primary focus-visible:ring-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/60 focus:border-primary focus-visible:ring-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Número de contacto"
                        className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/60 focus:border-primary focus-visible:ring-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Mensaje"
                        className="bg-transparent border-0 border-b border-white/30 rounded-none text-white placeholder:text-white/60 focus:border-primary focus-visible:ring-0 min-h-[120px] resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Mensaje
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-4xl md:text-5xl text-white text-center mb-8">
                Encuéntranos
              </h2>
              
              {/* Google Maps Embed */}
              <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
                <iframe
                  src="https://www.google.com/maps?q=Chorrillos+775,+Quilpué,+Chile&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación 11ONCE Restobar - Chorrillos 775, Quilpué"
                />
              </div>
              
              {/* Address Below Map */}
              <p className="text-white text-center text-lg">
                Chorrillos 775, Quilpué
              </p>
            </div>
          </div>
        </section>

        <Footer hideCta={true} />
        <WhatsAppButton />
      </main>
    </>
  );
};

export default Contacto;

