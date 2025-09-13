interface DislikedRestaurantsProps {
  dislikes: string[];
  swap: (restaurant: string, to: string) => void;
}

export function DislikedRestaurants({ dislikes, swap }: DislikedRestaurantsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border p-6 sticky top-8 w-[300px] h-[300px] max-h-[300px] flex flex-col">
      <div className="flex flex-row justify-evenly items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          Disliked Restaurants 
        </h3>
        <div className="rounded-full w-[40px] text-black bg-gray-300 text-center">
          {dislikes.length}
        </div>
      </div>
      {dislikes.length === 0 ? (
        <p className="text-gray-500">No restaurants selected yet</p>
      ) : (
        <ul className="space-y-2 overflow-y-auto pr-2">
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
