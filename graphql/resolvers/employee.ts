import { employees } from "../../config/data.ts";
import { res, newEmployee, editEmployee } from "../controller/index.ts";

export const EmployeeResolvers = {
  Query: {
    allEmployees: async () => {
      const lists = await employees.find();
      return await res(lists);
    },
  },
  Mutation: {
    addEmployee: async (
      _: any,
      {
        input: {
          userID,
          firstname,
          middlename,
          lastname,
          birthday,
          civil_status,
          gender,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const x = { userID };

      const match = await employees.count({ userID: { $eq: x.userID } });
      if (match) {
        throw Error(
          "This employee " + x.userID + " already exists " +
            match + "",
        );
      } else {
        return await newEmployee(
          userID,
          firstname,
          middlename,
          lastname,
          birthday,
          civil_status,
          gender,
        );
      }
    },
    updateEmployee: async (
      _: any,
      {
        id,
        input: {
          firstname,
          middlename,
          lastname,
          birthday,
          civil_status,
          gender,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      return await editEmployee(
        id,
        firstname,
        middlename,
        lastname,
        birthday,
        civil_status,
        gender,
      );
    },
  },
};
