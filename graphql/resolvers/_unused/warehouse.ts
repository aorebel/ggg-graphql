import { ObjectId, time } from "../../config/deps.ts";
import { warehouses } from "../../config/data.ts";
import { res, y, editWarehouse, newWarehouse } from "../controller/index.ts";

export const WarehouseResolvers = {
  Query: {
    allWarehouses: async () => {
      const lists = await warehouses.find();
      return await res(lists);
    },
    findWarehouses: async (
      _: any,
      { filter }: any,
      context: any,
      info: any,
    ) => {
      const lists = await warehouses.find({
        $or: [
          { inventoryID: { $eq: filter } },
          { name: { $eq: filter } },
        ],
      });
      return await res(lists);
    },
    getWarehouse: async (_: any, { id }: any, context: any, info: any) => {
      const warehouseID = ObjectId(id);
      const list = await warehouses.findOne(warehouseID);
      return { ...list, warehouseID };
    },
  },
  Mutation: {
    addWarehouse: async (
      _: any,
      {
        input: {
          name,
          inventoryID,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const x = { name };

      const match = await warehouses.count({ name: { $eq: x.name } });
      if (match) {
        throw Error(
          "This warehouse " + x.name + " already exists " +
            match + "",
        );
      } else {
        return await newWarehouse(name, inventoryID);
      }
    },
    updateWarehouse: async (
      _: any,
      {
        id,
        input: {
          name,
          inventoryID,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      //const warehouseID = ObjectId(id);
      return await editWarehouse(id, name, inventoryID);
    },
  },
};
