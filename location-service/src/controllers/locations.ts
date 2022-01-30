import express, { Request, Response } from 'express';
import LocationClass from '../models/Location';
import { addSport } from '../services/addService';
import { createLocation, deleteLocation, getLocation, getLocations, updateLocation } from '../services/locationService';

const locationRouter = express.Router();

interface Params {
  id: string | number
}

interface SportInput {
  sportId: string | number
}

type SportRequest = Request<Params, unknown, SportInput>;
type LocationRequest = Request<Params, unknown, Partial<LocationClass>>;

locationRouter.get("/", async (req: Request, res: Response) => {

  const { sport } = req.query;
  const result = await getLocations(sport as string);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

locationRouter.get("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await getLocation(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

locationRouter.post("/", async (req: LocationRequest, res: Response) => {

  const location = req.body;
  const result = await createLocation(location);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(201);

});

locationRouter.put("/:id", async (req: LocationRequest, res: Response) => {

  const id = req.params.id;
  const location = req.body;
  const result = await updateLocation(id, location);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(201);

});

locationRouter.delete("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await deleteLocation(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);

});

locationRouter.post("/:id/sports", async (req: SportRequest, res: Response) => {

  const locationId = req.params.id;
  const sportId = req.body.sportId;

  const result = await addSport(locationId, sportId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

export default locationRouter;