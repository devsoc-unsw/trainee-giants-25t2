import jwt from "jsonwebtoken";


const {
    JWT_ACCESS_SECRET = "dev",
    JWT_REFRESH_SECRET = "dev"
} = process.env;

export function signAccessToken(userId: string) {
    return jwt.sign({ sub: userId }, JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(userId: string) {
    return jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyAccess(token: string) {
    return jwt.verify(token, JWT_ACCESS_SECRET) as { sub: string };
}

export function verifyRefresh(token: string) {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { sub: string };
}

export function setAuthCookies(res: any, access: string, refresh?: string) {
    res.cookie("access_token", access, {
        httpOnly: true,
        isSecure: true,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
        path: "/"
    });

    if (refresh) {
        res.cookie("refresh_token", refresh, {
            httpOnly: true,
            isSecure: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/auth/refresh"
        });
    }
}