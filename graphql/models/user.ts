import { gql } from "../../config/deps.ts";

export const UserType = (gql as any)`
  extend type Query {
    userFoo: String!
    allUsers: [User!]!
    getUserInfo(id: ID!): User
    getUser(id: ID!): User
    findUsers(filter: String!): [User!]!
  }

  type User {
    id: ID! 
    username: String 
    password: String
    role: String
    token: String
    status: String
    dateCreated: String
    profile: [Employee!]
    contact: Contact
    transaction: [Transaction!]
  }

  input UserInput {
    username: String!
    password: String!
    role: String!
    status: String    
    dateCreated: String
  }
  
  input UserEdit {
    username: String
    password: String
    role: String
    token: String
    status: String
  }
  input FilterUser{
    username: String
    role: String
    status: String
  }

  

  extend type Mutation {
    addUser(input: UserInput): User!
    updateUser(id: String, input: UserEdit): User
  }
`;
