import { Flame, Heart, Star, Beef } from "lucide-react";
import restaurantAmbiance from "@/assets/restaurant-ambiance.jpg";

const features = [
  {
    icon: Beef,
    title: "Ingredientes Premium",
    description: "Carne 100% de sobrecostilla seleccionada para nuestras smash burgers",
  },
  {
    icon: Flame,
    title: "Cocina a la Vista",
    description: "Preparamos cada plato con pasión y dedicación frente a ti",
  },
  {
    icon: Heart,
    title: "Recetas con Alma",
    description: "Fusión única de sabores chilenos y mexicanos",
  },
  {
    icon: Star,
    title: "Experiencia Única",
    description: "Ambiente urbano y acogedor para disfrutar con amigos",
  },
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={restaurantAmbiance} 
                alt="Ambiente 11ONCE"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-8 py-4 rounded-xl shadow-2xl">
              <span className="font-display text-4xl">11</span>
              <span className="font-heading text-lg uppercase tracking-wider">ONCE</span>
            </div>
          </div>
          
          {/* Content */}
          <div>
            <span className="text-primary font-heading uppercase tracking-[0.3em] text-sm mb-4 block">
              Nuestra Historia
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-foreground mb-6">
              Más Que Un{" "}
              <span className="text-primary">Restobar</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              En 11ONCE creemos que la buena comida se disfruta mejor en buena compañía. 
              Nacimos con la misión de fusionar lo mejor de la cocina callejera: 
              smash burgers jugosas al estilo americano y auténticos sabores mexicanos, 
              todo en un ambiente urbano y relajado.
            </p>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              Cada ingrediente es seleccionado cuidadosamente y cada receta está 
              pensada para despertar tus sentidos. Ven a vivir la experiencia ONCE.
            </p>
            
            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div 
                  key={feature.title}
                  className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm uppercase tracking-wider text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
