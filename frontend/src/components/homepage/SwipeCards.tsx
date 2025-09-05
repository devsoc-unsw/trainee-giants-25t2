import { useState } from "react";
import { Card } from "./Card";
import type { SpotData } from "./types";

interface SwipeCardsProps {
  places: any; // from usePlaces
  setLikes: React.Dispatch<React.SetStateAction<string[]>>;
  setDislikes: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SwipeCards: React.FC<SwipeCardsProps> = ({
  places,
  setLikes,
  setDislikes,
}) => {

  const [cards, setCards] = useState<SpotData[]>(() => {
    if (!places) return [];
    return places.features.map((f: any) => ({
      id: f.placeId,
      name: f.name,
      address: f.address,
      imageUrl: f.photoUrl || "",
      rating: f.rating || 0,
      priceLevel: f.price_level,
    }));
  });

  return (
    <div
      className="grid flex-grow w-full justify-center"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' 
        viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' 
        stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          index={index}
          cards={cards}
          setCards={setCards}
          {...card}
          setLikes={setLikes}
          setDislikes={setDislikes}
        />
      ))}
    </div>
  );
};
