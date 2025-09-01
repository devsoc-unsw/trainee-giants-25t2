import { Request, Response } from "express";
import { getPlaces } from "../services/placesServices";

export const fetchPlaces = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  try {
    if (!lat || !lon) {
      return res.status(400).json({ error: "lat and lon are required" });
    }

    const places = await getPlaces(lat as string, lon as string);
    res.json({ features: places });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch places" });
  }
};
