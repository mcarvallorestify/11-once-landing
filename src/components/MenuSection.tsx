import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users } from "lucide-react";
import { images } from "@/constants/images";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  highlight?: boolean;
  image: string;
}

interface MenuCategory {
  title: string;
  subtitle?: string;
  image: string;
  items: MenuItem[];
}

interface TableItem {
  name: string;
  description: string;
  prices: {
    small: string;
    large: string;
  };
  image: string;
}

const foodCategories: MenuCategory[] = [
  {

    title: "Smash Burgers",
    subtitle: "100% Carne de Sobrecostilla en Pan Brioche",
    image: images.burgersmash,
    items: [
      { name: "El Que Sabe, Sabe", description: "Tomate, escarola fresca, pepinillo, cebolla morada", price: "$8.900", image: images.heroBurger },
      { name: "Piscinazo", description: "Estilo brasileño, sumergido en queso cheddar fundido y tocino crocante", price: "$11.900", image: images.piscinazo },
      { name: "Corazón Contento", description: "Queso cheddar, cebolla caramelizada y tocino crocante", price: "$10.900", highlight: true, image: images.heroBurger },
      { name: "A Lo Maldito", description: "Triple smashburger, queso cheddar, queso gouda, champiñones salteados, cebolla caramelizada y tocino crocante", price: "$13.900", highlight: true, image: images.heroBurger },
      { name: "De Las Mechas", description: "Combinación única de smashburger coronado con queso gouda, carne mechada, tomate y tocino crocante", price: "$13.900", image: images.heroBurger },
      { name: "El Descriteriao", description: "Queso cheddar, cremosa salsa de pimienta negra, lechuga, tomate, pepinillo y cebolla morada", price: "$10.900", image: images.heroBurger },
      { name: "Diente Por Diente", description: "Queso cheddar, salsa de champiñones al ajo cremoso, lechuga, tomate, pepinillos, cebolla morada", price: "$10.900", image: images.heroBurger },
      { name: "Dios Me Libre", description: "Aros de cebolla crispy, salsa de rocoto agridulce, lechuga, tomate, pepinillo y cebolla morada", price: "$10.900", image: images.heroBurger },
      { name: "Más Chileno", description: "Queso gouda, palta, pebre y lechuga", price: "$10.900", image: images.heroBurger },
      { name: "La Joya", description: "Queso cheddar, tocino crocante y mix de pimentones y champiñones asados", price: "$10.900", image: images.heroBurger },
      { name: "A Nadie Le Falta", description: "Burger vegana, queso vegano, cebolla morada y pepinillo", price: "$10.900", image: images.heroBurger },
    ],
  },
  {
    title: "México Lindo",
    subtitle: "Auténticos Sabores Mexicanos",
    image: images.mexicolindo,
    items: [
      { name: "Fajitas Chingonas", description: "Pollo, carne o mixta con vegetales salteados, palta, queso y salsas", price: "$8.900", image: images.mexicanSpread },
      { name: "Burrito Cabrón", description: "Con frijoles, arroz mexicano, lechuga, tomate, palta y salsa", price: "$8.900", highlight: true, image: images.mexicanSpread },
      { name: "Quesadillas Wey", description: "Pollo, carne mechada o mixta con queso, lechuga, tomate y palta", price: "$8.900", image: images.mexicanSpread },
      { name: "Pinche Enchiladas", description: "Con frijoles refritos, arroz mexicano, lechuga, tomate y palta", price: "$10.500", image: images.mexicanSpread },
      { name: "Nachos Cheddar", description: "Carne, salsa mexicana, queso cheddar, sour cream y palta", price: "Desde $23.000", image: images.mexicanSpread },
    ],
  },
  {
    title: "Sandwich Especiales",
    subtitle: "Todos vienen en Pan de Papa",
    image: images.sandwich2,
    items: [
      { name: "Entero Pollo", description: "Filete de pollo crispy con pepinillos y tomate", price: "$8.900", image: images.heroBurger },
      { name: "Por La Boca Muere El Pez", description: "Caluga de pescado, lechuga, tomate y cebolla morada", price: "$10.900", image: images.heroBurger },
      { name: "Vegans", description: "Croqueta de falafel, hummus, lechuga, tomate, cebolla morada y pepinillo", price: "$11.900", image: images.heroBurger },
    ],
  },
  {
    title: "Sandwich Mechada",
    subtitle: "Todos vienen en Pan Frika de 15 cms",
    image: images.sandwich1,
    items: [
      { name: "Elige Tu Favorito", description: "Italiana, Luco, Chacarero", price: "$11.900", image: images.heroBurger },
      { name: "Mechada Griinga", description: "Queso gouda, tomate, tocino crocante y cebolla caramelizada", price: "$11.900", image: images.heroBurger },
    ],
  },
  {
    title: "Papas ONCE",
    subtitle: "Nuestras Famosas Papas Cargadas",
    image: images.papasonce,
    items: [
      { name: "Papas ONCE 600gr", description: "Papas rústicas con salsa de queso cheddar, carne mechada, tomate, tocino, ciboulette y salsa cilantro", price: "$9.900", highlight: true, image: images.loadedFries },
      { name: "Papas ONCE 350gr", description: "Versión para uno con todos los toppings", price: "$6.900", image: images.loadedFries },
    ],
  },
  {
    title: "Ensalada",
    subtitle: "Fresca y Deliciosa",
    image: images.ensalada,
    items: [
      { name: "César ONCE", description: "Ensalada César al estilo de la casa", price: "$8.900", image: images.loadedFries },
    ],
  },
  {
    title: "Pa' La Bendi",
    subtitle: "Para los Pequeños",
    image: images.palabendi,
    items: [
      { name: "Hamburguesa Queso", description: "Hamburguesa con queso para los niños", price: "$7.900", image: images.heroBurger },
      { name: "Hot Dog", description: "Hot dog clásico", price: "$4.900", image: images.heroBurger },
      { name: "Nuggets", description: "6 unidades de nuggets", price: "$4.900", image: images.heroBurger },
    ],
  },
];

const tables: TableItem[] = [
  {
    name: "Tabla Puro Filete",
    description: "Cubos de res, pollo, cerdo y mechada condimentado al estilo ONCE",
    prices: { small: "$16.900", large: "$30.900" },
    image: images.tfilete,
  },
  {
    name: "Más Sabe El Diablo",
    description: "Porción de carne, pollo, camarones salteados, calamares fritos",
    prices: { small: "$16.900", large: "$29.900" },
    image: images.restaurantAmbiance,
  },
  {
    name: "La Catrina",
    description: "Burritos carne, quesadillas de pollo, nachos con queso cheddar y guacamole",
    prices: { small: "$23.000", large: "$31.900" },
    image: images.catrina,
  },
];

const drinkCategories: MenuCategory[] = [
  {
    title: "Promo 2X",
    subtitle: "Oferta Especial - Dos por el Precio de Uno",
    image: images.promo2x,
    items: [
      { name: "Fernet", description: "2X", price: "$8.000", highlight: true, image: images.restaurantAmbiance },
      { name: "Mistral 35", description: "2X", price: "$7.000", image: images.restaurantAmbiance },
      { name: "Austral Calafate", description: "2X", price: "$6.000", image: images.restaurantAmbiance },
      { name: "Mistral 40", description: "2X", price: "$8.000", image: images.restaurantAmbiance },
      { name: "Gin Kantal", description: "2X", price: "$10.000", image: images.restaurantAmbiance },
      { name: "Mojito Tradicional", description: "2X", price: "$9.000", image: images.restaurantAmbiance },
      { name: "Mojito Sabores", description: "2X", price: "$9.900", image: images.restaurantAmbiance },
      { name: "Ballantines", description: "2X", price: "$8.000", image: images.restaurantAmbiance },
      { name: "Ramazzotti", description: "2X", price: "$8.000", image: images.restaurantAmbiance },
      { name: "Pisco Sour", description: "2X", price: "$8.000", image: images.restaurantAmbiance },
      { name: "Pisco Sour Sabor", description: "2X", price: "$8.500", image: images.restaurantAmbiance },
      { name: "Johnnie Walker Red Label", description: "2X", price: "$10.000", image: images.restaurantAmbiance },
    ],
  },
  {
    title: "Cócteles",
    subtitle: "Mojitos y Moscow Mule",
    image: images.moscowmule,
    items: [
      { name: "Mojito", description: "Tradicional con hierbabuena y limón", price: "$6.490", image: images.restaurantAmbiance },
      { name: "Mojito Sabores", description: "Con sabores especiales", price: "$6.990", highlight: true, image: images.restaurantAmbiance },
      { name: "Moscow Mule", description: "Vodka, jengibre y lima en vaso de cobre", price: "$7.900", highlight: true, image: images.restaurantAmbiance },
      { name: "Moscow Jagger", description: "Moscow Mule con Jägermeister", price: "$8.900", image: images.restaurantAmbiance },
      { name: "Jagger Pineapple", description: "Jägermeister con piña", price: "$8.900", image: images.restaurantAmbiance },
    ],
  },
  {
    title: "Pisco y Gin",
    subtitle: "Destilados Premium",
    image: images.ginkantal,
    items: [
      { name: "Pisco Alto 35°", description: "Pisco nacional", price: "$4.990", image: images.restaurantAmbiance },
      { name: "Pisco Nobel 40°", description: "Pisco premium", price: "$5.490", image: images.restaurantAmbiance },
      { name: "Pisco Alto Transparente", description: "Pisco transparente", price: "$5.990", image: images.restaurantAmbiance },
      { name: "Gin Kantal", description: "Gin nacional", price: "$6.490", image: images.restaurantAmbiance },
      { name: "Tropical Berries", description: "Gin con frutos rojos", price: "$7.500", image: images.restaurantAmbiance },
      { name: "Tropical Gin", description: "Gin tropical", price: "$7.500", image: images.restaurantAmbiance },
    ],
  },
  {
    title: "Whisky y Ron",
    subtitle: "Espíritus Selectos",
    image: images.whiskyron,
    items: [
      { name: "Ballantines", description: "Whisky escocés", price: "$4.990", image: images.restaurantAmbiance },
      { name: "Johnnie Walker Red Label", description: "Whisky escocés", price: "$4.990", image: images.restaurantAmbiance },
      { name: "Jack Daniels", description: "Whisky americano", price: "$6.990", highlight: true, image: images.restaurantAmbiance },
      { name: "Bacardi", description: "Ron blanco", price: "$6.000", image: images.restaurantAmbiance },
      { name: "Barceló Añejo", description: "Ron añejo", price: "$6.500", image: images.restaurantAmbiance },
    ],
  },
  {
    title: "Vinos y Sours",
    subtitle: "Sangrías y Sours Nacionales",
    image: images.copasangria,
    items: [
      { name: "Jarra Sangría", description: "Sangría para compartir", price: "$7.990", highlight: true, image: images.restaurantAmbiance },
      { name: "Copa Sangría", description: "Sangría individual", price: "$3.990", image: images.restaurantAmbiance },
      { name: "Copa Vino", description: "Preguntar variedad disponible", price: "$4.990", image: images.restaurantAmbiance },
      { name: "Sour Nacional", description: "Sour tradicional", price: "$3.990", image: images.restaurantAmbiance },
      { name: "Sour Maracuyá", description: "Sour con maracuyá", price: "$4.990", image: images.restaurantAmbiance },
      { name: "Sour Menta", description: "Sour con menta", price: "$4.990", image: images.restaurantAmbiance },
      { name: "Sour Menta Jengibre", description: "Sour con menta y jengibre", price: "$4.990", image: images.restaurantAmbiance },
    ],
  },
  {
    title: "Spritz",
    subtitle: "Aperitivos Refrescantes",
    image: images.copa1,
    items: [
      { name: "Aperol", description: "Spritz clásico con Aperol", price: "$6.490", image: images.restaurantAmbiance },
      { name: "Spritz Berries", description: "Spritz con frutos rojos", price: "$6.990", image: images.restaurantAmbiance },
      { name: "Ramazzotti", description: "Spritz con Ramazzotti", price: "$6.490", image: images.restaurantAmbiance },
      { name: "Aperol ONCE", description: "Spritz especial de la casa", price: "$6.990", highlight: true, image: images.restaurantAmbiance },
    ],
  },
  {
    title: "Cervezas y Bebidas",
    subtitle: "Chelas y Refrescos",
    image: images.bebida1,
    items: [
      { name: "Corona", description: "Cerveza mexicana", price: "$3.000", image: images.restaurantAmbiance },
      { name: "Calafate", description: "Cerveza artesanal", price: "$3.200", image: images.restaurantAmbiance },
      { name: "Calafate 500 CC", description: "Cerveza artesanal grande", price: "$3.990", highlight: true, image: images.restaurantAmbiance },
      { name: "Austral Lager", description: "Cerveza nacional", price: "$3.200", image: images.restaurantAmbiance },
      { name: "Kustman Miel", description: "Cerveza con miel", price: "$3.200", image: images.restaurantAmbiance },
      { name: "Kustman Torobayo", description: "Cerveza especial", price: "$3.200", image: images.restaurantAmbiance },
      { name: "Shop", description: "Cerveza nacional", price: "$3.000", image: images.restaurantAmbiance },
      { name: "Jugos Naturales", description: "450cc", price: "$3.900", image: images.restaurantAmbiance },
      { name: "Limonadas", description: "450cc", price: "$3.900", image: images.restaurantAmbiance },
      { name: "Bebidas Lata", description: "350cc", price: "$2.000", image: images.restaurantAmbiance },
    ],
  },
];

const MenuSection = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const handleImageClick = (image: string, title: string) => {
    setSelectedImage({ src: image, title });
  };

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-6xl md:text-7xl text-primary mb-4">
            Nuestra Carta
          </h2>
          <p className="text-white text-lg max-w-xl mx-auto">
            Sabores audaces para paladares exigentes. Cada plato preparado con ingredientes frescos y mucho amor.
          </p>
        </div>

        {/* Food Categories */}
        <div className="space-y-20">
          {foodCategories.map((category, categoryIndex) => {
            // Special layout for Smash Burgers
            if (category.title === "Smash Burgers") {
              return (
                <div key={category.title} className="space-y-12">
                  {/* Centered Image and Title */}
                  <div className="flex flex-col items-center">
                    <div className="relative h-80 md:h-[500px] w-full max-w-4xl rounded-2xl overflow-hidden group mb-6">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-display text-4xl md:text-5xl text-primary mb-2">
                        {category.title}
                      </h3>
                      {category.subtitle && (
                        <p className="text-sm text-white font-heading uppercase tracking-wider">
                          {category.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Menu Items in 4 columns */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.items.map((item) => (
                      <Card 
                        key={item.name}
                        onClick={() => handleImageClick(item.image, item.name)}
                        className={`bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer ${
                          item.highlight ? 'border-primary/30' : ''
                        }`}
                      >
                        <CardContent className="p-5">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-heading text-base text-foreground uppercase tracking-wide">
                                    {item.name}
                                  </h4>
                                  {item.highlight && (
                                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full">
                                      Popular
                                    </span>
                                  )}
                                </div>
                                <p className="text-white text-xs mt-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                              <span className="font-heading text-lg text-primary font-semibold whitespace-nowrap">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            }

            // Regular layout for other categories
            return (
              <div 
                key={category.title}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  categoryIndex % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div 
                  className={`relative ${
                    category.title === "Spritz" 
                      ? "h-64 md:h-[400px] bg-background" 
                      : "h-80 md:h-[400px]"
                  } rounded-2xl overflow-hidden group ${
                    categoryIndex % 2 === 1 ? 'md:order-2' : ''
                  }`}
                >
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className={`w-full h-full ${
                      category.title === "Spritz" 
                        ? "object-contain" 
                        : "object-cover"
                    } transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-display text-4xl md:text-5xl text-primary mb-1">
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p className="text-sm text-foreground/80 font-heading uppercase tracking-wider">
                        {category.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Menu Items */}
                <div className={`space-y-4 ${categoryIndex % 2 === 1 ? 'md:order-1' : ''}`}>
                  {category.items.map((item) => (
                    <Card 
                      key={item.name}
                      onClick={() => handleImageClick(item.image, item.name)}
                      className={`bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer ${
                        item.highlight ? 'border-primary/30' : ''
                      }`}
                    >
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-heading text-lg text-foreground uppercase tracking-wide">
                                {item.name}
                              </h4>
                              {item.highlight && (
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-white text-sm mt-1">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-heading text-xl text-primary font-semibold whitespace-nowrap">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tables Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <span className="text-primary font-heading uppercase tracking-[0.3em] text-sm mb-4 block">
              Para Compartir
            </span>
            <h2 className="font-display text-6xl md:text-7xl text-foreground mb-4">
              Tablas pá picar con ganas
            </h2>
            <p className="text-white text-lg max-w-xl mx-auto">
              Perfectas para compartir con amigos. Todas incluyen quesos, aceitunas, tomate cherry, papas bravas y salsas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tables.map((table) => (
              <Card 
                key={table.name}
                onClick={() => handleImageClick(table.image, table.name)}
                className="bg-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 group overflow-hidden cursor-pointer"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="font-heading text-2xl text-foreground uppercase tracking-wide mb-3">
                    {table.name}
                  </h3>
                  
                  <p className="text-white text-sm mb-6 min-h-[60px]">
                    {table.description}
                  </p>
                  
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">2-3 personas</span>
                      <span className="font-heading text-xl text-primary font-semibold">
                        {table.prices.small}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">4-5 personas</span>
                      <span className="font-heading text-xl text-primary font-semibold">
                        {table.prices.large}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Drinks Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="font-display text-6xl md:text-7xl text-primary mb-4">
              Tragos
            </h2>
            <p className="text-white text-lg max-w-xl mx-auto">
              Bebidas para acompañar tu experiencia. Desde cócteles clásicos hasta destilados premium.
            </p>
          </div>

          <div className="space-y-20">
            {drinkCategories.map((category, categoryIndex) => {
              // Ajustar el índice para que la alternancia funcione correctamente
              const adjustedIndex = foodCategories.length + categoryIndex;
              return (
                <div 
                  key={category.title}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    adjustedIndex % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  <div 
                    className={`relative h-80 md:h-[500px] rounded-2xl overflow-hidden group ${
                      adjustedIndex % 2 === 1 ? 'md:order-2' : ''
                    }`}
                  >
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <h3 className="font-display text-4xl md:text-5xl text-primary mb-1">
                        {category.title}
                      </h3>
                      {category.subtitle && (
                        <p className="text-sm text-foreground/80 font-heading uppercase tracking-wider">
                          {category.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className={`${category.title === "Promo 2X" || category.title === "Cervezas y Bebidas" || category.title === "Smash Burgers" ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'} ${adjustedIndex % 2 === 1 ? 'md:order-1' : ''}`}>
                    {category.items.map((item) => (
                      <Card 
                        key={item.name}
                        onClick={() => handleImageClick(item.image, item.name)}
                        className={`bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer ${
                          item.highlight ? 'border-primary/30' : ''
                        }`}
                      >
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-heading text-lg text-foreground uppercase tracking-wide">
                                  {item.name}
                                </h4>
                                {item.highlight && (
                                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-white text-sm mt-1">
                                {item.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-heading text-xl text-primary font-semibold whitespace-nowrap">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2">{selectedImage?.title}</DialogTitle>
            <DialogDescription asChild>
              {selectedImage && (
                <div className="flex justify-center items-center mt-2">
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.title}
                    className="max-w-full max-h-[70vh] w-auto h-auto rounded-lg object-contain"
                  />
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MenuSection;
