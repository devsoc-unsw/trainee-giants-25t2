import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get("https://api.geoapify.com/v2/places", {
      params: {
        categories: "catering.restaurant",
        // 5 km radius
        filter: `circle:${lon},${lat},5000`,
        limit: 50,
        apiKey: process.env.GEOAPIFY_KEY,
      },
    });
    
    const featuresWithImages = response.data.features.filter(
      (place: any) => place.properties?.wiki_and_media?.image
    );


    res.json({ features: featuresWithImages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

export default router;
