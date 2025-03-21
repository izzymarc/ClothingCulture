import { motion } from "framer-motion";
import { Sparkles, Leaf, Layout } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Quality Craftsmanship",
    description: "We work with experienced artisans and premium materials to ensure each garment meets the highest standards."
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    description: "We prioritize ethical and eco-friendly practices from concept to creation."
  },
  {
    icon: Layout,
    title: "Effortless Versatility",
    description: "Our designs transition seamlessly from day to night, reflecting your individuality in every setting."
  }
];

export default function BrandValues() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background shadow-md mb-6">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-4">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
