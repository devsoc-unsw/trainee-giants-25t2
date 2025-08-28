import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

const fetchPlaces = async (lat: number, lon: number) => {
  const { data } = await api.get("/places", { params: { lat, lon } });
  return data;
};

export function usePlaces(lat: number, lon: number) {
  return useQuery({
    queryKey: ["places", lat, lon],
    queryFn: () => fetchPlaces(lat, lon),
    // only run if coords exist
    enabled: !!lat && !!lon, 
  });
}
