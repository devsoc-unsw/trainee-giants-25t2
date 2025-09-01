import axios from "axios";

export const getPlaces = async (lat: string, lon: string) => {
  const response = await axios.get("https://api.geoapify.com/v2/places", {
    params: {
      categories: "catering.restaurant",
      filter: `circle:${lon},${lat},5000`, // 5 km radius
      limit: 50,
      apiKey: process.env.GEOAPIFY_KEY,
    },
  });

  // only return places with an image
  return response.data.features.filter(
    (place: any) => place.properties?.wiki_and_media?.image
  );
};
