import express from "express";
import { fetchPlaces } from "../controllers/placesControllers";

const router = express.Router();

router.get("/", fetchPlaces);

export default router;