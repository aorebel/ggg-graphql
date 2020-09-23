import { gql } from "../../config/deps.ts";

export const ContactType = (gql as any)`
  extend type Query {
    allContacts: Contact
    getContactById(id:ID!): [Contact!]!
    getAllContactByCollection(collection: String!): [Contact!]!
    getContact(owner: String!, collection: String!): Contact

    allAddress: Address
    getAddressById(id:ID!): [Address!]!
    getAddress(contactID: String!): Address

    allEmails: Email
    getEmailById(id:ID!): [Email!]!
    getEmail(contactID: String!): Email

    allPhones: Phone
    getPhoneByID(id: ID): [Phone!]!
    getPhone(contactID: String!): Phone
  }

  type Contact {
    id: ID
    collection: String
    owner: String
    desc: String
    email: [Email!]
    phone: [Phone!]
    address: [Address!]
  }
  
  type Address {
    id: ID
    contactID: String
    desc: String
    type: String
    status: String 
    bldgNo: Int
    street: String
    brgy: String
    city: String
    province: String
    region: String
    country: String
    zip: Int
    lat: Float
    long: Float
  }

  type Phone {
    id: ID
    contactID: String
    desc: String
    type: String
    status: String 
    number: String
  }

  type Email {
    id: ID!
    contactID: String
    desc: String
    type: String
    status: String 
    email: String
  }

  input ContactInput {
    collection: String!
    owner: String!
    desc: String
  }

  input AddressInput {
    contactID: String!
    desc: String
    type: String!
    status: String! 
    bldgNo: Int
    street: String
    brgy: String!
    city: String!
    province: String!
    region: String!
    country: String
    zip: Int!
    lat: Float
    long: Float
  }

  input EmailInput {
    contactID: String!
    desc: String
    type: String!
    status: String! 
    email: String!
  }

  input PhoneInput {
    contactID: String!
    desc: String
    type: String!
    status: String! 
    number: String!
  }

  input AddressEdit {
    desc: String
    status: String 
  }

  input EmailEdit {
    desc: String
    status: String 
  }

  input PhoneEdit {
    desc: String
    status: String 
  }

  extend type Mutation {
    addContact(input: ContactInput): Contact!
    addAddress(input: AddressInput): Address!
    addEmail(input: EmailInput): Email!
    addPhone(input:PhoneInput): Phone!

    updateAddress(id: String, input: AddressEdit): Address
    updateEmail(id: String, input: EmailEdit): Email
    updatePhone(id: String, input: PhoneEdit): Phone

  }
`;
