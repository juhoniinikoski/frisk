import express, { Request, Response } from 'express';
import { followUser, saveEvent, saveLocation, saveSport } from '../services/followService';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../services/userService';

interface UserInput {
  id?: string | number
  username: string
  password?: string
  email: string
}

interface FollowInput {
  followingId: string | number
}

interface EventInput {
  eventId: string | number
}

interface LocationInput {
  locationId: string | number
}

interface SportInput {
  sportId: string | number
}

interface UserInput {
  userId: string | number
}

interface Params {
  id: string | number
}

type UserRequest = Request<Params, unknown, UserInput>;
type EventRequest = Request<Params, unknown, EventInput>;
type LocationRequest = Request<Params, unknown, LocationInput>;
type SportRequest = Request<Params, unknown, SportInput>;
type FollowRequest = Request<Params, unknown, FollowInput>;

const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {

  const result = await getUsers();
  return res.json(result);

});

usersRouter.post("/", async (req: UserRequest, res: Response) => {

  const user = req.body;
  const result = await createUser(user);

  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

usersRouter.get("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;

  const result = await getUser(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.json(result);

});

usersRouter.put("/:id", async (req: UserRequest, res: Response) => {

  const id = req.params.id;
  const body = req.body;

  const result = await updateUser(id, body);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(201);

});

usersRouter.delete("/:id", async (req: Request, res: Response) => {

  const id = req.params.id;

  const result = await deleteUser(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);

});

usersRouter.post("/:id/events", async (req: EventRequest, res: Response) => {

  const userId = req.params.id;
  const eventId = req.body.eventId;

  const result = await saveEvent(userId, eventId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

usersRouter.post("/:id/locations", async (req: LocationRequest, res: Response) => {

  const userId = req.params.id;
  const locationId = req.body.locationId;

  const result = await saveLocation(userId, locationId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

usersRouter.post("/:id/sports", async (req: SportRequest, res: Response) => {

  const userId = req.params.id;
  const sportId = req.body.sportId;

  const result = await saveSport(userId, sportId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});

usersRouter.post("/:id/follow", async (req: FollowRequest, res: Response) => {

  const userId = req.params.id;
  const followedId = req.body.followingId;

  const result = await followUser(userId, followedId);
  if (!result) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);

});



export default usersRouter;