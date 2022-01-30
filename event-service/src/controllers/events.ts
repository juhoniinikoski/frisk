import express, { Request, Response } from 'express';
import EventClass from '../models/Event';
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from '../services/eventService';

const eventsRouter = express.Router();

interface Params {
  id: string | number
}

type EventRequest = Request<Params, unknown, Partial<EventClass>>;

eventsRouter.get("/", async (req: Request, res: Response) => {

  const filters = req.query;
  const { location, sport, user } = filters;

  const result = await getEvents(location as string, sport as string, user as string);

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

eventsRouter.post("/", async (req: EventRequest, res: Response) => {

  const event = req.body;
  const result = await createEvent(event);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(201);

});

eventsRouter.put("/:id", async (req: EventRequest, res: Response) => {

  const id = req.params.id;
  const event = req.body;
  const result = await updateEvent(id, event);

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

export default eventsRouter;