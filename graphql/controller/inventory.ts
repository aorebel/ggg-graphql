import {
  inventories,
  warehouses,
  stockUnits,
} from "../../config/data.ts";
import { res } from "./index.ts";

export const newInventory = async (
  productID: any,
  sku: any,
  desc: any,
  type: any,
  unit: any,
) => {
  const { $oid: id } = await inventories.insertOne(
    { productID, sku, desc, type, unit },
  );
  const list = await inventories.findOne({ _id: { $oid: id } });
  if (list) {
    return { ...list, id: list._id.$oid };
  } else {
    return false;
  }
};

// export const newWarehouse = async (
//   storageType: any,
//   desc: any,
//   name: any,
// ) => {
//   const { $oid: id } = await inventories.insertOne(
//     { storageType, desc, name },
//   );
//   const list = await warehouses.findOne({ _id: { $oid: id } });
//   if (list) {
//     return { ...list, id: list._id.$oid };
//   } else {
//     return false;
//   }
// };

export const newStocks = async (
  dateUpdated: any,
  sku: any,
  storageID: any,
  transID: any,
  goodUnits: any,
  badUnits: any,
  totalUnits: any,
) => {
  const { $oid: id } = await stockUnits.insertOne(
    { dateUpdated, sku, storageID, transID, goodUnits, badUnits, totalUnits, },
  );
  const list = await stockUnits.findOne({ _id: { $oid: id } });
  if (list) {
    return { ...list, id: list._id.$oid };
  } else {
    return false;
  }
};

export const getSKUwithProductID = async (productID: any) => {
  const lists = await inventories.find({ productID: { $eq: productID } });
  return await res(lists);
};

export const getStockUnits = async (
  storageID: any,
  sku: any,
  limit: any,
  sort: any,
) => {
  const lists = await stockUnits.aggregate(
    [
      { $match: { storageID: { $eq: storageID }, sku: { $eq: sku } } },
      { $sort: { dateListed: sort } },
      { $limit: limit },
    ],
  );
  return await res(lists);
};

// export const editWarehouse = async (id: any, name: any) => {
//   const lists = await warehouses.updateOne(
//     { _id: { $oid: id } },
//     { $set: { name: name } },
//   );
//   const list = await warehouses.findOne({ _id: { $oid: id } });
//   if (list) {
//     return { ...list, id: list._id.$oid };
//   }
// };

export const editStocks = async (
  id: any,
  goodUnits: any,
  badUnits: any,
  totalUnits: any,
) => {
  const lists = await stockUnits.updateOne(
    { _id: { $oid: id } },
    {
      $set: {
        goodUnits: goodUnits,
        badUnits: badUnits,
        totalUnits: totalUnits,
      },
    },
  );
  const list = await stockUnits.findOne({ _id: { $oid: id } });
  if (list) {
    return { ...list, id: list._id.$oid };
  }
};

export const getWarehouse = async (id: any) => {
  const lists = await warehouses.findOne({ _id: { $oid: id } });
  return lists;
};

export const getStockTrans = async (transID: any) => {
  const lists = await stockUnits.find({ transID: { $eq: transID } });
  return await res(lists);
};
