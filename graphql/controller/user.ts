import { res } from "./index.ts";
import {
  users,
  transactions,
  employees,
  contacts,
  address,
  emails,
  phones,
} from "../../config/data.ts";

const searchUsers = async (filter: any) => {
  const lists = await users.find({
    $or: [
      { username: { $regex: filter } },
      { role: { $regex: filter } },
      { status: { $regex: filter } },
    ],
    ///$text: { $search: filter },
  });
  return lists;
};

const newUser = async (
  username: any,
  password: any,
  role: any,
  status: any,
  dateCreated: any,
) => {
  const { $oid: id } = await users.insertOne({
    username,
    password,
    role,
    status,
    dateCreated,
  });
  const list = await users.findOne({ _id: { $oid: id } });
  if (list) {
    return { ...list, id: list._id.$oid };
  } else {
    return false;
  }
};

// update user
const editUser = async (
  id: any,
  username: any,
  password: any,
  role: any,
  status: any,
  token: any,
) => {
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
  const list = await users.findOne({ _id: { $oid: id } });
  if (list) {
    return { ...list, id: list._id.$oid };
  }
};

export const getUser = async (value: any) => {
  const lists = await users.find({ _id: { $oid: value } });
  return await res(lists);
};

export { newUser, editUser, searchUsers };
