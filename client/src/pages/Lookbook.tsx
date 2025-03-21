import { motion } from "framer-motion";
import Gallery from "@/components/lookbook/Gallery";

export default function Lookbook() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-light mb-6">Lookbook</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Take a journey through our curated lookbook, where each ensemble tells a 
          story of modern grace. Gain fresh ideas on pairing timeless staples with 
          eye-catching accents, and discover how to express your personal style 
          with confidence.
        </p>
      </motion.div>

      <Gallery />
    </div>
  );
}
