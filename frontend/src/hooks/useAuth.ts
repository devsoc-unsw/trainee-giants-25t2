import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios"

export type UserPayload = {
    email: string;
    password: string;
};


async function fetchUser() {
    const { data } = await api.get("/auth/whoami");
    return data.user as { userId: string; email: string; name: string };
}

export function useUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        retry: false,
    });
}


export async function registerUser(payload: UserPayload) {
    const { data } = await api.post("/auth/register", payload);
    return data.user;
}

export async function loginUser(payload: UserPayload) {
    const { data } = await api.post("/auth/login", payload);
    return data.user;
}

export async function logoutUser() {
    await api.post("/auth/logout");
}

export function useLogout() {
    const qc = useQueryClient();
    return async () => {
        await logoutUser();
        qc.setQueryData(["user"], null);
        qc.invalidateQueries({ queryKey: ["user"] });
    }
}