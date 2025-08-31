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
    <div className="bg-[#D54C3E] w-full flex flex-grow relative">
      <div className="flex flex-col items-center w-full mt-[-40px]">
        <SwipeCards
          lat={lat}
          lon={lon}
          setLikes={setLikes}
          setDislikes={setDislikes}
        />
      </div>
      <button
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#E98657] text-white font-bold rounded-md w-[200px]"
      >
        Continue
      </button>
    </div>
);

}
