import { Router } from "express";
import { requireAuth } from "../middleware";
import { editFood, getFood } from "../controllers/userController";

const r = Router();

r.get("/food", requireAuth, getFood);
r.put("/food", requireAuth, editFood);

export default r;
