import express, { Request, Response } from 'express';
import EventClass from '../models/Event';
import { createEvent, getEvent, getEvents, updateEvent } from '../services/eventService';

const eventsRouter = express.Router();

interface Params {
  id: string | number
}

type EventRequest = Request<Params, unknown, Partial<EventClass>>;

eventsRouter.get("/", async (req: Request, res: Response) => {

  const result = await getEvents();

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

export default eventsRouter;