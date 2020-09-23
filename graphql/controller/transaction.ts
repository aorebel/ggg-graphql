import { transactions, carts } from "../../config/data.ts";
import { res } from "./index.ts";

export const findTransactionsWithUserID = async (value: any) => {
  const list = await transactions.find({ userID: { $eq: value } });
  return await res(list);
};
