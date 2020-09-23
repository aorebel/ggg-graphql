import { res, y } from "../controller/index.ts";
import { carts } from "../../config/data.ts";

export const CartResolvers = {
  Query: {
    allCarts: async () => {
      const lists = await carts.find();
      return lists.map((list: any) => {
        const {
          _id: { $oid: _id },
        } = list;
        list.id = _id;
        return list;
      });
    },
    getCartTransaction: async (
      _: any,
      { transID }: any,
      context: any,
      info: any,
    ) => {
      const lists = await carts.find({
        transID: { $eq: transID },
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

    getCart: async (_: any, { id }: any, context: any, info: any) => {
      const list = await carts.findOne({ _id: { $oid: id } });
      return { ...list, _id: { $oid: id } };
    },
  },
  Mutation: {
    addCart: async (
      _: any,
      {
        input: {
          transID,
          productID,
          sku,
          productName,
          stockDesc,
          priceID,
          quantity,
          unit,
          unitPrice,
          totalPrice,
          barcode,
          QR,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const { $oid: id } = await carts.insertOne({
        transID,
        productID,
        sku,
        productName,
        stockDesc,
        priceID,
        quantity,
        unit,
        unitPrice,
        totalPrice,
        barcode,
        QR,
      });
      const list = await carts.findOne({ _id: { $oid: id } });
      if (list) {
        return { ...list, id: list._id.$oid };
      } else {
        return false;
      }
    },
    deleteCart: async (
      _: any,
      {
        id,
      }: any,
      context: any,
      info: any,
    ) => {
      const lists = await carts.deleteOne(
        {
          _id: { $oid: id },
        },
      );
      return { deleted: true };
    },
  },
};
