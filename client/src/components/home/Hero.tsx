import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80')] 
        bg-cover bg-center"
        style={{ opacity: 0.15 }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">
            Experience Timeless Elegance
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Discover our exclusive collections, crafted for the discerning woman 
            seeking sophistication and modern grace.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="text-lg">
                Shop New Arrivals
              </Button>
            </Link>
            <Link href="/lookbook">
              <Button size="lg" variant="outline" className="text-lg">
                View Lookbook
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
