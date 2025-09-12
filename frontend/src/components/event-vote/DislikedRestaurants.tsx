interface DislikedRestaurantsProps {
  dislikes: string[];
  swap: (restaurant: string, to: string) => void;
}

export function DislikedRestaurants({ dislikes, swap }: DislikedRestaurantsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border p-6 sticky top-8 w-[300px]">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        Disliked Restaurants
      </h3>
      {dislikes.length === 0 ? (
        <p className="text-gray-500">No restaurants selected yet</p>
      ) : (
        <ul className="space-y-2">
          {dislikes.map((dislike, i) => (
            <li
              key={i}
              className="bg-gray-100 px-3 py-2 rounded-md text-gray-800 cursor-pointer"
              onClick={() => swap(dislike, "like")}
            >
              {dislike}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
