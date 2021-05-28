import { LocationSchema, Platform } from '../app/appTypes';

export type User = {
  phone?: string;
  email?: string;
  username?: string;
  location?: LocationSchema;
  isNewUser?: boolean;
  platforms?: Platform[];
};
