import UserClass, { User } from "../models/User";
import bcrypt from 'bcrypt';
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

    await User.query().insertAndFetch({
      username,
      password: passwordHash,
      id: uuid(),
      email
    });

    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }
  
};

export const updateUser = async (id: string | number, body: Partial<UserClass>) => {

  try {

    const { username, email } = body;

    const existingUser = await User.query()
      .where('username', username)
      .orWhere('email', email);


    if (existingUser.length !== 0) {
      if (existingUser[0].id !== id) {
        console.log("ollaan");
        return false;
      }
    }

    await User.query().patchAndFetchById(id, {
      username: username,
      email: email
    });

    return true;
    
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

    const data = await User.query().findById(id)
      .withGraphFetched('[followedUsers, savedEvents, savedSports, savedLocations]');

    if (!data) {
      return false;
    }
    
    const events = data.savedEvents.map(event => 
      event.eventId
    );

    const locations = data.savedLocations.map(location => 
      location.locationId
    );
    
    const sports = data.savedSports.map(sport => 
      sport.sportId
    );

    return { 
      ...data,
      savedEvents: events,
      savedLocations: locations,
      savedSports: sports
    };
    
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const getUsers = async () => await User.query();