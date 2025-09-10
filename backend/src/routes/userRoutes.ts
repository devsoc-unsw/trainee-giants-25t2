import { Router } from "express";
import { editFood, getFood } from "../controllers/userController";
import { requireAuth } from "../middleware";

const r = Router();

r.get("/food", requireAuth, getFood);
r.put("/food", requireAuth, editFood);

export default r;