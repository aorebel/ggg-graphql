import { gql } from "../../config/deps.ts";

export const EmployeeType = (gql as any)`
  extend type Query {
    allEmployees: [Employee!]!
    getEmp(userID: String!): Employee
    getEmpWithContact(id: ID!, contactID: String!): [Employee!]!
    findEmployees(filter: String!): [Employee!]!
  }

  type Employee {
    id: ID! 
    userID: String!
    firstname: String
    middlename: String
    lastname: String
    gender: String
    birthdate: String
    civil_status: String
    contact: [Contact!]
    profileImage: [Image!]
  }

  input EmployeeInput {
    userID: String!
    firstname: String
    middlename: String
    lastname: String    
    gender: String
    birthdate: String
    civil_status: String
  }
  
  input EmployeeEdit {
    firstname: String
    middlename: String
    lastname: String
    gender: String
    birthdate: String
    civil_status: String
  }
  

  extend type Mutation {
    addEmployee(input: EmployeeInput): Employee!
    updateEmployee(id: String, input: EmployeeEdit): Employee
  }
`;
