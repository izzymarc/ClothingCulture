import { motion } from "framer-motion";
import CollectionGrid from "@/components/shop/CollectionGrid";

export default function Shop() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-light mb-6">Our Collections</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our range of elevated essentials and signature statement pieces. 
          Each collection is designed to be effortlessly integrated into your existing 
          wardrobe, making every outfit feel uniquely yours.
        </p>
      </motion.div>

      <CollectionGrid />
    </div>
  );
}
