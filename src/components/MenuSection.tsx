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
  otrosubtitulo?: string;
  image: string | null;
  items: MenuItem[];
}

interface TableItem {
  name: string;        // ← incluye (2-3) o (4-5)
  description: string;
  price: string;
  image: string | null;
}


// Configuración de categorías con sus imágenes y subtítulos
const categoryConfig: Record<string, { image?: string; subtitle?: string; otrosubtitulo?: string }> = {
  "Smash Burgers": {
  image: images.burgersmash,
  subtitle: "100% Carne de Sobrecostilla en Pan Brioche.",
  otrosubtitulo: "Porción de papas en cada Smash Burgers",
},
  "Menú almuerzo": { image: "", subtitle: "Menú del día — Almuerzo" },

  "México Lindo": { image: images.mexicolindo, subtitle: "Auténticos Sabores Mexicanos" },
  "Sandwich Especiales": { image: images.sandwich2, subtitle: "Todos vienen en pan brioche" },
  "Sandwich Mechada": { image: images.sandwich1, subtitle: "Todos vienen en Pan Frika de 15 cms" },
  "Tablas Para Picar Con Ganas": { image: images.tfilete, subtitle: "Perfectas para compartir con amigos" },
  "Papas ONCE": { image: images.papasonce, subtitle: "Nuestras Famosas Papas Cargadas" },
  "Ensalada": { image: images.ensalada, subtitle: "Fresca y Deliciosa" },
  "Pa' La Bendi": { image: images.palabendi, subtitle: "Para los Pequeños" },
  "Promo 2X": { image: images.promo2x, subtitle: "Oferta Especial" },
  "Cócteles": { image: images.moscowmule, subtitle: "Mojitos y Moscow Mule" },
  "Pisco y Gin": { image: images.ginkantal, subtitle: "Destilados Premium" },
  "Whisky y Ron": { image: images.whiskyron, subtitle: "Espíritus Selectos" },
  "Vinos y Sours": { image: images.copasangria, subtitle: "Sangrías y Sours Nacionales" },
  "Spritz": { image: images.copa1, subtitle: "Aperitivos Refrescantes" },
  "Cervezas y Bebidas": { image: images.bebida1, subtitle: "Chelas y Refrescos" },
};


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

// Función para mapear productos de tablas a TableItem
function mapProductsToTableItems(products: FudoProduct[]): TableItem[] {
  return products.map(product => ({
    name: product.name, // ← viene desde Fudo con (2-3) o (4-5)
    description: product.description || "",
    price: formatPrice(product.price),
    image: product.image || null,
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
    9: "Tablas Para Picar Con Ganas", // Tablas Para Picar Con Ganas
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
    24: "Menú almuerzo",
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
    "Menú almuerzo",
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
        otrosubtitulo: config?.otrosubtitulo,
        image: config?.image,
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
        image: config?.image,
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
  const [tables, setTables] = useState<TableItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenuData() {
      try {
        const [products, categories] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        const allCategories = organizeProductsByCategory(products, categories);
        
        // Obtener productos de tablas directamente por productCategoryId: 9
        const tableProducts = products.filter(p => p.productCategoryId === 9);
        const tableItems = mapProductsToTableItems(tableProducts);
        
        const foodCategoryNames = [
          "Menú almuerzo",
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
        setTables(tableItems);
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
                <div id={category.title.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-')} key={category.title} className="space-y-12">
                  {/* Centered Image and Title */}
                  <div className="flex flex-col items-center">
                        {category.image ? (
                          <div className="relative h-80 md:h-[500px] w-full max-w-4xl rounded-2xl overflow-hidden group mb-6">
                            <img 
                              src={category.image} 
                              alt={category.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                          </div>
                        ) : null}
                        <div className="text-center">
                          <h3 className="font-display text-4xl md:text-5xl text-primary mb-2">
                            {category.title}
                          </h3>
                          {category.subtitle && (
                            <p className="text-sm text-white font-heading uppercase tracking-wider">
                              {category.subtitle}
                            </p>
                          )}
                          {category.otrosubtitulo && (
                            <p className="text-lg md:text-xl text-white mt-2 font-semibold">
                              {category.otrosubtitulo}
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

            // Regular layout for other categories - usando grid layout
            return (
              <div id={category.title.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-')} key={category.title} className="space-y-12">
                {/* Centered Image and Title */}
                <div className="flex flex-col items-center">
                  {category.image ? (
                    <div className="relative h-80 md:h-[500px] w-full max-w-4xl rounded-2xl overflow-hidden group mb-6">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className={`w-full h-full ${
                          category.title === "Spritz" 
                            ? "object-contain bg-background" 
                            : "object-cover"
                        } transition-transform duration-700 group-hover:scale-110`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </div>
                  ) : null}
                  <div className="text-center">
                    <h3 className="font-display text-4xl md:text-5xl text-primary mb-2">
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p className="text-sm text-white font-heading uppercase tracking-wider">
                        {category.subtitle}
                      </p>
                    )}
                    {category.otrosubtitulo && (
                      <p className="text-lg md:text-xl text-white mt-2 font-semibold">
                        {category.otrosubtitulo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Menu Items in grid layout */}
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
          })}
        </div>
        )}

        {/* Tables Section */}
        {tables.length > 0 && (
        <div id="tablas" className="mt-20">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tables.map((table) => (
              <Card 
                key={table.name}
                onClick={() => table.image ? handleImageClick(table.image, table.name) : undefined}
                className={`bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                  table.image ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <h4 className="font-heading text-base text-foreground uppercase tracking-wide">
                            {table.name}
                          </h4>
                        </div>
                        <p className="text-white text-xs mt-1">
                          {table.description}
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border/50 flex justify-end">
  <span className="font-heading text-lg text-primary font-semibold">
    {table.price}
  </span>
</div>

                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        )}

        {/* Drinks Section */}
        <div id="tragos" className="mt-20">
          <div className="text-center mb-16">
            <h2 className="font-display text-6xl md:text-7xl text-primary mb-4">
              Tragos
            </h2>
            <p className="text-white text-lg max-w-xl mx-auto">
              Bebidas para acompañar tu experiencia. Desde cócteles clásicos hasta destilados premium.
            </p>
          </div>

          <div className="space-y-20">
            {drinkCategories.map((category) => {
              return (
                <div id={category.title.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-')} key={category.title} className="space-y-12">
                  {/* Centered Image and Title */}
                  <div className="flex flex-col items-center">
                      {category.image ? (
                        <div className={`relative h-80 md:h-[500px] w-full max-w-4xl rounded-2xl overflow-hidden group mb-6 ${
                          category.title === "Spritz" ? "bg-background" : ""
                        }`}>
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
                        </div>
                      ) : null}
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

                  {/* Menu Items in grid layout */}
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
