import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Send, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { images } from "@/constants/images";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Crear el mensaje para WhatsApp
    const whatsappMessage = `Hola, mi nombre es ${formData.name}.\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\n\nMensaje: ${formData.message}`;
    const whatsappUrl = `https://wa.me/56975858539?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
    
    // Limpiar formulario
    setFormData({ name: "", email: "", phone: "", message: "" });
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
              
              {/* Story Text as Poem */}
              <div className="text-center text-white space-y-6 text-base md:text-lg leading-relaxed">
                <h3 className="font-display text-2xl md:text-3xl text-primary mb-8">
                  11once: cuando el origen llama y el sabor responde
                </h3>
                
                <div className="space-y-6">
                  <p>
                    Iván Huerta es chileno.<br />
                    Lleva doce años viviendo en Miami,<br />
                    recorriendo el mundo,<br />
                    creando proyectos y sumando experiencias.<br />
                    Pero hay algo que nunca se movió de lugar:<br />
                    Quilpué.
                  </p>
                  
                  <p className="text-primary font-medium text-xl">
                    Porque uno puede vivir lejos,<br />
                    pero el origen no se negocia.
                  </p>
                  
                  <p>
                    En Estados Unidos, Iván ha desarrollado<br />
                    gran parte de su carrera profesional<br />
                    en la industria musical.<br />
                    Forma parte de los equipos de artistas<br />
                    de primer nivel como Nicky Jam, Karol G<br />
                    y la familia Solís,<br />
                    sí, la familia del mismísimo Marco Antonio Solís.<br />
                    Su trabajo es estratégico y silencioso,<br />
                    pero fundamental:<br />
                    lograr que la música de los artistas cruce fronteras,<br />
                    que suene y se instale<br />
                    desde España hasta Chile,<br />
                    recorriendo cada país donde se habla español.<br />
                    Detrás de muchas canciones<br />
                    que se escuchan en radios, plataformas y escenarios<br />
                    de habla hispana,<br />
                    está la mano, la gestión y la experiencia<br />
                    de Iván Huerta.
                  </p>
                  
                  <p>
                    Aun así, con una carrera construida fuera de Chile,<br />
                    Iván siempre tuvo claro algo:<br />
                    cuando llegara el momento de crear un proyecto propio,<br />
                    tenía que ser en Quilpué.
                  </p>
                  
                  <p>
                    Por eso, cuando decidió entrar<br />
                    al mundo gastronómico,<br />
                    no hubo dudas.<br />
                    Si iba a nacer algo suyo,<br />
                    tenía que volver al origen.<br />
                    No por estrategia, sino por amor.<br />
                    Por ese vínculo profundo<br />
                    con un pedacito de tierra<br />
                    que lo vio crecer<br />
                    y al que siempre quiso devolverle<br />
                    algo más que recuerdos.
                  </p>
                  
                  <p className="text-primary font-medium text-xl">
                    Así nació 11once.
                  </p>
                  
                  <p>
                    No como un simple local de comida,<br />
                    sino como una idea con propósito:<br />
                    dar trabajo, crear oportunidades<br />
                    y construir un espacio<br />
                    donde personas queridas pudieran desarrollarse,<br />
                    crecer y sentirse parte de algo propio.
                  </p>
                  
                  <p>
                    El nombre apareció<br />
                    como aparecen las mejores ideas:<br />
                    sin aviso y sin cálculo.<br />
                    En un asado en casa,<br />
                    entre risas y conversación,<br />
                    alguien preguntó cómo se llamaría el lugar.<br />
                    Iván, jugando, dijo "once".<br />
                    Y enseguida remató con un muy chileno:<br />
                    "ch… entonces".<br />
                    Once… entonces.<br />
                    11once.
                  </p>
                  
                  <p>
                    Las risas no faltaron.<br />
                    Algunos decían que era muy loco,<br />
                    que no tenía sentido.<br />
                    Pero ahí mismo empezó a tomar forma<br />
                    algo más grande.<br />
                    Porque esa frase ya vivía en la gente,<br />
                    en el lenguaje del día a día,<br />
                    y ese chilenismo, con su doble sentido,<br />
                    solo le hace gracia de verdad a los chilenos.<br />
                    El nombre no se inventó:<br />
                    se reconoció.
                  </p>
                  
                  <p>
                    Con el nombre definido,<br />
                    venía lo más importante:<br />
                    la cocina.<br />
                    Porque la historia puede ser bonita,<br />
                    pero si no es rica, no sirve.
                  </p>
                  
                  <p>
                    Para eso, Iván llamó<br />
                    a un pilar fundamental del proyecto:<br />
                    Gary, chef sudafricano<br />
                    con una sólida trayectoria internacional,<br />
                    forjada en Nueva York,<br />
                    en cruceros y en cocinas<br />
                    de distintas partes del mundo.<br />
                    Un chef marcado por las mezclas culturales,<br />
                    pero con un sello claro y potente:<br />
                    la cocina americana honesta,<br />
                    la hamburguesa bien hecha,<br />
                    casera y sin disfraces.
                  </p>
                  
                  <p>
                    La llamada fue directa:<br />
                    —Amigo, tómate un vuelo a Chile.<br />
                    Gary estaba en Sudáfrica.<br />
                    Pensó un momento y respondió:<br />
                    —Veamos qué pasa en Chile.
                  </p>
                  
                  <p>
                    Vino, conoció el proyecto y se sumó.<br />
                    Desde ese día, comenzó un trabajo<br />
                    serio y apasionado<br />
                    para dar forma a la carta,<br />
                    cuidando cada detalle,<br />
                    cada sabor y cada combinación.
                  </p>
                  
                  <p>
                    Pero 11once no es una sola persona.<br />
                    Es equipo. Es talento compartido. Es confianza.<br />
                    Personas que sostienen el proyecto día a día,<br />
                    como Eileen Espinoza, Ellen Godoy,<br />
                    Jacqueline Huerta y Claudio Aracena,<br />
                    parte esencial de esta historia.<br />
                    Los nombres de los platos, las ideas,<br />
                    el espíritu del lugar<br />
                    y la energía que se vive en el local<br />
                    nacen del trabajo conjunto,<br />
                    del respeto y de creer<br />
                    en lo que se está construyendo.
                  </p>
                  
                  <p>
                    Hoy, 11once tiene un objetivo claro:<br />
                    que Quilpué cuente con un espacio<br />
                    que genere trabajo,<br />
                    entregue un buen servicio<br />
                    y ofrezca sabores internacionales<br />
                    sin perder la identidad local.<br />
                    Un lugar cercano, honesto y con carácter.
                  </p>
                  
                  <p className="text-primary font-medium text-xl mt-8">
                    Porque 11once no nació para ser una moda.<br />
                    Nació desde el origen.<br />
                    Nació en equipo.<br />
                    Y, sobre todo, nació para quedarse.
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
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensaje
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

