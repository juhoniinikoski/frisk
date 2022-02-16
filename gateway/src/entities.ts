import AuthService from "./services/authentication/authService";

export interface Event {
  id: string | number
  eventTitle: string
  description: string
  locationId: string | number
  location: Location
  locationName: string
  activity: Activity
  activityName: string
  activityId: string | number
  attendants: User[]
  free: boolean
  price: number
  createdBy: User
  createdByName: string
  createdById: string | number
  createdAt: Date
  start: Date | number
  end: Date | number
  repetition: string,
  latitude: number,
  longitude: number
}

export interface Location {
  id: string | number
  name: string
  description: string
  createdById: string | number
  events: Event[]
  activities: Activity[]
  city: string
  zipcode: string
  country: string
  street: string
  address: Address,
  latitude: number,
  longitude: number
}

export interface Activity {
  id: string | number
  name: string
  createdById: string | number
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
  savedActivities: Activity[]
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