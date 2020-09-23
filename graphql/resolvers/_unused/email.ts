import { ObjectId } from "../../config/deps.ts";
import { emails } from "../../config/data.ts";

export const EmailResolvers = {
  Query: {
    getEmail: async (_: any, { id }: any, context: any, info: any) => {
      const emailID = ObjectId(id);
      const list = await emails.findOne(emailID);
      return { ...list, emailID };
    },
  },
  Mutation: {
    addEmail: async (
      _: any,
      {
        input: {
          contactID,
          desc,
          type,
          status,
          email,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const { $oid: id } = await emails.insertOne({
        contactID,
        desc,
        type,
        status,
        email,
      });
      return {
        id,
        contactID,
        desc,
        type,
        status,
        email,
      };
    },
    updateEmail: async (
      _: any,
      {
        id,
        input: {
          type,
          status,
          email,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const emailID = ObjectId(id);
      const lists = await emails.updateOne(
        {
          emailID,
          type,
          status,
          email,
        },
        {
          $set: {
            type,
            status,
            email,
          },
        },
      );
      const list = await emails.findOne(emailID);
      return { ...list, emailID };
    },
  },
};
