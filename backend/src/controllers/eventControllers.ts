import { Request, Response } from "express";
import { addUserAvailability, createEvent, deleteEvent, editEvent, editFoodPlaces, findEventByEventId, generateUrl, getResults, listEvent } from "../services/eventServices";

export async function create(req: Request, res: Response) {
    try {
        const { name, dates, startTime, endTime, owner } = req.body;
        const event = await createEvent(name, dates, startTime, endTime, owner);
        res.status(201).json({ eid: event.eventId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create event" });
    }
}

export async function event(req: Request, res: Response) {
    try {
        const { eid } = req.query;
        if (!eid || typeof eid !== "string") {
            return res.status(400).json({ error: "eid is required" });
        }
        const event = await findEventByEventId(eid);
        res.json({ event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch event" });
    }
}

export async function edit(req: Request, res: Response) {
    try {
        const { eid, uid, newName, newDates, newStartdate, newEnddate } = req.body;
        if (!eid) {
            return res.status(400).json({ error: "no event exists" });
        }
        const event = await editEvent(eid, uid, newName, newDates, newStartdate, newEnddate);
        res.json({ event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get URL" });
    }
}

export async function editFood(req: Request, res: Response) {
    try {
        const { eid, user } = req.body;
        if (!eid) {
            return res.status(400).json({ error: "no event exists" });
        }
        const event = await editFoodPlaces(eid, user);
        res.json({ event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get URL" });
    }
}

export async function list(req: Request, res: Response) {
    try {
        const { uid } = req.query;
        if (!uid || typeof uid !== "string") {
            return res.status(400).json({ error: "uid is required" });
        }
        const events = await listEvent(uid);
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch events" });
    }
}

export async function share(req: Request, res: Response) {
    try {
        const { eid } = req.body;
        if (!eid) {
            return res.status(400).json({ error: "no event exists" });
        }
        const shareurl = await generateUrl(eid);
        res.json({ shareurl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get URL" });
    }
}

export async function join(req: Request, res: Response) {
    // leave join for later
    return;
}

export async function leave(req: Request, res: Response) {
    // also leave this for later
    return;
}

export async function deleteevent(req: Request, res: Response) {
    try {
        const { eid, uid } = req.body;
        if (!eid) {
            return res.status(400).json({ error: "no event exists" });
        }
        const msg = await deleteEvent(eid, uid);
        res.json({ msg });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Faied to delete" });
    }
}

export async function addavailability(req: Request, res: Response) {
    try {
        const { eid, uid, slots } = req.body;
        if (!eid) {
            return res.status(400).json({ error: "no event exists" });
        }
        const avai = await addUserAvailability(eid, uid, slots);
        res.json({ avai });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Faied to delete" });
    }
}


export async function results(req: Request, res: Response) {
    try {
        const { eid } = req.query;
        if (!eid || typeof eid !== "string") {
            return res.status(400).json({ error: "no event exists" });
        }
        const data = await getResults(eid);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Faied to compute results" });
    }
}