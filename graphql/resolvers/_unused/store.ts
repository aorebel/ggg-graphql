import { ObjectId, time } from "../../config/deps.ts";
import { stores } from "../../config/data.ts";

const y = time().tz("Asia/Manila").toString();
export const StoreResolvers = {
  Query: {
    allStores: async () => {
      const lists = await stores.find();
      return lists.map((list: any) => {
        const {
          _id: { $oid: _id },
        } = list;
        list.id = _id;
        return list;
      });
    },
    findStores: async (
      _: any,
      { filter }: any,
      context: any,
      info: any,
    ) => {
      const lists = await stores.find({
        $or: [
          { inventoryID: { $eq: filter } },
          { warehouseID: { $eq: filter } },
          { name: { $eq: filter } },
        ],
      });
      //return { ...lists };

      return lists.map((list: any) => {
        const {
          _id: { $oid: _id },
        } = list;
        list.id = _id;
        return list;
      });
    },

    getStore: async (_: any, { id }: any, context: any, info: any) => {
      const storeID = ObjectId(id);
      const list = await stores.findOne({ storeID });
      return { ...list, storeID };
    },
  },
  Mutation: {
    addStore: async (
      _: any,
      {
        input: {
          name,
          inventoryID,
          warehouseID,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const x = { name, inventoryID, warehouseID };

      const match = await stores.count({
        $and: [
          { name: { $eq: x.name } },
          {
            $or: [
              { inventoryID: { $eq: x.inventoryID } },
              { warehouseID: { $eq: x.warehouseID } },
            ],
          },
        ],
      });
      if (match) {
        throw Error(
          "This store " + x.name + " already exists " +
            match + "",
        );
      } else {
        const { $oid: id } = await stores.insertOne({
          name,
          inventoryID,
          warehouseID,
        });
        return {
          id,
          name,
          inventoryID,
          warehouseID,
        };
      }
    },
    updateStore: async (
      _: any,
      {
        id,
        input: {
          name,
          inventoryID,
          warehouseID,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const storeID = ObjectId(id);

      const lists = await stores.updateOne(
        {
          storeID,
          name,
          inventoryID,
          warehouseID,
        },
        {
          $set: {
            name,
            inventoryID,
            warehouseID,
          },
        },
      );
      const list = await stores.findOne(storeID);
      return { ...list, storeID };
    },
  },
};
