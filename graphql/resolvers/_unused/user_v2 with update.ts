import { ObjectId, time } from "../../config/deps.ts";
import {
  users,
  transactions,
  employees,
  contacts,
  address,
  emails,
  phones,
} from "../../config/data.ts";

export const UserResolvers = {
  Query: {
    userFoo: () => "bar",
    allUsers: async () => {
      const lists = await users.find();
      return lists.map((list: any) => {
        const {
          _id: { $oid: _id },
        } = list;
        list.id = _id;
        return list;
      });
    },
    findUsers: async (
      parent: any,
      { filter }: any,
      context: any,
      info: any,
    ) => {
      const lists = await users.find({
        $or: [
          { username: { $eq: filter } },
          { role: { $eq: filter } },
          { status: { $eq: filter } },
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

    getUserInfo: async (
      parent: any,
      { id, contactID }: any,
      context: any,
      info: any,
    ) => {
      // select user collection
      const list = await users.findOne({ _id: { "$oid": id } });
      // select employees collection
      const selectEmployee = await employees.find({ userID: { $eq: id } });
      let allEmployees = await selectEmployee.map((profile: any) => {
        return { ...profile, _id: profile._id.$oid };
      });
      // select transactions collection
      const selectTransactions = await transactions.find(
        { userID: { $eq: id } },
      );
      let allTransactions = await selectTransactions.map(
        (transaction: any) => {
          return { ...transaction, _id: transaction._id.$oid };
        },
      );
      // select contacts collection
      const collection = "users";
      const selectContacts = await contacts.find({
        $and: [
          { collection: { $eq: collection } },
          { owner: { $eq: id } },
        ],
      });
      let allContacts = await selectContacts.map(
        (contact: any) => {
          return { ...contact, _id: contact._id.$oid };
        },
      );

      // select address collection
      const selectAddress = await address.find(
        { contactID: { $eq: contactID } },
      );
      let allAddress = await selectAddress.map(
        (address: any) => {
          return { ...address, _id: address._id.$oid };
        },
      );

      // select address collection
      const selectPhone = await phones.find(
        { contactID: { $eq: contactID } },
      );
      let allPhone = await selectPhone.map(
        (phone: any) => {
          return { ...phone, _id: phone._id.$oid };
        },
      );

      // select address collection
      const selectEmail = await emails.find(
        { contactID: { $eq: contactID } },
      );
      let allEmail = await selectEmail.map(
        (email: any) => {
          return { ...email, _id: email._id.$oid };
        },
      );

      return {
        ...list,
        id,
        transaction: allTransactions,
        profile: allEmployees,
        contact: {
          ...allContacts,
          collection,
          owner: id,
          address: allAddress,
          phone: allPhone,
          email: allEmail,
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
      const y = time().tz("Asia/Manila").toString();

      const match = await users.count({ username: { $eq: x.username } });
      if (match) {
        throw Error(
          "This username " + x.username + " already exists " +
            match + "" +
            y,
        );
      } else {
        dateCreated = y;
        const { $oid: id } = await users.insertOne({
          username,
          password,
          role,
          status,
          dateCreated,
        });
        return { id, username, password, role, status, dateCreated };
      }
    },
    updateUser: async (
      parent: any,
      { id, input: { username, password, role, status, token } }: any,
      context: any,
      info: any,
    ) => {
      //const userID = ObjectId(id);
      const lists = await users.updateOne(
        {
          _id: {
            $oid: id,
          },
        },
        {
          $set: {
            username: username,
            password: password,
            role: role,
            status: status,
            token: token,
          },
        },
      );
      if (lists) {
        const list = await users.findOne({ _id: { "$oid": id } });
        return { ...list, id: { "$oid": id } };
      } else {
        return false;
      }
    },
  },
};
