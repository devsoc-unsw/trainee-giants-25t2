import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const mockCards = [
  {
    id: 1,
    name: "Sushi Place",
    imageUrl: "../../../public/zushi-home-hero.jpg",
    rating: 4.6,
    address: "123 Tokyo St, Sydney",
  },
  {
    id: 2,
    name: "Pizza House",
    imageUrl: "../../../public/db9ac6e65b00f2558664e469940eca31.jpeg",
    rating: 4.2,
    address: "456 Napoli Ave, Melbourne",
  },
  {
    id: 3,
    name: "Burger Joint",
    imageUrl: "../../../public/b5158c10111814b7470c980d1fe5dcf3f6f2b048.webp",
    rating: 4.8,
    address: "789 Grill Rd, Brisbane",
  },
];

export function CardCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mockCards.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[300px] flex items-center justify-center">
      {mockCards.map((card, i) => {
        const isActive = i === index;
        const isPrev = (i + 1) % mockCards.length === index;
        const isNext = (i - 1 + mockCards.length) % mockCards.length === index;

        return (
          <motion.div
            key={card.id}
            className="absolute bg-white rounded-2xl overflow-hidden w-[250px] h-[345px] shadow-lg"
            animate={{
              scale: isActive ? 1 : 0.9,
              opacity: isActive ? 1 : 0.5,
              zIndex: isActive ? 10 : 0,
              x: isPrev ? -60 : isNext ? 60 : 0,
              rotate: isPrev ? -10 : isNext ? 10 : 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="relative h-64 overflow-hidden">
							<img
                src={card.imageUrl}
                className="w-full h-full object-cover"
              />
							<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
								⭐ <span className="font-medium text-gray-800">{card.rating}</span>
							</div>
            </div>

            <div className="p-6 flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{card.name}</h3>
                  <p className="text-sm text-gray-600">{card.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
