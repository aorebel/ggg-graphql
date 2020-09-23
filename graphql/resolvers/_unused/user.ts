import { ObjectId } from "../../config/deps.ts";
import { users } from "../../config/data.ts";

export const UserResolvers = {
  Query: {
    userFoo: () => "bar",
    allUsers: async () => {
      const members = await users.find();
      return members.map((member: any) => {
        const {
          _id: { $oid: _id },
        } = member;
        member.id = _id;
        return member;
      });
    },
    findUsers: async (_: any, { filter }: any, context: any, info: any) => {
      const members = await users.find({
        $or: [
          { username: { $eq: filter } },
          { role: { $eq: filter } },
          { status: { $eq: filter } },
        ],
      });
      //return { ...members };

      return members.map((member: any) => {
        const {
          _id: { $oid: _id },
        } = member;
        member.id = _id;
        return member;
      });
    },
    getUser: async (_: any, { id }: any, context: any, info: any) => {
      const userId = ObjectId(id);
      const employee = await users.findOne(userId);
      return { ...employee, userId };
    },
  },
  Mutation: {
    addUser: async (
      _: any,
      { input: { username, password, role, status } }: any,
      context: any,
      info: any,
    ) => {
      const { $oid: id } = await users.insertOne({
        username,
        password,
        role,
        status,
      });
      return { id, username, password, role, status };
    },
    updateUser: async (
      _: any,
      { id, input: { username, password, role, status, token } }: any,
      context: any,
      info: any,
    ) => {
      const userID = ObjectId(id);
      const employees = await users.updateOne(
        { userID, username, password, role, status, token },
        {
          $set: { username, password, role, status, token },
        },
      );
      return { id, username, password, role, status, token };
    },
  },
};
