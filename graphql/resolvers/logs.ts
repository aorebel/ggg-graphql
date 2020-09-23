import { res, y } from "../controller/index.ts";
import { logs } from "../../config/data.ts";

export const LogsResolvers = {
  Query: {
    allLogs: async () => {
      const lists = await logs.find();
      return lists.map((list: any) => {
        const {
          _id: { $oid: _id },
        } = list;
        list.id = _id;
        return list;
      });
    },
    findLogs: async (_: any, { filter }: any, context: any, info: any) => {
      const lists = await logs.find({
        $or: [
          { userID: { $regex: filter } },
          { logType: { $regex: filter } },
          { collection: { $regex: filter } },
          { owner: { $regex: filter } },
          { field: { $regex: filter } },
          { oldValue: { $regex: filter } },
          { newValue: { $regex: filter } },
          { remarks: { $regex: filter } },
          { date: { $regex: filter } },
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
    getLogs: async (_: any, { id }: any, context: any, info: any) => {
      const list = await logs.findOne({ _id: { $oid: id } });
      return { ...list, _id: { $oid: id } };
    },
  },
  Mutation: {
    addLogs: async (
      _: any,
      {
        input: {
          userID,
          logType,
          collection,
          owner,
          field,
          oldValue,
          newValue,
          date,
          remarks,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      date = y;
      const { $oid: id } = await logs.insertOne({
        userID,
        logType,
        collection,
        owner,
        field,
        oldValue,
        newValue,
        date,
        remarks,
      });
      const list = await logs.findOne({ _id: { $oid: id } });
      if (list) {
        return await res(list);
      } else {
        return false;
      }
    },
  },
};
