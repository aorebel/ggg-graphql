import { gql } from "../../config/deps.ts";

export const InventoryType = (gql as any)`
  extend type Query {
    allInventories: [Inventory!]!
    getProductInventory(productID: String): [Inventory!]! 
    findProductInventories(filter: String!): [Inventory!]!

    allWarehouses: [Warehouse!]!
    getWarehouse(id: ID!): Warehouse
    findWarehouses(filter: String!): [Warehouse!]!

    getWarehouseTrans(transID: String, sku: String): Warehouse
    getStockUnits(sku: String, storageID: String, limit: String, sort: String): StockUnits
  }

  type Inventory {
    id: ID!
    productID: String!
    sku: String!
    desc: String 
    type: String!
    unit: String! 
    warehouses: [Warehouse!]   
  }

  type Warehouse{
    id: ID!
    storageType: String!
    name: String!
    desc: String
    contact: [Contact!]
    products: [Product!]    
    stocks: [StockUnits!]
    transactions: [Transaction!]
  }  
  
  type StockUnits{
    id: ID!
    dateUpdated: String!
    sku: String!
    storageID: String!
    transID: String!    
    goodUnits: Int!
    badUnits: Int!
    totalUnits: Int!
    price: [Price!]
  }
  
  input InventoryInput {
    productID: String!
    sku: String   
    desc: String 
    type: String!
    unit: String!
  }

  input WarehouseInput{
    storageType: String!
    name: String
    desc: String!
  }
  

  input StockUnitsInput{
    dateUpdated: String!
    sku: String!
    storageID: String!
    transID: String!
    goodUnits: Int
    badUnits: Int
    totalUnits: Int
  }

  input WarehouseEdit{
    name: String
    desc: String
    storageType: String
  }
  

  input StockUnitEdit{
    goodUnits: Int
    badUnits: Int
    totalUnits: Int
  }

  extend type Mutation {
    addInventory(input: InventoryInput): Inventory!
    addWarehouse(input: WarehouseInput): Warehouse!
    addStockUnits(input: StockUnitsInput): StockUnits!

    updateWarehouse(id: String, input: WarehouseEdit): Warehouse
    updateStockUnit(id: String, input: StockUnitEdit): StockUnits
  }
`;
