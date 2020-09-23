import { res, y, editProduct, newProduct } from "../controller/index.ts";
import {
  products,
  inventories,
  stockUnits,
  warehouses,
  images,
} from "../../config/data.ts";

export const ProductResolvers = {
  Query: {
    allProducts: async () => {
      const lists = await products.find();
      const getProducts = await res(lists);
      let productId = getProducts[0].id;

      const getInventories = await inventories.find(
        { productID: { $eq: productId } },
      );
      const allInventories = await res(getInventories);
      let sku = allInventories[0].sku;

      const getStocks = await stockUnits.find({ sku: { $eq: sku } });
      const allStocks = await res(getStocks);
      let storageId = allStocks[0].storageID;

      const getStorage = await warehouses.find({ id: { $eq: storageId } });
      const allStorage = await res(getStorage);

      const getImages = await images.find(
        {
          $and: [
            { collection: { $eq: "products" } },
            { owner: { $eq: productId } },
          ],
        },
      );
      const allImages = await res(getImages);

      return {
        ...lists,
        id: productId,
        inventory: {
          ...allInventories,
          warehouses: { ...allStorage, stocks: allStocks },
        },
        images: allImages,
      };
    },
    findProducts: async (_: any, { filter }: any, context: any, info: any) => {
      const lists = await products.find({
        $or: [
          { name: { $regex: filter } },
          { sku: { $regex: filter } },
          { status: { $regex: filter } },
          { category: { $regex: filter } },
          { list: { $regex: filter } },
          { brand: { $regex: filter } },
          { color: { $regex: filter } },
          { size: { $regex: filter } },
          { material: { $regex: filter } },
          { weight: { $regex: filter } },
          { desc: { $regex: filter } },
          { model: { $regex: filter } },
        ],
      });
      //return { ...lists };

      return await res(lists);
    },
    getNestedContent: async (
      _: any,
      { id, filter }: any,
      context: any,
      info: any,
    ) => {
      const lists = await products.find({
        $and: [
          { id: { $eq: id } },
          { inventory: { productID: { $regex: filter } } },
          { price: { productID: { $regex: filter } } },
          { images: { productID: { $regex: filter } } },
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
    getProduct: async (_: any, { id }: any, context: any, info: any) => {
      const list = await products.findOne({ _id: { $oid: id } });
      return { ...list, _id: { $oid: id } };
    },
  },
  Mutation: {
    addProduct: async (
      _: any,
      {
        input: {
          category,
          item,
          brand,
          name,
          model,
          serial,
          color,
          size,
          volume,
          material,
          weight,
          desc,
          status,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const x = { name };
      const match = await products.count(
        {
          $and: [
            { name: { $eq: x.name } },
          ],
        },
      );
      if (match) {
        throw Error(
          "This product " + x.name + " already exists " +
            match,
        );
      } else {
        return await newProduct(
          category,
          item,
          brand,
          name,
          model,
          serial,
          color,
          size,
          volume,
          material,
          weight,
          desc,
          status,
        );
      }
    },
    updateProduct: async (
      _: any,
      {
        id,
        input: {
          category,
          item,
          brand,
          name,
          color,
          size,
          volume,
          material,
          weight,
          desc,
          status,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      return await editProduct(
        id,
        category,
        item,
        brand,
        name,
        color,
        size,
        volume,
        material,
        weight,
        desc,
        status,
      );
    },
  },
};
