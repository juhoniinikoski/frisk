import express, { Request, Response } from 'express';
import LocationClass from '../models/Location';
import { addActivity, addUser } from '../services/addService';
import { createLocation, deleteLocation, getLocation, getLocations, getLocationTest, updateLocation } from '../services/locationService';

const locationRouter = express.Router();

interface Params {
  id: string | number
}

interface ActivityInput {
  activityId: string | number
}

interface UserInput {
  userId: string | number
}

type UserRequest = Request<Params, unknown, UserInput>;
type ActivityRequest = Request<Params, unknown, ActivityInput>;
type LocationRequest = Request<Params, unknown, Partial<LocationClass>>;

locationRouter.get("/", async (req: Request, res: Response) => {

  const { activity, savedBy } = req.query;
  const result = await getLocations(activity as string, savedBy as string);

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

locationRouter.get("/:id/test", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await getLocationTest(id);

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

  res.status(201);
  return res.send(result);

});

locationRouter.put("/:id", async (req: LocationRequest, res: Response) => {

  const id = req.params.id;
  const location = req.body;
  const result = await updateLocation(id, location);

  if (!result) {
    return res.sendStatus(404);
  }

  res.status(201)
  return res.send(id);

});

locationRouter.delete("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await deleteLocation(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);

});

locationRouter.post("/:id/activities", async (req: ActivityRequest, res: Response) => {

  const locationId = req.params.id;
  const activityId = req.body.activityId;

  const result = await addActivity(locationId, activityId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

locationRouter.post("/:id/users", async (req: UserRequest, res: Response) => {

  const locationId = req.params.id;
  const userId = req.body.userId;

  const result = await addUser(locationId, userId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

export default locationRouter;