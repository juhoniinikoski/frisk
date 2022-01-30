import express, { Request, Response } from 'express';
import SportClass from '../models/Sport';
import { addLocation } from '../services/addService';
import { createSport, deleteSport, getSport, getSports, updateSport } from '../services/sportService';

const sportsRouter = express.Router();

interface Params {
  id: string | number
}

interface LocationInput {
  locationId: string | number
}

type LocationRequest = Request<Params, unknown, LocationInput>;
type SportRequest = Request<Params, unknown, Partial<SportClass>>;

sportsRouter.get("/", async (req: Request, res: Response) => {

  const { location } = req.query;
  const result = await getSports(location as string);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

sportsRouter.get("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await getSport(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

sportsRouter.post("/", async (req: SportRequest, res: Response) => {

  const sport = req.body;
  const result = await createSport(sport);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(201);

});

sportsRouter.put("/:id", async (req: SportRequest, res: Response) => {

  const id = req.params.id;
  const sport = req.body;
  const result = await updateSport(id, sport);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(201);

});

sportsRouter.delete("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await deleteSport(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);

});

sportsRouter.post("/:id/locations", async (req: LocationRequest, res: Response) => {

  const sportId = req.params.id;
  const locationId = req.body.locationId;

  const result = await addLocation(locationId, sportId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

export default sportsRouter;