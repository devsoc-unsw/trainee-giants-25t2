import api from "../lib/axios"

export type UserPayload = {
    email: string;
    password: string;
};


export async function registerUser(payload: UserPayload) {
    const { data } = await api.post("/auth/register", payload);
    return data.user;
}

export async function loginUser(payload: UserPayload) {
    const { data } = await api.post("/auth/login", payload);
    return data.user;
}