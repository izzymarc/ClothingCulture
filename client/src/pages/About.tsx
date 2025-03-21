import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl font-light mb-8">Our Story</h1>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          August Culture was founded on the belief that true style transcends fleeting trends. 
          Each piece in our collection is inspired by the elegance of timeless fashion and 
          the confidence of modern women. With an unwavering commitment to quality and 
          sustainability, we strive to create garments that not only look exceptional but 
          also feel meaningful to wear.
        </p>

        <div className="mt-20 mb-20">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
              alt="Joan Zinab Dogo"
              className="w-48 h-48 rounded-full mx-auto object-cover mb-6"
            />
            <h2 className="text-2xl font-light mb-2">Joan Zinab Dogo</h2>
            <p className="text-muted-foreground mb-6">Founder & CEO</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Under the visionary leadership of Joan Zinab Dogo, August Culture has 
              redefined contemporary fashion. With over a decade of experience in the 
              fashion industry, Joan's commitment to sustainable practices and timeless 
              design has shaped our brand's ethos. Her innovative approach combines 
              traditional craftsmanship with modern aesthetics, creating pieces that 
              resonate with the sophisticated woman of today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <div className="text-left">
            <h2 className="text-2xl font-light mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              Our mission is to bring enchantment back into clothing by offering refined, 
              versatile, and thoughtfully designed pieces that celebrate the wearer's sense of self.
            </p>
          </div>

          <div className="text-left">
            <h2 className="text-2xl font-light mb-4">Brand Philosophy</h2>
            <p className="text-muted-foreground">
              At August Culture, we value authenticity and individuality. We believe that 
              when you feel confident in your clothing, you carry that energy into every 
              aspect of your life.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}