import { transactions, employees } from "../../config/data.ts";
import {
  res,
  y,
  findTransactionsWithUserID,
  getCart,
  getUser,
} from "../controller/index.ts";
//import { products } from "../../config/data";

export const TransactionResolvers = {
  Query: {
    allTransactions: async () => {
      const lists = await transactions.find();
      let allTrans = await res(lists);

      let transId = allTrans[0].id;
      let userId = allTrans[0].userID;
      const getCartTrans = await getCart(transId);
      const allCartTrans = await res(getCartTrans);
      const getUsers = await getUser(userId);
      const allUsers = await res(getUsers);

      const getProfile = await employees.find({ userID: { $eq: userId } });
      let profile = await res(getProfile);

      return {
        ...lists,
        id: transId,
        cart: allCartTrans,
        userInfo: { ...allUsers, profile: profile },
      };
      //return await res(lists);
    },
    findTransactions: async (
      _: any,
      { filter }: any,
      context: any,
      info: any,
    ) => {
      const lists = await transactions.find(
        {
          $or: [
            { userID: { $regex: filter } },
            { type: { $regex: filter } },
            { date: { $regex: filter } },
            { remarks: { $regex: filter } },
          ],
        },
      );
      return await res(lists);
    },
    getProductTransactions: async (
      _: any,
      { productID }: any,
      context: any,
      info: any,
    ) => {
      const lists = await transactions.find({
        cart: { productID: { $eq: productID } },
      });

      return await res(lists);
    },

    getUserTransactions: async (
      _: any,
      { userID }: any,
      context: any,
      info: any,
    ) => {
      const list = await findTransactionsWithUserID(userID);
      let listItems = await res(list);
      var transID = listItems[0].id;

      const cartItems = await getCart(transID);
      let allCartItems = await res(cartItems);

      const getUserInfo = await getUser(userID);
      let userInfo = await res(getUserInfo);

      const getProfile = await employees.find({ userID: { $eq: userID } });
      let profile = await res(getProfile);

      return {
        ...list,
        id: transID,
        userInfo: { ...userInfo, profile: profile },
        cart: allCartItems,
      };
    },

    getTransaction: async (_: any, { id }: any, context: any, info: any) => {
      const list = await transactions.findOne({ _id: { $oid: id } });

      const cartItems = await getCart(id);
      let allCartItems = await res(cartItems);

      let listItems = await res(list);
      var empID = listItems[0].userID;

      const getUserInfo = await getUser(empID);
      let userInfo = await res(getUserInfo);

      const getProfile = await employees.find({ userID: { $eq: empID } });
      let profile = await res(getProfile);
      return {
        ...list,
        id,
        userInfo: { ...userInfo, id: empID, profile: profile },
        cart: allCartItems,
      };
    },
  },
  Mutation: {
    addTransaction: async (
      _: any,
      {
        input: {
          code,
          userID,
          type,
          transDate,
          totalPrice,
          remarks,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const x = { code };
      const match = await transactions.count(
        {
          $and: [
            { code: { $eq: x.code } },
          ],
        },
      );
      if (match) {
        throw Error(
          "This product " + x.code + " already exists " +
            match,
        );
      } else {
        transDate = y;
        const { $oid: id } = await transactions.insertOne({
          code,
          userID,
          type,
          transDate,
          totalPrice,
          remarks,
        });
        const list = await transactions.findOne({ id });
        if (list) {
          return { ...list, id: list._id.$oid };
        } else {
          return false;
        }
      }
    },
    updateTransaction: async (
      _: any,
      {
        input: {
          id,
          totalPrice,
          remarks,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const lists = await transactions.updateOne(
        {
          _id: {
            $oid: id,
          },
        },
        {
          $set: { totalPrice, remarks },
        },
      );
      const list = await transactions.findOne({ _id: { $oid: id } });
      if (list) {
        return { ...list, id: list._id.$oid };
      } else {
        return false;
      }
    },
  },
};
