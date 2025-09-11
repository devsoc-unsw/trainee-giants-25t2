import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import type { UserPlace } from "../types/user.types";

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

export async function editUserFood(userPlace: UserPlace) {
  const { data } = await api.put("/user/food", { userPlace });
  return data;
}