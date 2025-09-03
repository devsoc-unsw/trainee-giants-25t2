import { z } from "zod";
import type { Request, Response } from "express";
import { createUser, findUserByEmail, verifyPassword } from "../services/userServices";
import { setAuthCookies, signAccessToken, signRefreshToken, verifyAccess, verifyRefresh } from "../services/tokenService";

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export async function register(req: Request, res: Response) {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid Input" });

    const { email, password } = parsed.data;
    const name = email.split("@")[0];

    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: "Email already in use" });

    const user = await createUser(email, name, password);

    const access = signAccessToken(user.userId);
    const refresh = signRefreshToken(user.userId);
    setAuthCookies(res, access, refresh);

    res.json({ user: { userId: user.userId, email: user.email, name: user.name } });
}


export async function login(req: Request, res: Response) {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid Input" });

    const { email, password } = parsed.data;

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid Credentials" });

    const allowed = await verifyPassword(user, password);
    if (!allowed) return res.status(401).json({ error: "Invalid Credentials" });

    const access = signAccessToken(user.userId);
    const refresh = signRefreshToken(user.userId);
    setAuthCookies(res, access, refresh);

    res.json({ user: { userId: user.userId, email: user.email, name: user.name } });
}

export async function whoAmI(req: Request, res: Response) {
    const token = req.cookies?.access_token;
    if (!token) return res.status(401).json({ error: "Unauthenticated" });

    try {
        const payload = verifyAccess(token);
        res.json({ user: { userId: payload.sub } });
    } catch {
        return res.status(401).json({ error: "Unauthenticated" });
    }
}

export async function refresh(req: Request, res: Response) {
    const token = req.cookies?.refresh_token;
    if (!token) return res.status(401).json({ error: "No Refresh Token" });

    try {
        const payload = verifyRefresh(token);
        const access = signAccessToken(payload.sub);
        setAuthCookies(res, access);
        res.json({ ok: true });
    } catch {
        return res.status(401).json({ error: "Invalid Refresh Token" });
    }
}

export async function logout(_req: Request, res: Response) {
    res.clearCookie("access_token", { path: "/" });
    res.clearCookie("refresh_token", { path: "/api/auth/refresh" });
    return res.status(204).end();
}