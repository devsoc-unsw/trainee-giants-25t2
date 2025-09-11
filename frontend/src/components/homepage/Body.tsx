import { SwipeCards } from "./SwipeCards";
import { useState } from "react";
import { usePlaces } from "../../hooks/usePlaces";
import { useUser } from "../../hooks/useAuth";
import { LoadingSpinner } from "./Loading";
import { SelectedRestaurants } from "./RestaurantList";
import { motion } from "framer-motion";
import { LoginRequiredModal } from "./LoginRequiredModal";


export function WhiteBody() {
  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);

  const { data: user } = useUser();
  
  const lat = -33.8688;
  const lon = 151.2093;

  const { data: places, isLoading } = usePlaces(lat, lon);
  return (
    <div className="bg-white w-full flex flex-grow relative">
      <div className="flex flex-col items-center w-full mt-[35px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 transition-transform duration-300">
            Discover Amazing Restaurants
          </h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ x: [ -40, 0 ], opacity: [ 1, 1, 0 ] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="text-gray-600 font-medium"
          >
            Swipe right to add to your list, left to pass
          </motion.p>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
        <div className="flex flex-row gap-10">
          <SwipeCards
            places={places} // pass data down
            likes={likes}
            setLikes={setLikes}
            setDislikes={setDislikes}
          />
          <SelectedRestaurants
            likes={likes}
          />
        </div>
        )}
      </div>
      <LoginRequiredModal
        buttonText="Continue"
        buttonClassName="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#E98657] text-white text-center font-bold rounded-md w-[200px] cursor-pointer hover:bg-orange-500"
        user={user}
        likes={likes}
        dislikes={dislikes}
      />
    </div>
  );
}
