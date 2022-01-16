import EventClass from "../models/Event";
import UserClass from "../models/User";
import AuthService from "../services/authentication/authService";


export interface UserType extends UserClass {
  id?: string | number
  username?: string
  password?: string
}

export interface EventType extends EventClass {
  userId?: string | number
}

export interface Context {
  authService: AuthService
}