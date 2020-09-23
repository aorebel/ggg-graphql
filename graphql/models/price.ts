import { gql } from "../../config/deps.ts";

export const PriceType = (gql as any)`
  extend type Query {
    allPrices: [Price!]!
    getPrice(id: ID!): Price
    findPrices(filter: String!): [Price!]!
  }

  type Price {
    id: ID!
    productID: String
    stockID: String
    barcode: Int
    QR: String
    unitPrice: Float
  }

  input PriceInput {
    productID: String
    stockID: String
    barcode: Int
    QR: String
    unitPrice: Float
  }
  
  input PriceEdit {
    unitPrice: Float
  }

  extend type Mutation {
    addPrice(input: PriceInput): Price!
    updatePrice(id: String, input: PriceEdit): Price
  }
`;
