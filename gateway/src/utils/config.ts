import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const PORT = process.env.PORT || 6000;

export const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

export const ACCESS_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;

export const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || "http://localhost:9010/events";
export const LOCATION_SERVICE_URL = process.env.LOCATION_SERVICE_URL || "http://localhost:9020/locations";
export const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:9030/users";
export const ACTIVITY_SERVICE_URL = process.env.ACTIVITY_SERVICE_URL || "http://localhost:9040/activities";