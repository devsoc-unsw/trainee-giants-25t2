import axios from "axios";
import { Place } from "../types";

export const getPlaces = async (
  lat: string,
  lon: string,
  radius = 5000,
  placeType = "restaurant"
): Promise<Place[]> => {
  
	const apiKey = process.env.GOOGLE_API_KEY;
	if (!apiKey) {
		throw new Error("");
	}
	const placesResponse = await axios.get(
		"https://maps.googleapis.com/maps/api/place/nearbysearch/json",
    	{
		params: {
			location: `${lat},${lon}`,
			radius,
			type: placeType,
			key: apiKey,
		},
    	}
  	);

  	const places = placesResponse.data.results;

	const detailedPlaces: Place[] = [];
	for (const place of places) {
		const detailsResponse = await axios.get(
		"https://maps.googleapis.com/maps/api/place/details/json",
		{
			params: {
			place_id: place.place_id,
			fields:
				"name,rating,formatted_address,photos,website,formatted_phone_number,opening_hours,price_level",
			key: apiKey,
			},
		}
	);

    const details = detailsResponse.data.result || {};

    let photoUrl: string | undefined;
    if (details.photos?.length) {
      	const photoReference = details.photos[0].photo_reference;
      	photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
    }

    detailedPlaces.push({
		name: details.name || place.name || "N/A",
		rating: details.rating ?? place.rating ?? "N/A",
		address: details.formatted_address || place.vicinity || "N/A",
		photoUrl,
		website: details.website || "N/A",
		phone: details.formatted_phone_number || "N/A",
		priceLevel: details.price_level ?? "N/A",
		placeId: place.place_id,
		googleMapsUrl: `https://maps.google.com/maps?place_id=${place.place_id}`,
    });

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return detailedPlaces;
};
