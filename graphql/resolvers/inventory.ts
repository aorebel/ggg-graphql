import { res, y, newInventory } from "../controller/index.ts";
import { inventories } from "../../config/data.ts";

export const InventoryResolvers = {
  Query: {
    allInventories: async () => {
      const list = await inventories.find();
      return await res(list);
    },
  },
  Mutation: {
    addInventory: async (
      _: any,
      { input: { productID, sku, desc, type, unit } }: any,
      context: any,
      info: any,
    ) => {
      const duplicate = await inventories.count(
        {
          $and: [
            { productID: { $eq: productID } },
            { sku: { $eq: sku } },
            { type: { $eq: type } },
            { unit: { $eq: unit } },
          ],
        },
      );
      if (!duplicate) {
        return await newInventory(productID, sku, desc, type, unit);
      } else {
        throw Error(
          "This Inventory " + sku + " already exists.",
        );
      }
    },
  },
};
