import { Router } from "express";
import { login, logout, refresh, register, whoAmI } from "../controllers/authController";

const r = Router();

r.post("/register", register);
r.post("/login", login);
r.get("/whoami", whoAmI);
r.post("/refresh", refresh);
r.post("/logout", logout);

export default r;