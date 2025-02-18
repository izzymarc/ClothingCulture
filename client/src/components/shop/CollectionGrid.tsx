import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Silk Blend Dress",
    price: "$289",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Tailored Blazer",
    price: "$349",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Pleated Skirt",
    price: "$189",
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Cashmere Sweater",
    price: "$259",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Wide Leg Pants",
    price: "$219",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Silk Blouse",
    price: "$199",
    image: "https://images.unsplash.com/photo-1467043198406-dc953a3defa0?auto=format&fit=crop&q=80"
  }
];

export default function CollectionGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[3/4] relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary">View Details</Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-muted-foreground">{product.price}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
