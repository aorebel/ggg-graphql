import { res, y, newPrice, editPrice } from "../controller/index.ts";
import { prices } from "../../config/data.ts";

export const PriceResolvers = {
  Query: {
    allPrices: async () => {
      const lists = await prices.find();
      return lists.map((list: any) => {
        const {
          _id: { $oid: _id },
        } = list;
        list.id = _id;
        return list;
      });
    },
    findPrices: async (
      _: any,
      { filter }: any,
      context: any,
      info: any,
    ) => {
      const lists = await prices.find({
        $or: [
          { productID: { $regex: filter } },
          { stockID: { $regex: filter } },
          { barcode: { $regex: filter } },
          { QR: { $regex: filter } },
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

    getPrice: async (_: any, { id }: any, context: any, info: any) => {
      const list = await prices.findOne({ _id: { $oid: id } });
      return { ...list, _id: { $oid: id } };
    },
  },
  Mutation: {
    addPrice: async (
      _: any,
      {
        input: {
          productID,
          stockID,
          barcode,
          QR,
          unitPrice,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const x = { productID, stockID, barcode, QR };

      const match = await prices.count({
        $and: [
          { productID: { $eq: x.productID } },
          { stockID: { $eq: x.stockID } },
        ],
        $or: [
          { barcode: { $eq: x.barcode } },
          { QR: { $eq: x.QR } },
        ],
      });
      if (match) {
        throw Error(
          "This price " + x.productID + " already exists " +
            match + "",
        );
      } else {
        return await newPrice(productID, stockID, barcode, QR, unitPrice);
      }
    },
    updatePrice: async (
      _: any,
      {
        id,
        input: {
          unitPrice,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      return await editPrice(id, unitPrice);
    },
  },
};
