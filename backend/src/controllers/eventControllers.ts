import { Request, Response } from "express";
import { createEvent, findEventByEventId, listEvent } from "../services/eventServices";

export async function create(req: Request, res: Response) {
    try {
        const { name, dates, startTime, endTime, user } = req.body;
        const event = await createEvent(name, dates, startTime, endTime, user);
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
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch event" });
    }
}

export async function edit(req: Request, res: Response) {
    return;
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
    return;
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
