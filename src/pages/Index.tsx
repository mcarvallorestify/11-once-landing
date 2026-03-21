import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>11ONCE Restobar | Smash Burgers & Comida Mexicana en Chile</title>
        <meta 
          name="description" 
          content="Descubre 11ONCE Restobar: los mejores smash burgers 100% carne de sobrecostilla y auténtica comida mexicana. Tablas para compartir, ambiente urbano. ¡Ven a vivir la experiencia!" 
        />
        <meta name="keywords" content="restobar chile, smash burgers, comida mexicana, 11once, hamburguesas, burritos, nachos, tablas para compartir" />
        <link rel="canonical" href="https://11once.cl" />
        
        {/* Open Graph */}
        <meta property="og:title" content="11ONCE Restobar | Smash Burgers & Comida Mexicana" />
        <meta property="og:description" content="Los mejores smash burgers y comida mexicana. Ambiente urbano y relajado para compartir con amigos." />
        <meta property="og:type" content="restaurant" />
        <meta property="og:locale" content="es_CL" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="11ONCE Restobar" />
        <meta name="twitter:description" content="Smash Burgers & Comida Mexicana en Chile" />
      </Helmet>
      
      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <MenuSection />
        <AboutSection />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
};

export default Index;
