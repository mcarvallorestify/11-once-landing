import { useState, useEffect } from "react";
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
import { getProducts, getCategories, formatPrice, type FudoProduct, type FudoCategory } from "@/services/fudoApi";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  highlight?: boolean;
  image: string | null;
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

// Configuración de categorías con sus imágenes y subtítulos
const categoryConfig: Record<string, { image: string; subtitle?: string }> = {
  "Smash Burgers": { image: images.burgersmash, subtitle: "100% Carne de Sobrecostilla en Pan Brioche" },
  "México Lindo": { image: images.mexicolindo, subtitle: "Auténticos Sabores Mexicanos" },
  "Sandwich Especiales": { image: images.sandwich2, subtitle: "Todos vienen en Pan de Papa" },
  "Sandwich Mechada": { image: images.sandwich1, subtitle: "Todos vienen en Pan Frika de 15 cms" },
  "Papas ONCE": { image: images.papasonce, subtitle: "Nuestras Famosas Papas Cargadas" },
  "Ensalada": { image: images.ensalada, subtitle: "Fresca y Deliciosa" },
  "Pa' La Bendi": { image: images.palabendi, subtitle: "Para los Pequeños" },
  "Promo 2X": { image: images.promo2x, subtitle: "Oferta Especial - Dos por el Precio de Uno" },
  "Cócteles": { image: images.moscowmule, subtitle: "Mojitos y Moscow Mule" },
  "Pisco y Gin": { image: images.ginkantal, subtitle: "Destilados Premium" },
  "Whisky y Ron": { image: images.whiskyron, subtitle: "Espíritus Selectos" },
  "Vinos y Sours": { image: images.copasangria, subtitle: "Sangrías y Sours Nacionales" },
  "Spritz": { image: images.copa1, subtitle: "Aperitivos Refrescantes" },
  "Cervezas y Bebidas": { image: images.bebida1, subtitle: "Chelas y Refrescos" },
};


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

// Función para mapear productos de la API a items del menú
function mapProductsToMenuItems(products: FudoProduct[]): MenuItem[] {
  return products.map(product => ({
    name: product.name,
    description: product.description || "",
    price: formatPrice(product.price),
    highlight: false, // Puedes ajustar la lógica para determinar highlights
    image: product.image,
  }));
}

// Función para crear un mapa de IDs de categoría a nombres de menú
function createCategoryIdToMenuNameMap(categories: FudoCategory[]): Map<number, string> {
  const idToMenuName = new Map<number, string>();
  
  // Mapeo directo de IDs a nombres de menú
  const directMapping: Record<number, string> = {
    5: "Smash Burgers",   // Hamburguesas
    8: "México Lindo",     // Mexico Lindo
    6: "Sandwich Especiales", // Sandwich Especiales
    7: "Sandwich Mechada",    // Sandwich Mechada
    10: "Papas ONCE",       // Papas Once
    12: "Ensalada",         // Ensalada
    13: "Pa' La Bendi",     // Pa La Bendi
    18: "Promo 2X",         // Happy hours
    14: "Cócteles",         // Cocktails
    21: "Pisco y Gin",      // Destilados
    20: "Cervezas y Bebidas", // Bar
    15: "Cervezas y Bebidas", // Bebidas (subcategoría de Bar)
    16: "Cervezas y Bebidas", // Jugos Naturales (subcategoría de Bar)
    17: "Cervezas y Bebidas", // Chelas (subcategoría de Bar)
    22: "Cervezas y Bebidas", // Mugtails (subcategoría de Bar)
  };

  // Primero, aplicar mapeo directo
  Object.entries(directMapping).forEach(([id, menuName]) => {
    idToMenuName.set(Number(id), menuName);
  });

  // Luego, procesar subcategorías (categorías con productCategoryId no null)
  categories.forEach(category => {
    if (category.productCategoryId !== null) {
      // Si es una subcategoría, usar el mapeo del padre
      const parentMenuName = idToMenuName.get(category.productCategoryId);
      if (parentMenuName) {
        idToMenuName.set(category.id, parentMenuName);
      }
    }
  });

  return idToMenuName;
}

// Función para organizar productos por categorías
function organizeProductsByCategory(
  products: FudoProduct[],
  categories: FudoCategory[]
): MenuCategory[] {
  const categoryIdToMenuName = createCategoryIdToMenuNameMap(categories);
  
  // Agrupar productos por nombre de menú
  const productsByMenuName = new Map<string, FudoProduct[]>();
  
  products.forEach(product => {
    const menuName = categoryIdToMenuName.get(product.productCategoryId);
    if (menuName) {
      if (!productsByMenuName.has(menuName)) {
        productsByMenuName.set(menuName, []);
      }
      productsByMenuName.get(menuName)!.push(product);
    }
  });

  const foodCategoryNames = [
    "Smash Burgers",
    "México Lindo",
    "Sandwich Especiales",
    "Sandwich Mechada",
    "Papas ONCE",
    "Ensalada",
    "Pa' La Bendi",
  ];

  const drinkCategoryNames = [
    "Promo 2X",
    "Cócteles",
    "Pisco y Gin",
    "Whisky y Ron",
    "Vinos y Sours",
    "Spritz",
    "Cervezas y Bebidas",
  ];

  const allCategories: MenuCategory[] = [];

  // Procesar categorías de comida
  foodCategoryNames.forEach(categoryName => {
    const categoryProducts = productsByMenuName.get(categoryName) || [];
    if (categoryProducts.length > 0) {
      const config = categoryConfig[categoryName];
      allCategories.push({
        title: categoryName,
        subtitle: config?.subtitle,
        image: config?.image || images.restaurantAmbiance,
        items: mapProductsToMenuItems(categoryProducts),
      });
    }
  });

  // Procesar categorías de bebidas
  drinkCategoryNames.forEach(categoryName => {
    const categoryProducts = productsByMenuName.get(categoryName) || [];
    if (categoryProducts.length > 0) {
      const config = categoryConfig[categoryName];
      allCategories.push({
        title: categoryName,
        subtitle: config?.subtitle,
        image: config?.image || images.restaurantAmbiance,
        items: mapProductsToMenuItems(categoryProducts),
      });
    }
  });

  return allCategories;
}

const MenuSection = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [foodCategories, setFoodCategories] = useState<MenuCategory[]>([]);
  const [drinkCategories, setDrinkCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenuData() {
      try {
        const [products, categories] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        const allCategories = organizeProductsByCategory(products, categories);
        
        const foodCategoryNames = [
          "Smash Burgers",
          "México Lindo",
          "Sandwich Especiales",
          "Sandwich Mechada",
          "Papas ONCE",
          "Ensalada",
          "Pa' La Bendi",
        ];

        const drinkCategoryNames = [
          "Promo 2X",
          "Cócteles",
          "Pisco y Gin",
          "Whisky y Ron",
          "Vinos y Sours",
          "Spritz",
          "Cervezas y Bebidas",
        ];

        const food = allCategories.filter(c => foodCategoryNames.includes(c.title));
        const drinks = allCategories.filter(c => drinkCategoryNames.includes(c.title));

        setFoodCategories(food);
        setDrinkCategories(drinks);
      } catch (error) {
        console.error('Error al cargar el menú:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMenuData();
  }, []);

  const handleImageClick = (image: string | null, title: string) => {
    // Si la imagen es null, no mostrar nada
    if (image) {
    setSelectedImage({ src: image, title });
    }
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
        {loading ? (
          <div className="text-center py-20">
            <p className="text-white text-lg">Cargando menú...</p>
          </div>
        ) : (
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
                        className={`bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                          item.image ? 'cursor-pointer' : 'cursor-default'
                        } ${
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
                      className={`bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                        item.image ? 'cursor-pointer' : 'cursor-default'
                      } ${
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
        )}

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
                        className={`bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                          item.image ? 'cursor-pointer' : 'cursor-default'
                        } ${
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
