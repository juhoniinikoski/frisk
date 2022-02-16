import express, { Request, Response } from 'express';
import ActivityClass from '../models/Activity';
import { addLocation, addUser } from '../services/addService';
import { createActivity, deleteActivity, getActivity, getActivities, getActivityTest, updateActivity } from '../services/activityService';

const activitiesRouter = express.Router();

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
type ActivityRequest = Request<Params, unknown, Partial<ActivityClass>>;

activitiesRouter.get("/", async (req: Request, res: Response) => {

  const { location, savedBy } = req.query;
  const result = await getActivities(location as string, savedBy as string);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

activitiesRouter.get("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await getActivity(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

activitiesRouter.get("/:id/test", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await getActivityTest(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

activitiesRouter.post("/", async (req: ActivityRequest, res: Response) => {

  const activity = req.body;
  const result = await createActivity(activity);

  if (!result) {
    return res.sendStatus(404);
  }

  res.status(201);
  return res.send(result)
});

activitiesRouter.put("/:id", async (req: ActivityRequest, res: Response) => {

  const id = req.params.id;
  const activity = req.body;
  const result = await updateActivity(id, activity);

  if (!result) {
    return res.sendStatus(404);
  }

  res.status(201);
  return res.send(id)
});

activitiesRouter.delete("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;
  const result = await deleteActivity(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);

});

activitiesRouter.post("/:id/locations", async (req: LocationRequest, res: Response) => {

  const activityId = req.params.id;
  const locationId = req.body.locationId;

  const result = await addLocation(locationId, activityId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

activitiesRouter.post("/:id/users", async (req: UserRequest, res: Response) => {

  const activityId = req.params.id;
  const userId = req.body.userId;

  const result = await addUser(userId, activityId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

export default activitiesRouter;