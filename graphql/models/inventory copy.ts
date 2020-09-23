import { gql } from "../../config/deps.ts";

export const InventoryType = (gql as any)`
  extend type Query {
    allInventories: [Inventory!]!
    getInventory(id: ID!): Inventory
    getProductInventory(productID: String, inventoryID: String, warehouseID: String, storeID: String): [Inventory!]!
    findInventories(filter: String!): [Inventory!]!

    allWarehouses: [Warehouse!]!
    getWarehouse(id: ID!): Warehouse
    findWarehouses(filter: String!): [Warehouse!]!

    allStores: [Store!]!
    getStore(id: ID!): Store
    findStores(filter: String!): [Store!]!

    allStocks: [Stock!]!
    getStock(id: ID!): Stock
    findStocks(filter: String!): [Stock!]!

    getStockUnits(id: ID!): [StockUnits!]!
  }

  type Inventory {
    id: ID!
    desc:String
    warehouses: [Warehouse!]
    stores: [Store!]
  }

  type Warehouse{
      id: ID!
      name: String!
      inventoryID: String
      contact: [Contact!]
      stores: [Store!]
      stocks: [Stock!]
  }

  type Store{
    id: ID!
    name: String!
    inventoryID: String
    warehouseID: String 
    contact: [Contact!]
    stock: [Stock!]
}
  type Stock{
    id: ID!
    storage: String!
    storageID: String!
    productID: String!
    sku: String!
    desc: String 
    type: String!
    unit: String!
    stockUnits: [StockUnits]      
    price: [Price!]
    product:[Product!]
  }
  
  type StockUnits{
    id: ID!
    date: String!
    stockID: String!
    transID: String!
    goodUnits: Int
    badUnits: Int
    totalUnits: Int
  }
  
  input InventoryInput {
    id: ID!
    desc: String
  }

  input WarehouseInput{
    name: String!
    inventoryID: String
  }
  
  input StoreInput{
    name: String!
    inventoryID: String
    warehouseID: String 
  }

  input StockInput{
    storage: String!
    storageID: String!
    productID: String!
    sku: String!
    desc: String 
    type: String!
    unit: String!
  }
  input StockUnitsInput{
    date: String!
    sku: String!
    transID: String!
    goodUnits: Int
    badUnits: Int
    totalUnits: Int
  }

  input WarehouseEdit{
    name: String!
  }
  
  input StoreEdit{
    name: String!   
  }

  input StockEdit{
    desc: String 
    type: String!
    unit: String!
    value: Int    
    good: Int
    bad: Int
  }

  extend type Mutation {
    addInventory(input: InventoryInput): Inventory!
    addWarehouse(input: WarehouseInput): Warehouse!
    addStore(input: StoreInput): Store!
    addStock(input: StockInput): Stock!
    addStockUnits(input: StockUnitsInput): StockUnits!

    updateWarehouse(id: String, input: WarehouseEdit): Warehouse
    updateStore(id: String, input: StoreEdit): Store
    updateStock(id: String, input: StockEdit): Stock
  }
`;
