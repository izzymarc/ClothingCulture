import { motion } from "framer-motion";

const lookbook = [
  {
    id: 1,
    title: "Effortless Daytime Chic",
    description: "Combine crisp tailoring with soft, feminine details for a polished yet relaxed vibe.",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Evening Elegance",
    description: "Elevate the night with luxurious fabrics and sleek silhouettes that command attention.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Weekend Sophistication",
    description: "Casual refinement for your off-duty moments.",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Modern Professional",
    description: "Contemporary workwear that makes a statement.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80"
  }
];

export default function Gallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {lookbook.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative group"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white p-8">
            <div className="text-center">
              <h3 className="text-2xl font-light mb-4">{item.title}</h3>
              <p className="text-gray-200">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
