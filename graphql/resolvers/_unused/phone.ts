import { ObjectId } from "../../config/deps.ts";
import { phones } from "../../config/data.ts";

export const PhoneResolvers = {
  Query: {
    getPhone: async (_: any, { id }: any, context: any, info: any) => {
      const phoneID = ObjectId(id);
      const list = await phones.findOne(phoneID);
      return { ...list, phoneID };
    },
  },
  Mutation: {
    addPhone: async (
      _: any,
      {
        input: {
          contactID,
          desc,
          type,
          status,
          number,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const { $oid: id } = await phones.insertOne({
        contactID,
        desc,
        type,
        status,
        number,
      });
      return {
        id,
        contactID,
        desc,
        type,
        status,
        number,
      };
    },
    updatePhone: async (
      _: any,
      {
        id,
        input: {
          type,
          status,
          number,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const phoneID = ObjectId(id);
      const lists = await phones.updateOne(
        {
          phoneID,
          type,
          status,
          number,
        },
        {
          $set: {
            type,
            status,
            number,
          },
        },
      );
      const list = await phones.findOne(phoneID);
      return { ...list, phoneID };
    },
  },
};
