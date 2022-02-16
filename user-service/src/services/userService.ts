import UserClass, { User } from "../models/User";
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const createPasswordHash = (password: string) => bcrypt.hash(password, 10);

export const createUser = async (body: Partial<UserClass>) => {

  try {

    const { username, email, password } = body;
  
    const existingUser = await User.query()
      .where('username', username)
      .orWhere('email', email);

    if (existingUser.length !== 0) {
      return false;
    }

    const passwordHash = await createPasswordHash(password);
    const id = uuid();

    await User.query().insertAndFetch({
      username,
      password: passwordHash,
      id: id,
      email
    });

    return id;
    
  } catch (error) {
    console.log(error);
    return false;
  }
  
};

export const updateUser = async (id: string | number, body: Partial<UserClass>) => {

  try {

    const { username, email } = body;

    let existingUser: UserClass[] = [];

    if (username && email) {
      existingUser = await User.query()
      .where('username', username)
      .orWhere('email', email);
    } else if (username) {
      existingUser = await User.query()
      .where('username', username);
    } else if (email) {
      existingUser = await User.query()
      .where('email', email)
    }


    if (existingUser.length !== 0) {
      if (existingUser[0].id !== id) {
        return false;
      }
    }

    await User.query().patchAndFetchById(id, body);

    return id;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const deleteUser = async (id: string | number) => {

  try {

    const res = await User.query().findById(id).delete();
    if (res === 0) {
      return false;
    }
    return true;

  } catch (error) {
    console.log(error);
    return false;
  }

};

export const getUser = async (id: string | number) => {

  try {

    let data = await User.query().findById(id)
      .withGraphFetched('[followedUsers, savedEvents, savedActivities, savedLocations]');
    
    if (!data) {
      data = await User.query().findOne({ username: id })
        .withGraphFetched('[followedUsers, savedEvents, savedActivities, savedLocations]');
    }

    if (!data) {
      return false;
    }
    
    const events = data.savedEvents.map(event => 
      event.eventId
    );

    const locations = data.savedLocations.map(location => 
      location.locationId
    );
    
    const activities = data.savedActivities.map(activity => 
      activity.activityId
    );

    return { 
      ...data,
      savedEvents: events,
      savedLocations: locations,
      savedActivities: activities
    };
    
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const getUsers = async () => await User.query();