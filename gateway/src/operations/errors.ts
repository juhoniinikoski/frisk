import { ApolloError } from "apollo-server";

export class InvalidIdError extends ApolloError {
  constructor(field: string) {
    super(`${field} with given id doesn't exist.`, 'INCORRECT_ID', { field: field });
  }
};