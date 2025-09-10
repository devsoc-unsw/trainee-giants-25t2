import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

const fetchFood = async (uid: string) => {
  const { data } = await api.get("/user/food", { params: { uid } });
  return data;
};

export function getFood(uid: string) {
  return useQuery({
    queryKey: ["food"],
    queryFn: () => fetchFood(uid),
  });
}
