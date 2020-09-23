import { Router } from "../config/deps.ts";
import { applyGraphQL, gql } from "../config/deps.ts";

import { ContactType } from "./models/contact.ts";
import { EmployeeType } from "./models/employee.ts";
import { ImageType } from "./models/image.ts";
import { InventoryType } from "./models/inventory.ts";
import { LogsType } from "./models/logs.ts";
import { PriceType } from "./models/price.ts";
import { ProductType } from "./models/product.ts";
import { UserType } from "./models/user.ts";
import { TransactionType } from "./models/transaction.ts";

import { UserResolvers } from "./resolvers/user_v2.ts";
import { EmployeeResolvers } from "./resolvers/employee.ts";

import { CartResolvers } from "./resolvers/cart.ts";
import { ContactResolvers } from "./resolvers/contact.ts";
import { ImageResolvers } from "./resolvers/image.ts";
import { InventoryResolvers } from "./resolvers/inventory.ts";
import { LogsResolvers } from "./resolvers/logs.ts";
import { PriceResolvers } from "./resolvers/price.ts";
import { ProductResolvers } from "./resolvers/product.ts";
import { TransactionResolvers } from "./resolvers/transaction.ts";

/*
//import { WarehouseResolvers } from "./resolvers/warehouse.ts";
//import { UserResolvers } from "./resolvers/user.ts";
//import { AddressResolvers } from "./resolvers/address.ts";

//import { StockResolvers } from "./resolvers/stock.ts";
//import { StoreResolvers } from "./resolvers/store.ts";

//import { PhoneResolvers } from "./resolvers/phone.ts";

//import { EmailResolvers } from "./resolvers/email.ts";
*/
const Schema = (gql as any)`
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
    
    ${UserType}
    ${EmployeeType}
    ${ImageType}    
    ${TransactionType}

    ${LogsType}
    ${PriceType}
    ${ProductType}
    ${InventoryType}
    ${ContactType}
`;

//
export const GraphQLService = await applyGraphQL<Router>({
  //export const GraphQLService = await applyGraphQL({
  Router,
  typeDefs: Schema,
  resolvers: [
    UserResolvers,
    EmployeeResolvers,
    ContactResolvers,
    CartResolvers,
    ProductResolvers,
    LogsResolvers,
    InventoryResolvers,
    ImageResolvers,
    LogsResolvers,
    TransactionResolvers,
    PriceResolvers,
    /*
    //StoreResolvers,
    //WarehouseResolvers,
    
    //PhoneResolvers,
    //StockResolvers,
    
    //AddressResolvers,
    //EmailResolvers,
    */
  ],
  context: (ctx) => {},
});
