import { gql } from "../../config/deps.ts";

export const ProductType = (gql as any)`
  extend type Query {
    allProducts: [Product!]!
    getProduct(id: ID!): Product
    findProducts(filter: String!): [Product!]!
    getNestedContent(id: ID!, filter: String!): [Product!]!
  }

  type Product {
    id: ID!
    category: String! 
    item: String!
    brand: String! 
    name: String!
    model: String
    serial: String
    color: String
    size: String
    volume: String
    material: String
    weight: String
    desc: String
    status: String
    inventory: [Inventory!]
    images: [Image!]
  }

  input ProductInput {
    category: String! 
    item: String!
    brand: String! 
    name: String!
    model: String
    serial: String
    color: String
    volume: String
    size: String
    material: String
    weight: String
    desc: String
    status: String
  }
  
  input ProductEdit {
    category: String 
    item: String
    brand: String 
    volume: String
    name: String
    color: String
    size: String
    material: String
    weight: String
    descs: String
    status: String
  }

  extend type Mutation {
    addProduct(input: ProductInput): Product!
    updateProduct(id: String, input: ProductEdit): Product
  }
`;
