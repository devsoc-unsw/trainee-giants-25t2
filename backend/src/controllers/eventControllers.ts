import { Request, Response } from "express";
import { createEvent, editEvent, generateUrl, listEvent } from "../services/eventServices";

export async function create(req: Request, res: Response) {
    try {
        const { name, uid, startdate, enddate, userPlace } = req.body;
        const event = await createEvent(name, uid, startdate, enddate, userPlace);
        res.status(201).json({ eid: event.eventId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create event" });
    }
}

export async function edit(req: Request, res: Response) {
    try {
        const { eid, uid, newName, newStartdate, newEnddate } = req.body; 
        if (!eid) {
            return res.status(400).json({ error: "no event exists" });
        }
        const event = await editEvent(eid, uid, newName, newStartdate, newEnddate);
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
    return;
}

export async function leave(req: Request, res: Response) {
    return;
}

export async function deleteevent(req: Request, res: Response) {
    return;
}

export async function addavailability(req: Request, res: Response) {
    return;
}
