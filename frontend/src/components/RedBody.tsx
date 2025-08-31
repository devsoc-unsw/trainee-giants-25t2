import { SwipeCards } from "./homepage/SwipeCards";
import type { GeoData } from "./homepage/types";
import { useState } from "react";

export function RedBody() {
  const [likes, setLikes] = useState<GeoData[]>([]);
  const [dislikes, setDislikes] = useState<GeoData[]>([]);


  // TODO LATER, get curr user coordinates
  const lat = -33.8688; // Sydney latitude
  const lon = 151.2093; // Sydney longitude

  return (
    <div className="bg-[#D54C3E] w-full flex flex-grow">
      <SwipeCards
        lat={lat}
        lon={lon}
        setLikes={setLikes}
        setDislikes={setDislikes}
      />
      {/* TODO add list of restaurant liked and disliked  */}
  </div>
  );
}
