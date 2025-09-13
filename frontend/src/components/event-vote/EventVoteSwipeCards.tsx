import { SwipeCards } from "./SwipeCards";
import { useState } from "react";
import { usePlaces } from "../../hooks/usePlaces";
import { LikedRestaurants } from "./LikedRestaurants";
import { DislikedRestaurants } from "./DislikedRestaurants";
import { LoadingSpinner } from "../homepage/Loading";

interface EventVoteSwipeCardsProps {
  likes: string[];
  setLikes: React.Dispatch<React.SetStateAction<string[]>>;
  dislikes: string[];
  setDislikes: React.Dispatch<React.SetStateAction<string[]>>;
}

const EventVoteSwipeCards = ({ likes, setLikes, dislikes, setDislikes }: EventVoteSwipeCardsProps) => {
  const [finished, setFinished] = useState<boolean>(false);

  const swap = (restaurant: string, to: string) => {
    if (to === "like") {
      setDislikes((prev: string[]) => prev.filter((dislike: string) => dislike != restaurant));
      setLikes((prev: string[]) => [...prev, restaurant]);
    } else if (to === "dislike") {
      setLikes((prev: string[]) => prev.filter((like: string) => like != restaurant));
      setDislikes((prev: string[]) => [...prev, restaurant]);
    }
  }
  
  const lat = -33.8688;
  const lon = 151.2093;

  const { data: places, isLoading } = usePlaces(lat, lon);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
      <div className={`w-[1280px] flex flex-row justify-center ${finished ? 'gap-8' : 'gap-16'}`}>
        <DislikedRestaurants
          dislikes={dislikes}
          swap={swap}
        />
        <SwipeCards
          places={places} // pass data down
          // likes={likes}
          setLikes={setLikes}
          setDislikes={setDislikes}
          setFinished={setFinished}
        />
        <LikedRestaurants
          likes={likes}
          swap={swap}
        />
      </div>
      )}
    </>
  );
}

export default EventVoteSwipeCards;