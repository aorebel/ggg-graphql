import { gql } from "../../config/deps.ts";

export const TransactionType = (gql as any)`
  extend type Query {
    allTransactions: [Transaction!]!
    getTransaction(id: ID!): Transaction
    getUserTransactions(userID: String!): [Transaction!]!
    getProductTransactions(productID: String!): [Transaction!]!
    findTransactions(filter: String!): [Transaction!]!

    allCarts: [Cart!]!
    getCart(id: ID!): Cart
    getCartTransaction(transID: String!): [Cart!]!
  }

  type Transaction {
    id: ID!
    code: String!
    userID: String!
    type: String!
    date: String
    totalPrice: Float
    remarks: String
    cart: [Cart!]
    userInfo: [User!]
  }

  input TransactionInput {
    code: String!    
    userID: String!
    type: String!
    transDate: String
    totalPrice: Float
    remarks: String
  }

  input TransactionEdit {
    totalPrice: Float
    remarks: String
  }
  
  type Cart {
    id: ID!
    transID: String!
    productID: String!
    sku: String!
    productName: String!
    stockDesc: String!
    priceID: String!
    quantity: Int!
    unit: String!
    unitPrice: Float!
    totalPrice: Float!
    barcode: String
    QR: String
  }

  input CartInput {
    transID: String!
    productID: String!
    sku: String!
    productName: String!
    stockDesc: String!
    priceID: String!
    quantity: Int!
    unit: String!
    unitPrice: Float!
    totalPrice: Float!
    barcode: String
    QR: String
  }

  type Resolved{
    deleted: Boolean
  }

  extend type Mutation {
    addTransaction(input: TransactionInput): Transaction!
    updateTransaction(id: String, input: TransactionEdit): Transaction

    addCart(input: CartInput): Cart!
    deleteCart(id: String): Resolved!
  }
`;
