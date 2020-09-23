import { gql } from "../../config/deps.ts";

export const LogsType = (gql as any)`
  extend type Query {
    allLogs: [Logs!]!
    getLogs(id: ID!): Logs
    findLogs(filter: String!): [Logs!]!
  }

  type Logs {
    id: ID!
    userID: String
    logType: String
    collection: String
    owner: String
    field: String
    oldValue: String
    newValue: String
    remarks: String
    date: String
  }

  input LogsInput {
    userID: String
    logType: String
    collection: String
    owner: String
    field: String
    oldValue: String
    newValue: String
    remarks: String
    date: String
  }

  extend type Mutation {
    addLogs(input: LogsInput): Logs!
  }
`;
