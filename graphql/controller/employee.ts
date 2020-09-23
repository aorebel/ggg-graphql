import { res } from "./index.ts";
import {
  employees,
} from "../../config/data.ts";

export const newEmployee = async (
  userID: any,
  firstname: any,
  middlename: any,
  lastname:any,
  birthday: any,
  civil_status: any,
  gender: any
) => {
  const { $oid: id } = await employees.insertOne({
    userID,
    firstname,
    middlename,
    lastname,
    birthday,
    civil_status,
    gender,
  });
  const list = await employees.findOne({ _id: { $oid: id } });
  if (list) {
    return { ...list, id: list._id.$oid };
  } else {
    return false;
  }
};

// update user
export const editEmployee = async (
  id: any,
  firstname: any,
  middlename: any,
  lastname: any,
  birthday: any,
  civil_status: any,
  gender: any
) => {
  const lists = await employees.updateOne(
    {
      _id: { $oid: id }
    },
    {
      $set: {
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        birthday: birthday,
        civil_status: civil_status,
        gender: gender,
      },
    },
  );
  
  const list = await employees.findOne({ _id: { $oid: id } });
  if (list) {
    return { ...list, id: list._id.$oid };
  }
};

