import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface TableItem {
  name: string;
  description: string;
  prices: {
    small: string;
    large: string;
  };
}

const tables: TableItem[] = [
  {
    name: "Tabla Puro Filete",
    description: "Cubos de res, pollo, cerdo y mechada condimentado al estilo ONCE",
    prices: { small: "$16.900", large: "$30.900" },
  },
  {
    name: "Más Sabe El Diablo",
    description: "Porción de carne, pollo, camarones salteados, calamares fritos",
    prices: { small: "$16.900", large: "$29.900" },
  },
  {
    name: "La Catrina",
    description: "Burritos carne, quesadillas de pollo, nachos con queso cheddar y guacamole",
    prices: { small: "$23.000", large: "$31.900" },
  },
];

const TablesSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-heading uppercase tracking-[0.3em] text-sm mb-4 block">
            Para Compartir
          </span>
          <h2 className="font-display text-6xl md:text-7xl text-foreground mb-4">
            Tablas
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Perfectas para compartir con amigos. Todas incluyen quesos, aceitunas, tomate cherry, papas bravas y salsas.
          </p>
        </div>

        {/* Tables Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {tables.map((table) => (
            <Card 
              key={table.name}
              className="bg-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="font-heading text-2xl text-foreground uppercase tracking-wide mb-3">
                  {table.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 min-h-[60px]">
                  {table.description}
                </p>
                
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">2-3 personas</span>
                    <span className="font-heading text-xl text-primary font-semibold">
                      {table.prices.small}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">4-5 personas</span>
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
    </section>
  );
};

export default TablesSection;
