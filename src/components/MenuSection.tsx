import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import { images } from "@/constants/images";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  slug?: string;
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
  "Chorrillana": { image: images.chorrillana, subtitle: "El clásico chileno para compartir" },
  "Ensalada": { image: images.ensalada, subtitle: "Fresca y Deliciosa" },
  "Pa' La Bendi": { image: images.palabendi, subtitle: "Para los Pequeños" },
  "Promo 2X": { image: images.promo2x, subtitle: "Oferta Especial - De Martes a Jueves Todo el día y Viernes de 18:00 a 21:00 hrs" },
  "Cócteles": { image: images.moscowmule, subtitle: "Mojitos y Moscow Mule" },
  "Pisco y Gin": { image: images.ginkantal, subtitle: "Destilados Premium" },
  "Whisky y Ron": { image: images.whiskyron, subtitle: "Espíritus Selectos" },
  "Vinos y Sours": { image: images.copasangria, subtitle: "Sangrías y Sours Nacionales" },
  "Spritz": { image: images.copa1, subtitle: "Aperitivos Refrescantes" },
  "Cervezas y Bebidas": { image: images.bebida1, subtitle: "Chelas y Refrescos" },
  "Cafetería": { image: images.cafeteria, subtitle: "Café y Té" },
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
    30: "Chorrillana",      // Chorrillana
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
    29: "Cafetería",
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
    "Chorrillana",
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

  const cafeteriaCategoryNames = ["Cafetería"];

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

  // Procesar cafetería (id 29)
  cafeteriaCategoryNames.forEach(categoryName => {
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

function categoryToId(title: string): string {
  return title.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
}

interface MenuCategoryAccordionProps {
  categories: MenuCategory[];
  openId: string;
  onOpenChange: (id: string) => void;
  onImageClick: (image: string | null, title: string) => void;
}

function MenuItemRow({
  item,
  onImageClick,
}: {
  item: MenuItem;
  onImageClick: (image: string | null, title: string) => void;
}) {
  const hasImage = !!item.image;

  return (
    <button
      type="button"
      onClick={() => hasImage && onImageClick(item.image, item.name)}
      className={`w-full text-left px-4 md:px-6 py-4 border-b border-border/30 last:border-b-0 transition-colors hover:bg-primary/5 flex gap-3 md:gap-4 items-start ${
        hasImage ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {hasImage && (
        <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden ring-1 ring-border/50">
          <img
            src={item.image!}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <h4 className="font-heading text-sm md:text-base text-foreground uppercase tracking-wide flex-1 min-w-0">
            {item.name}
            {item.highlight && (
              <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full normal-case">
                Popular
              </span>
            )}
          </h4>
          <span className="font-heading text-base md:text-lg text-primary font-semibold whitespace-nowrap shrink-0">
            {item.price}
          </span>
        </div>
        {item.description ? (
          <div className="mt-2 pr-2">
            <p className="text-[10px] md:text-xs text-primary/70 font-heading uppercase tracking-wider mb-1">
              Ingredientes
            </p>
            <p className="text-white/65 text-xs md:text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ) : null}
      </div>
    </button>
  );
}

function MenuCategoryAccordion({
  categories,
  openId,
  onOpenChange,
  onImageClick,
}: MenuCategoryAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      value={openId}
      onValueChange={(value) => onOpenChange(value)}
      className="space-y-3"
    >
      {categories.map((category) => {
        const id = category.slug ?? categoryToId(category.title);
        const isOpen = openId === id;

        return (
          <AccordionItem
            key={category.title}
            value={id}
            id={id}
            className={`border-0 rounded-xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? "ring-1 ring-primary/40 shadow-lg shadow-primary/5"
                : "ring-1 ring-border/40"
            }`}
          >
            <AccordionTrigger className="hover:no-underline px-0 py-0 [&>svg]:hidden group">
              <div className="flex w-full items-stretch min-h-[88px] md:min-h-[100px]">
                {category.image ? (
                  <div className="relative w-24 md:w-32 shrink-0 overflow-hidden">
                    <img
                      src={category.image}
                      alt=""
                      className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                        category.title === "Spritz" ? "object-contain bg-card" : "object-cover"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80" />
                  </div>
                ) : (
                  <div className="w-2 shrink-0 bg-primary" />
                )}
                <div className="flex flex-1 items-center justify-between gap-3 px-4 md:px-6 py-4 bg-card">
                  <div className="text-left min-w-0">
                    <h3 className="font-display text-xl md:text-2xl text-primary leading-tight">
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p className="text-xs md:text-sm text-white/60 font-heading uppercase tracking-wider mt-1 line-clamp-2">
                        {category.subtitle}
                      </p>
                    )}
                    {category.otrosubtitulo && (
                      <p className="text-xs text-white/50 mt-1 line-clamp-1">{category.otrosubtitulo}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline text-xs text-white/40 font-heading uppercase tracking-wider">
                      {category.items.length} {category.items.length === 1 ? "item" : "items"}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-primary/10 text-primary"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-card/50 border-t border-border/30">
              <div className="divide-y divide-border/20">
                {category.items.map((item) => (
                  <MenuItemRow key={item.name} item={item} onImageClick={onImageClick} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

const MenuSection = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [foodCategories, setFoodCategories] = useState<MenuCategory[]>([]);
  const [cafeteriaCategories, setCafeteriaCategories] = useState<MenuCategory[]>([]);
  const [drinkCategories, setDrinkCategories] = useState<MenuCategory[]>([]);
  const [tableCategory, setTableCategory] = useState<MenuCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [openCategoryId, setOpenCategoryId] = useState("");

  useEffect(() => {
    const hashAliases: Record<string, string> = {
      cafeteria: "cafetería",
    };

    const syncHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash !== "menu" && hash !== "tragos") {
        setOpenCategoryId(hashAliases[hash] ?? hash);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!openCategoryId) return;
    const el = document.getElementById(openCategoryId);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [openCategoryId, loading]);

  useEffect(() => {
    async function loadMenuData() {
      try {
        const [products, categories] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        const allCategories = organizeProductsByCategory(products, categories);

        const tableProducts = products.filter((p) => p.productCategoryId === 9);
        const tableItems = mapProductsToTableItems(tableProducts);

        const foodCategoryNames = [
          "Menú almuerzo",
          "Smash Burgers",
          "México Lindo",
          "Sandwich Especiales",
          "Sandwich Mechada",
          "Papas ONCE",
          "Chorrillana",
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

        const cafeteriaCategoryNames = ["Cafetería"];

        setFoodCategories(allCategories.filter((c) => foodCategoryNames.includes(c.title)));
        setCafeteriaCategories(allCategories.filter((c) => cafeteriaCategoryNames.includes(c.title)));
        setDrinkCategories(allCategories.filter((c) => drinkCategoryNames.includes(c.title)));

        if (tableItems.length > 0) {
          setTableCategory({
            title: "Tablas Para Picar Con Ganas",
            slug: "tablas",
            subtitle: "Perfectas para compartir con amigos. Quesos, aceitunas, tomate cherry, papas bravas y salsas.",
            image: images.tfilete,
            items: tableItems.map((t) => ({
              name: t.name,
              description: t.description,
              price: t.price,
              image: t.image,
            })),
          });
        }
      } catch (error) {
        console.error("Error al cargar el menú:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMenuData();
  }, []);

  const handleImageClick = (image: string | null, title: string) => {
    if (image) {
      setSelectedImage({ src: image, title });
    }
  };

  const handleCategoryOpen = (id: string) => {
    setOpenCategoryId(id);
    if (id) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const tableAccordionCategory = tableCategory
    ? [{ ...tableCategory, title: "Tablas Para Picar Con Ganas" }]
    : [];

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl md:text-7xl text-primary mb-4">
            Nuestra Carta
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Toca una categoría para ver los productos
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-white text-lg">Cargando menú...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Comida */}
            {foodCategories.length > 0 && (
              <div>
                <p className="text-primary font-heading uppercase tracking-[0.25em] text-xs mb-4 text-center">
                  Comida
                </p>
                <MenuCategoryAccordion
                  categories={foodCategories}
                  openId={openCategoryId}
                  onOpenChange={handleCategoryOpen}
                  onImageClick={handleImageClick}
                />
              </div>
            )}

            {/* Tablas */}
            {tableAccordionCategory.length > 0 && (
              <div id="tablas">
                <p className="text-primary font-heading uppercase tracking-[0.25em] text-xs mb-4 text-center">
                  Para compartir
                </p>
                <MenuCategoryAccordion
                  categories={tableAccordionCategory}
                  openId={openCategoryId}
                  onOpenChange={handleCategoryOpen}
                  onImageClick={handleImageClick}
                />
              </div>
            )}

            {/* Cafetería */}
            {cafeteriaCategories.length > 0 && (
              <div id="cafeteria">
                <p className="text-primary font-heading uppercase tracking-[0.25em] text-xs mb-4 text-center">
                  Cafetería
                </p>
                <MenuCategoryAccordion
                  categories={cafeteriaCategories}
                  openId={openCategoryId}
                  onOpenChange={handleCategoryOpen}
                  onImageClick={handleImageClick}
                />
              </div>
            )}

            {/* Tragos */}
            {drinkCategories.length > 0 && (
              <div id="tragos">
                <div className="text-center mb-8">
                  <h3 className="font-display text-4xl md:text-5xl text-primary mb-2">
                    Tragos
                  </h3>
                  <p className="text-white/60 text-sm md:text-base">
                    Cócteles, destilados y bebestibles
                  </p>
                </div>
                <MenuCategoryAccordion
                  categories={drinkCategories}
                  openId={openCategoryId}
                  onOpenChange={handleCategoryOpen}
                  onImageClick={handleImageClick}
                />
              </div>
            )}
          </div>
        )}
      </div>

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
