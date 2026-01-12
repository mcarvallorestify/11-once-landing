const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0YmRhc2VodGNxZmZ5b3NjZ3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5ODY2OTQsImV4cCI6MjA1NTU2MjY5NH0.Yz10xEXTbLYvdtvMyx4sWKSLZDZE7nC21AVImgo0Pzc';
// Servicio para la API de FUDO (vía Supabase Edge Function)

const SUPABASE_FUDO_PROXY =
  'https://btbdasehtcqffyoscgzp.supabase.co/functions/v1/fudo-proxy';

/* =========================
   Interfaces
========================= */

export interface FudoProduct {
  active: boolean;
  description: string | null;
  id: number;
  name: string;
  price: number;
  productCategoryId: number;
  productGroups: any[];
  image: string | null;
  enableOnlineMenu: boolean | null;
  enableQrMenu: boolean | null;
  sellAlone: boolean;
  code: string | null;
}

export interface FudoCategory {
  id: number;
  name: string;
  productCategoryId: number | null;
  enableOnlineMenu: boolean | null;
  enableQrMenu: boolean | null;
}

export interface FudoProductsResponse {
  products: FudoProduct[];
}

export interface FudoCategoriesResponse {
  productCategories: FudoCategory[];
}

/* =========================
   Configuración de menú
========================= */

const CATEGORY_MAPPING: Record<string, string> = {
  'Hamburguesas': 'Smash Burgers',
  'Mexico Lindo': 'México Lindo',
  'Sandwich Especiales': 'Sandwich Especiales',
  'Sandwich Mechada': 'Sandwich Mechada',
  'Papas Once': 'Papas ONCE',
  'Ensalada': 'Ensalada',
  'Pa La Bendi': "Pa' La Bendi",
  'Happy hours': 'Promo 2X',
  'Cocktails': 'Cócteles',
  'Destilados': 'Pisco y Gin',
  'Whisky y Ron': 'Whisky y Ron',
  'Vinos y Sours': 'Vinos y Sours',
  'Spritz': 'Spritz',
  'Bar': 'Cervezas y Bebidas',
  'Bebestible menú': 'Cervezas y Bebidas',
  'Cervezas': 'Cervezas y Bebidas',
  'Bebidas': 'Cervezas y Bebidas',
};

const INCLUDED_CATEGORIES = [
  'Smash Burgers',
  'México Lindo',
  'Sandwich Especiales',
  'Sandwich Mechada',
  'Papas ONCE',
  'Ensalada',
  "Pa' La Bendi",
  'Promo 2X',
  'Cócteles',
  'Pisco y Gin',
  'Whisky y Ron',
  'Vinos y Sours',
  'Spritz',
  'Cervezas y Bebidas',
];

/* =========================
   Helper para llamar al proxy
========================= */

async function callFudo<T>(endpoint: string): Promise<T> {
  const response = await fetch(SUPABASE_FUDO_PROXY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ endpoint }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error FUDO proxy (${response.status}): ${text}`);
  }

  return response.json();
}


/* =========================
   Productos
========================= */

export async function getProducts(): Promise<FudoProduct[]> {
  try {
    const data = await callFudo<FudoProductsResponse>('products');
    // Filtrar solo productos activos (active === true)
    return data.products.filter(p => p.active === true);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
}

/* =========================
   Categorías
========================= */

export async function getCategories(): Promise<FudoCategory[]> {
  try {
    const data = await callFudo<FudoCategoriesResponse>('productCategories');
    return data.productCategories;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
}

/* =========================
   Categorías mapeadas
========================= */

export async function getMappedCategories(): Promise<Map<string, FudoCategory[]>> {
  const categories = await getCategories();
  const categoryMap = new Map<string, FudoCategory[]>();

  categories.forEach(category => {
    const menuCategoryName = CATEGORY_MAPPING[category.name];
    if (
      menuCategoryName &&
      INCLUDED_CATEGORIES.includes(menuCategoryName)
    ) {
      if (!categoryMap.has(menuCategoryName)) {
        categoryMap.set(menuCategoryName, []);
      }
      categoryMap.get(menuCategoryName)!.push(category);
    }
  });

  return categoryMap;
}

/* =========================
   Utils
========================= */

export function formatPrice(price: number): string {
  return `$${price.toLocaleString('es-CL')}`;
}
