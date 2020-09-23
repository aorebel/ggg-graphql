import {
  users,
  employees,
} from "../../config/data.ts";
import {
  y,
  res,
  newUser,
  editUser,
  searchUsers,
  findTransactionsWithUserID,
  findContactsWithOwner,
  findContacts,
} from "../controller/index.ts";

export const UserResolvers = {
  Query: {
    userFoo: () => "bar",
    allUsers: async () => {
      const lists = await users.find();
      return await res(lists);
    },
    findUsers: async (
      parent: any,
      { filter }: any,
      context: any,
      info: any,
    ) => {
      const lists = await searchUsers(filter);
      return await res(lists);
      //return { ...lists };
    },

    getUserInfo: async (
      parent: any,
      { id }: any,
      context: any,
      info: any,
    ) => {
      // select user collection
      const list = await users.findOne({ _id: { "$oid": id } });
      // select employees collection
      const selectEmployee = await employees.find({ userID: { $eq: id } });
      let allEmployees = await res(selectEmployee);
      let allTransactions = await findTransactionsWithUserID(id);

      const collection = "users";
      let allContacts = await findContactsWithOwner(collection, id);

      let cid = allContacts[0].id;
      let allAddress = await findContacts("address", cid);
      const allPhones = await findContacts("phones", cid);
      const allEmails = await findContacts("emails", cid);

      return {
        ...list,
        id,
        transaction: allTransactions,
        profile: allEmployees,
        contact: {
          ...allContacts,
          id: cid,
          collection,
          owner: id,
          address: allAddress,
          phone: allPhones,
          email: allEmails,
        },
      };
    },

    getUser: async (_: any, { id }: any, context: any, info: any) => {
      const list = await users.findOne({ _id: { "$oid": id } });
      return { ...list, _id: { "$oid": id } };
    },
  },
  Mutation: {
    addUser: async (
      parent: any,
      { input: { username, password, role, status, dateCreated } }: any,
      context: any,
      info: any,
    ) => {
      const x = { username };
      const match = await users.count({ username: { $eq: x.username } });
      if (match) {
        throw Error(
          "This username " + x.username + " already exists.",
        );
      } else {
        dateCreated = y;
        return await newUser(username, password, role, status, dateCreated);
      }
    },
    updateUser: async (
      parent: any,
      { id, input: { username, password, role, status, token } }: any,
      context: any,
      info: any,
    ) => {
      //const userID = ObjectId(id);
      return await editUser(id, username, password, role, status, token);
    },
  },
};
