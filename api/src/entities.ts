import AuthService from "./services/authentication/authService";

export interface Event {
  id: string | number
  eventTitle: string
  description: string
  locationId: string
  sport: Sport
  attendants: User[]
  free: boolean
  price: number
  createdBy: User
  createdAt: Date
  start: Date
  end: Date
  repetition: string
}

export interface Location {
  id: string | number
  name: string
  description: string
  events: Event[]
  sports: Sport[]
  address: Address
}

export interface Sport {
  id: string | number
  name: string
  locations: Location[]
  events: Event[]
}

export interface User {
  id: string | number
  username: string
  password: string
  email: string
  createdAt: Date
  upcoming: Event[]
  followedUsers: User[]
  savedEvents: Event[]
  savedSports: Sport[]
  savedLocations: Location[]
}

export interface Address {
  id: string | number
  street: string
  zipcode: string
  city: string
}

export interface Context {
  authService: AuthService
}