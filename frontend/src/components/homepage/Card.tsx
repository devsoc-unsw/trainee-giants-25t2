import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import type { SpotData, GeoData } from "./types";

interface CardProps extends SpotData {
  index: number;
  cards: SpotData[];
  setCards: Dispatch<SetStateAction<SpotData[]>>;
  setLikes: Dispatch<SetStateAction<GeoData[]>>;
  setDislikes: Dispatch<SetStateAction<GeoData[]>>;
}

export const Card: React.FC<CardProps> = ({
  id,
  name,
  imageUrl,
  lngLat,
  cards,
  index,
  setCards,
  setLikes,
  setDislikes,
}) => {
  const [likeStatus, setLikeStatus] = useState<"normal" | "like" | "dislike">("normal");
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-250, 250], [-18, 18]);
  const opacity = useTransform(x, [-250, 0, 250], [0, 2, 0]);
  const backgroundColor = useTransform(
    x,
    [-100, 0, 100],
    [
      "oklch(0.808 0.114 17.571)",
      "oklch(1 0 0)", 
      "oklch(0.871 0.15 144.449)",
    ]
  );

  const isFront = index === cards.length - 1;
  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 10 : -10;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    const swipe = x.get();
    if (Math.abs(swipe) >= 100) {
      const direction = swipe > 0 ? "like" : "dislike";
      processSwipe(direction);
    }
  };

  const processSwipe = (direction: "like" | "dislike") => {
    setCards((prev) => prev.filter((v) => v.id !== id));
    if (direction === "like") setLikes((prev) => [...prev, { lngLat }]);
    else setDislikes((prev) => [...prev, { lngLat }]);
  };

  useEffect(() => {
    if (likeStatus !== "normal") {
      const timeout = setTimeout(() => processSwipe(likeStatus), 100);
      return () => clearTimeout(timeout);
    }
  }, [likeStatus]);

  return (
    <motion.div
      className="h-[650px] w-1/3 origin-bottom rounded-xl border-black shadow-2xl bg-white relative
      hover:cursor-grab active:cursor-grabbing flex flex-col text-3xl"
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
        backgroundColor,
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
      <div className="flex flex-col items-center mt-10 font-semibold text-2xl text-black">
        <p>{name}</p>
      </div>
      <div className="m-2">
        <img
          alt={name}
          src={imageUrl}
          className="w-[400px] h-[400px] object-cover mx-auto my-8 pointer-events-none rounded-md"
        />
      </div>
      <div className="flex">
        <button
          className="w-1/2 bg-red-300 shadow-xl p-4 rounded-lg"
          onClick={() => setLikeStatus("dislike")}
        >
          👎
        </button>
        <button
          className="w-1/2 bg-green-300 p-4 rounded-lg shadow-xl"
          onClick={() => setLikeStatus("like")}
        >
          👍
        </button>
      </div>
    </motion.div>
  );
};
