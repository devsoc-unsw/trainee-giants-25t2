import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

const fetchEvent = async (eid: string) => {
  const { data } = await api.get("/events", { params: { eid } });
  return data;
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
