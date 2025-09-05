interface SelectedRestaurantsProps {
  likes: string[];
}

export function SelectedRestaurants({ likes }: SelectedRestaurantsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border p-6 sticky top-8 w-[400px]">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        Selected Restaurants
      </h3>
      {likes.length === 0 ? (
        <p className="text-gray-500">No restaurants selected yet</p>
      ) : (
        <ul className="space-y-2">
          {likes.map((like, i) => (
            <li
              key={i}
              className="bg-gray-100 px-3 py-2 rounded-md text-gray-800"
            >
              {like}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
