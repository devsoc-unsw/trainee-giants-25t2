import axios from "axios";
import { Place } from "../types";
import { getDatabase } from "../db";

function placesCol() {
	return getDatabase().collection<Place>("places");
}

export async function ensurePlacesIndex() {
	await placesCol().createIndex({ placeId: 1 }, { unique: true });
	await placesCol().createIndex({ location: "2dsphere" });
}

function buildPlaceDoc(
	basic: any,
	details: any,
	apiKey: string
): Place {
	let photoUrl: string | undefined;
	const photos = details?.photos ?? basic?.photos ?? [];

	if (Array.isArray(photos) && photos.length > 0 && photos[0]?.photo_reference) {
		photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${apiKey}`;
	}

	const lat = details?.geometry?.location?.lat ?? basic?.geometry?.location?.lat;
	const lon = details?.geometry?.location?.lng ?? basic?.geometry?.location?.lng;


	const place: Place = {
		name: details?.name || basic?.name || "N/A",
		rating: details?.rating ?? basic?.rating ?? "N/A",
		address: details?.formatted_address || basic?.vicinity || "N/A",
		photoUrl,
		website: details?.website || "N/A",
		phone: details?.formatted_phone_number || "N/A",
		priceLevel: details?.price_level ?? basic?.price_level ?? "N/A",
		placeId: basic?.place_id,
		googleMapsUrl: `https://maps.google.com/maps?place_id=${basic?.place_id}`,
	};

	if (typeof lat === "number" && typeof lon === "number") {
		place.location = { type: "Point", coordinates: [lon, lat] };
	}

	return place;
}

export const getPlaces = async (
	lat: string | number,
	lon: string | number,
	radius = 2000,
	placeType = "restaurant"
): Promise<Place[]> => {

	const apiKey = process.env.GOOGLE_API_KEY;
	if (!apiKey) {
		throw new Error("Missing Google API key");
	}

	if (typeof lat === "string") lat = parseFloat(lat);
	if (typeof lon === "string") lon = parseFloat(lon);

	if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
		throw new Error("Invalid coordinates")
	}

	const nearbyFromDB = await placesCol().aggregate<Place>([{
		$geoNear: {
			near: { type: "Point", coordinates: [lon, lat] },
			distanceField: "dist",
			maxDistance: radius,
			spherical: true
		},
	},
	{ $sample: { size: 30 } }]).toArray();

	if (nearbyFromDB.length >= 20) {
		return nearbyFromDB;
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

	const basics = placesResponse.data?.results ?? [];
	const seen = new Set(nearbyFromDB.map(p => p.placeId));
	const out: Place[] = [...nearbyFromDB];

	for (const basic of basics) {
		const placeId: string = basic?.place_id;
		if (!placeId || seen.has(placeId)) continue;

		const existing = await placesCol().findOne({ placeId: placeId });
		if (existing) {
			out.push(existing);
			seen.add(placeId);
			continue;
		}

		const detailsResponse = await axios.get(
			"https://maps.googleapis.com/maps/api/place/details/json",
			{
				params: {
					place_id: placeId,
					fields:
						"name,rating,formatted_address,photos,website,formatted_phone_number,opening_hours,price_level",
					key: apiKey,
				},
			}
		);

		const place = buildPlaceDoc(basic, detailsResponse.data?.result ?? {}, apiKey);

		await placesCol().updateOne(
			{ placeId: placeId },
			{ $set: place },
			{ upsert: true }
		);

		out.push(place);

		await new Promise((resolve) => setTimeout(resolve, 100));

		if (out.length >= 30) break;
	}

	return out;
};
