import { useState, useEffect } from "react";
import { Card } from "./Card";
import type { GeoData, SpotData } from "./types";
import { usePlaces } from "../../hooks/usePlaces";

interface SwipeCardsProps {
  lat: number;
  lon: number;
  setLikes: React.Dispatch<React.SetStateAction<GeoData[]>>;
  setDislikes: React.Dispatch<React.SetStateAction<GeoData[]>>;
}

export const SwipeCards: React.FC<SwipeCardsProps> = ({
  lat,
  lon,
  setLikes,
  setDislikes,
}) => {
  const { data: places, isLoading } = usePlaces(lat, lon);
  const [cards, setCards] = useState<SpotData[]>([]);

  useEffect(() => {
    if (!places) return;
    const transformed: SpotData[] = places.features.map((f: any, idx: number) => ({
      id: idx,
      name: f.properties.name,
      imageUrl:
        f.properties.wiki_and_media?.image ||
        f.properties.datasource?.raw?.image ||
        "", // fallback
      lngLat: {
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
      },
    }));
    setCards(transformed);
  }, [places]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div
      className="absolute grid z-[1000] top-0 min-h-screen w-full place-items-center"
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
