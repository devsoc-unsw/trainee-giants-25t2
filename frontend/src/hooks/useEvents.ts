import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import type { UserPlace } from "../types/user.types";

interface EventEditFoodPayload {
  eid: string;
  user: UserPlace;
}

interface EventEditUserAvailabilityPayload {
  eid: string;
  uid: string;
  slots: { date: string; times: string[] }[];
}

const fetchEvent = async (eid: string) => {
  const { data } = await api.get("/events", { params: { eid } });
  return data.event;
};

const fetchEvents = async (uid: string) => {
  const { data } = await api.get("/events/list", { params: { uid } });
  return data;
};

export function getEvent(eid: string) {
  return useQuery({
    queryKey: ["event"],
    queryFn: () => fetchEvent(eid),
  });
}

export function getEvents(uid: string) {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEvents(uid),
  });
}

export async function editEventFood(payload: EventEditFoodPayload) {
  const { data } = await api.put("/events/food", payload);
  return data.event;
}

export async function editEventUserAvailability(payload: EventEditUserAvailabilityPayload) {
  const { data } = await api.put("/events/availability", payload);
  return data.event;
}