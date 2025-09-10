import { Request, Response } from "express";

import { editUserLikesDislikes, getUserLikesDislikes } from "../services/userServices";

export async function getFood(req: Request, res: Response) {
  try {
    const { uid } = req.query;
    console.log(uid);
    if (!uid || typeof uid !== "string") {
      return res.status(400).json({ error: "uid is required" });
    }
    const events = await getUserLikesDislikes(uid);
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user's food places" });
  }
}

export async function editFood(req: Request, res: Response) {
  try {
    const { userPlace } = req.body;
    console.log(userPlace);
    const user = await editUserLikesDislikes(userPlace);
    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to edit user's food places" });
  }
}