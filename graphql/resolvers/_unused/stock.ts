import { stocks, stockUnits } from "../../config/data.ts";
import {
  res,
  y,
} from "../controller/index.ts";

export const StockResolvers = {
  Query: {
    allStocks: async () => {
      const lists = await stocks.find();

      return await res(lists);
    },
    findStocks: async (
      _: any,
      { filter }: any,
      context: any,
      info: any,
    ) => {
      const lists = await stocks.find({
        $or: [
          { inventoryID: { $eq: filter } },
          { warehouseID: { $eq: filter } },
          { name: { $eq: filter } },
        ],
      });
      return await res(lists);
    },

    getStock: async (_: any, { id }: any, context: any, info: any) => {
      const list = await stocks.findOne({ _id: { $oid: id } });

      const getStocks = await stockUnits.find({ stockID: { $eq: id } }).limit(
        1,
      );
      const allStocks = await res(getStocks);

      return { ...list, id, stockUnits: allStocks };
    },
  },
  Mutation: {
    addStock: async (
      _: any,
      {
        input: {
          inventoryID,
          storage,
          storageID,
          desc,
          type,
          unit,
          value,
          good,
          bad,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const x = { storage, inventoryID, storageID };

      const match = await stocks.count({
        $and: [
          { storage: { $eq: x.storage } },
          { storageID: { $eq: x.storageID } },
          { inventory: { $eq: x.inventoryID } },
        ],
      });
      if (match) {
        throw Error(
          "This stock " + desc + " already exists " +
            match + "",
        );
      } else {
        const { $oid: id } = await stocks.insertOne({
          inventoryID,
          storage,
          storageID,
          desc,
          type,
          unit,
          value,
          good,
          bad,
        });
        return {
          id,
          inventoryID,
          storage,
          storageID,
          desc,
          type,
          unit,
          value,
          good,
          bad,
        };
      }
    },
    updateStock: async (
      _: any,
      {
        id,
        input: {
          desc,
          type,
          unit,
          value,
          good,
          bad,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const lists = await stocks.updateOne(
        {
          _id: { $oid: id },
        },
        {
          $set: {
            desc,
            type,
            unit,
            value,
            good,
            bad,
          },
        },
      );
      const list = await stocks.findOne({ _id: { $oid: id } });
      return { ...list, id };
    },
  },
};
