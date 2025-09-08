import { Router } from "express";
import { requireAuth } from "../middleware";
import { 
  create, 
  edit, 
  list, 
  share, 
  join, 
  leave, 
  deleteevent, 
  addavailability 
} from "../controllers/eventControllers";

const r = Router();

/**
 * Create a new event
 * 
 * params: 
 *   name (string) - name of event
 *   uid (string) - user creating the event
 *   startdate (string, ISO) - event start date range
 *   enddate (string, ISO) - event end date range
 *   foodrecommendation (UserPlace[]) - list of food preferences
 * return: 
 *   eid (string) - newly created eventId
 */
r.post("/create", requireAuth, create); 

/**
 * Edit event details (should remove all existing data, like participants
 * availability, if the new startdate and enddate are not in range with 
 * the availability of each participant)
 * 
 * params:
 *   eid (string) - eventId
 *   eventName? (string) - optional new name
 *   startdate? (string, ISO) - optional updated start date
 *   enddate? (string, ISO) - optional updated end date
 */
r.put("/edit", edit)

/**
 * List all events for a user
 * 
 * params:
 *   uid (string) - userId
 * return:
 *   EventList[] - list of events the user is part of
 */
r.get("/list", requireAuth, list);

/**
 * Generate a shareable link or code for inviting users
 * 
 * params:
 *   eid (string) - eventId
 * return:
 *   shareUrl (string) 
 */
r.get("/share", share);

/**
 * Join an event (when a participant(non-user) joins an event. should
 * generate a participantId)
 * 
 * params:
 *   eid (string) - eventId
 *   participantName 
 */
r.post("/join", join);

/**
 * Participant leaves an event
 * 
 * params:
 *   eid (string) - eventId
 *   pid (string) - participantId
 */
r.post("/leave", leave);

/**
 * Deletes an event
 * 
 * params:
 *   uid (string) - userId
 *   eid (string) - eventId
 */
r.delete("/deleteevent", deleteevent);

/**
 * Update user availability in an event
 * (for drag-and-drop scheduler like schej)
 * 
 * params:
 *   eid (string) - eventId
 *   uid (string) - userId
 *   newavailability: AvailabilitySlot[] - list of available time ranges
 */
r.put("/availability", addavailability);

export default r;
