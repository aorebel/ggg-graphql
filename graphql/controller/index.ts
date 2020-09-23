import { time } from "../../config/deps.ts";
import { newUser, editUser, searchUsers, getUser } from "./user.ts";
import { findTransactionsWithUserID } from "./transaction.ts";
import {
  findContactsWithOwner,
  findContacts,
  addPE,
  editPE,
  addAddress,
  getAllContacts,
  getContactsById,
} from "./contact.ts";
import { editWarehouse, newWarehouse, getWarehouse } from "./warehouse.ts";
import { getCart } from "./cart.ts";
import { newEmployee, editEmployee } from "./employee.ts";
import {
  newInventory,
  newStocks,
  editStocks,
  getStockUnits,
  getSKUwithProductID,
  getStockTrans,
} from "./inventory.ts";
import { editProduct, newProduct } from "./product.ts";
import { newPrice, editPrice } from "./price.ts";
import { newImage, editImage } from "./image.ts";

const y = time().tz("Asia/Manila").toString();
const res = async (value: any) => {
  return value.map((x: any) => {
    return { ...x, id: x._id.$oid };
  });
};

const res2 = async (value: any) => {
  return value.map((x: any) => {
    return { ...x };
  });
};

export {
  y,
  res,
  res2,
  newUser,
  editUser,
  searchUsers,
  findTransactionsWithUserID,
  findContacts,
  findContactsWithOwner,
  getAllContacts,
  getContactsById,
  editWarehouse,
  newWarehouse,
  newEmployee,
  editEmployee,
  getCart,
  getUser,
  addPE,
  editPE,
  addAddress,
  newInventory,
  getWarehouse,
  newStocks,
  editStocks,
  getStockUnits,
  getSKUwithProductID,
  getStockTrans,
  editProduct,
  newProduct,
  newPrice,
  editPrice,
  newImage,
  editImage,
};
