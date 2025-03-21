import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const collections = [
  {
    title: "Classic Silhouettes",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80",
    description: "Timeless pieces that form the foundation of any sophisticated wardrobe."
  },
  {
    title: "Modern Statements",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80",
    description: "Bold designs that fuse elegance with contemporary flair."
  },
  {
    title: "Seasonal Highlights",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80",
    description: "Limited edition pieces inspired by the latest global trends."
  }
];

export default function FeaturedCollections() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4">Elevate Your Wardrobe</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From classic silhouettes to contemporary statement pieces, our collections
            are thoughtfully curated to enhance your unique style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Link href="/shop">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-2">{collection.title}</h3>
                      <p className="text-muted-foreground">{collection.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
