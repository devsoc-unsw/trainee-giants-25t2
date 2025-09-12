import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import type { SpotData } from "../homepage/types";

interface CardProps extends SpotData {
  index: number;
  cards: SpotData[];
  likes: string[];
  setCards: Dispatch<SetStateAction<SpotData[]>>;
  setLikes: Dispatch<SetStateAction<string[]>>;
  setDislikes: Dispatch<SetStateAction<string[]>>;
}

export const Card: React.FC<CardProps> = ({
  id,
  name,
  imageUrl,
  cards,
  rating,
  // priceLevel,
  address,
  index,
  likes,
  setCards,
  setLikes,
  setDislikes,
}) => {
  const [likeStatus, setLikeStatus] = useState<"normal" | "like" | "dislike">("normal");
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-250, 250], [-18, 18]);
  const opacity = useTransform(x, [-250, 0, 250], [0, 2, 0]);
  // const backgroundColor = useTransform(
  //   x,
  //   [-100, 0, 100],
  //   [
  //     "oklch(0.808 0.114 17.571)",
  //     "oklch(1 0 0)", 
  //     "oklch(0.871 0.15 144.449)",
  //   ]
  // );

  const isFront = index === cards.length - 1;
  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 10 : -10;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (likes.length >= 9) {
      // TODO add a popup or something
      return; 
    }
    const swipe = x.get();
    if (Math.abs(swipe) >= 100) {
      const direction = swipe > 0 ? "like" : "dislike";
      processSwipe(direction);
    }
  };

  const processSwipe = (direction: "like" | "dislike") => {
    setCards((prev) => prev.filter((v) => v.id !== id));
    if (direction === "like") setLikes((prev) => [...prev, name]);
    else setDislikes((prev) => [...prev, name]);
  };

  useEffect(() => {
    if (likeStatus !== "normal") {
      const timeout = setTimeout(() => processSwipe(likeStatus), 100);
      return () => clearTimeout(timeout);
    }
  }, [likeStatus]);

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-grab active:cursor-grabbing select-none w-[500px] h-[550px]"
      variants={{
        normal: {
          x: 0,
          scale: isFront ? 1 : 0.95,
          transition: { duration: 0.3 },
        },
        like: {
          x: 300,
          transition: { duration: 0.3 },
        },
        dislike: {
          x: -300,
          transition: { duration: 0.3 },
        },
      }}
      initial="normal"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        zIndex: index,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
      }}
      animate={likeStatus}
      drag={"x"}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
       <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {rating > 0 && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            ⭐ <span className="font-medium text-gray-800">{rating}</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
            <p className="text-sm text-gray-600">{address}</p>
          </div>
          {/* <div className="text-right">
            {priceLevel && (
              <div className="text-sm text-gray-600">
                {"$".repeat(priceLevel)}
              </div>
            )}
          </div> */}
        </div>

        <div className="flex gap-4 mt-auto">
          <button
            onClick={() => setLikeStatus("dislike")}
            className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            👎 Pass
          </button>
          <button
            onClick={() => setLikeStatus("like")}
            className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            👍 Like      
          </button>
        </div>
      </div>
    </motion.div>
  );
};
