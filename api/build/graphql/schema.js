"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `

  type Query {
    statistics: String
  }
`;
exports.resolvers = {
    Query: {
        statistics: () => {
            console.log("testi");
        },
    }
};
