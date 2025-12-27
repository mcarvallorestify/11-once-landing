import { Card, CardContent } from "@/components/ui/card";
import heroBurger from "@/assets/hero-burger.jpg";
import mexicanSpread from "@/assets/mexican-spread.jpg";
import loadedFries from "@/assets/loaded-fries.jpg";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  highlight?: boolean;
}

interface MenuCategory {
  title: string;
  subtitle?: string;
  image: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    title: "Smash Burgers",
    subtitle: "100% Carne de Sobrecostilla en Pan Brioche",
    image: heroBurger,
    items: [
      { name: "El Que Sabe, Sabe", description: "Tomate, escarola fresca, pepinillo, cebolla morada", price: "$8.900" },
      { name: "Corazón Contento", description: "Queso cheddar, cebolla caramelizada y tocino crocante", price: "$10.900", highlight: true },
      { name: "A Lo Maldito", description: "Triple smashburger, queso cheddar, queso gouda, champiñones, cebolla caramelizada y tocino", price: "$13.900", highlight: true },
      { name: "Piscinazo", description: "Estilo brasileño, sumergido en queso cheddar fundido y tocino crocante", price: "$11.900" },
      { name: "De Las Mechas", description: "Queso gouda, carne mechada, tomate y tocino crocante", price: "$13.900" },
    ],
  },
  {
    title: "México Lindo",
    subtitle: "Auténticos Sabores Mexicanos",
    image: mexicanSpread,
    items: [
      { name: "Fajitas Chingonas", description: "Pollo, carne o mixta con vegetales salteados, palta, queso y salsas", price: "$8.900" },
      { name: "Burrito Cabrón", description: "Con frijoles, arroz mexicano, lechuga, tomate, palta y salsa", price: "$8.900", highlight: true },
      { name: "Quesadillas Wey", description: "Pollo, carne mechada o mixta con queso, lechuga, tomate y palta", price: "$8.900" },
      { name: "Pinche Enchiladas", description: "Con frijoles refritos, arroz mexicano, lechuga, tomate y palta", price: "$10.500" },
      { name: "Nachos Cheddar", description: "Carne, salsa mexicana, queso cheddar, sour cream y palta", price: "Desde $23.000" },
    ],
  },
  {
    title: "Papas ONCE",
    subtitle: "Nuestras Famosas Papas Cargadas",
    image: loadedFries,
    items: [
      { name: "Papas ONCE 600gr", description: "Papas rústicas con queso cheddar, carne mechada, tomate, tocino y salsa cilantro", price: "$9.900", highlight: true },
      { name: "Papas ONCE 350gr", description: "Versión para uno con todos los toppings", price: "$6.900" },
      { name: "César ONCE", description: "Ensalada César al estilo de la casa", price: "$8.900" },
    ],
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-6xl md:text-7xl text-primary mb-4">
            Nuestra Carta
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Sabores audaces para paladares exigentes. Cada plato preparado con ingredientes frescos y mucho amor.
          </p>
        </div>

        {/* Menu Categories */}
        <div className="space-y-20">
          {menuCategories.map((category, categoryIndex) => (
            <div 
              key={category.title}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                categoryIndex % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div 
                className={`relative h-80 md:h-[500px] rounded-2xl overflow-hidden group ${
                  categoryIndex % 2 === 1 ? 'md:order-2' : ''
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
              <div className={`space-y-4 ${categoryIndex % 2 === 1 ? 'md:order-1' : ''}`}>
                {category.items.map((item) => (
                  <Card 
                    key={item.name}
                    className={`bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
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
                          <p className="text-muted-foreground text-sm mt-1">
                            {item.description}
                          </p>
                        </div>
                        <span className="font-heading text-xl text-primary font-semibold whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
