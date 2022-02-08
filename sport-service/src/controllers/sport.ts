import express, { Request, Response } from 'express';
import SportClass from '../models/Sport';
import { addLocation, addUser } from '../services/addService';
import { createSport, deleteSport, getSport, getSports, getSportTest, updateSport } from '../services/sportService';

const sportsRouter = express.Router();

interface Params {
  id: string | number
}

interface LocationInput {
  locationId: string | number
}

interface UserInput {
  userId: string | number
}

type LocationRequest = Request<Params, unknown, LocationInput>;
type UserRequest = Request<Params, unknown, UserInput>;
type SportRequest = Request<Params, unknown, Partial<SportClass>>;

sportsRouter.get("/", async (req: Request, res: Response) => {

  const { location, savedBy } = req.query;
  const result = await getSports(location as string, savedBy as string);

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

sportsRouter.get("/:id/test", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await getSportTest(id);

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

  res.status(201);
  return res.send(result)
});

sportsRouter.put("/:id", async (req: SportRequest, res: Response) => {

  const id = req.params.id;
  const sport = req.body;
  const result = await updateSport(id, sport);

  if (!result) {
    return res.sendStatus(404);
  }

  res.status(201);
  return res.send(id)
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

sportsRouter.post("/:id/users", async (req: UserRequest, res: Response) => {

  const sportId = req.params.id;
  const userId = req.body.userId;

  const result = await addUser(userId, sportId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

export default sportsRouter;