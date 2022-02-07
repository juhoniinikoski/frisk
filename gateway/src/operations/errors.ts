import { ApolloError } from "apollo-server";

export class InvalidIdError extends ApolloError {
  constructor(field: string) {
    super(`${field} with given id doesn't exist.`, 'INCORRECT_ID', { field: field });
  }
}

export class DefectiveDataError extends ApolloError {
  constructor(fnc: string) {
    super("Input data is missing some required properties.", 'DEFECTIVE_DATA', { function: fnc });
  }
}