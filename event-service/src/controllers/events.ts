import express, { Request, Response } from 'express';
import EventClass from '../models/Event';
import { addUser } from '../services/addService';
import { createEvent, deleteEvent, getEvent, getEvents, getEventTest, updateEvent, updateEventsCreator, updateEventsLocation, updateEventsActivity } from '../services/eventService';

const eventsRouter = express.Router();

interface Params {
  id: string | number
}

interface UserInput {
  userId: string | number
}

type UserRequest = Request<Params, unknown, UserInput>;
type EventRequest = Request<Params, unknown, Partial<EventClass>>;

eventsRouter.get("/", async (req: Request, res: Response) => {

  const filters = req.query;
  const { location, activity, user, savedBy, orderBy } = filters;

  const result = await getEvents(
    location as string,
    activity as string,
    user as string,
    savedBy as string,
    orderBy as string
  );

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

eventsRouter.get("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await getEvent(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

eventsRouter.get("/:id/test", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await getEventTest(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

eventsRouter.post("/", async (req: EventRequest, res: Response) => {

  const event = req.body;
  const result = await createEvent(event);

  if (!result) {
    return res.sendStatus(404);
  }

  res.status(201);
  return res.send(result);

});

eventsRouter.put("/:id", async (req: EventRequest, res: Response) => {

  const id = req.params.id;
  const event = req.body;
  const result = await updateEvent(id, event);

  if (!result) {
    return res.sendStatus(404);
  }

  res.status(201);
  return res.send(id);

});

eventsRouter.put("/", async (req: EventRequest, res: Response) => {

  const filters = req.query;
  const { location, activity, user } = filters;
  
  let result = null;
  const event = req.body;
  
  if (location) {
    result = await updateEventsLocation(location as string, event);
  } else if (activity) {
    result = await updateEventsActivity(activity as string, event);
  } else {
    result = await updateEventsCreator(user as string, event);
  }

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(201);

});

eventsRouter.delete("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;

  const result = await deleteEvent(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);

});

eventsRouter.post("/:id/users", async (req: UserRequest, res: Response) => {

  const eventId = req.params.id;
  const userId = req.body.userId;

  const result = await addUser(userId, eventId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

export default eventsRouter;