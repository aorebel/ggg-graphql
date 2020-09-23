import { contacts, address, emails, phones } from "../../config/data.ts";
import { res, res2 } from "./index.ts";

export const findContactsWithOwner = async (collection: any, value: any) => {
  const list = await contacts.find({
    $and: [
      { collection: { $eq: collection } },
      { owner: { $eq: value } },
    ],
  });
  return await res(list);
};

export const findContacts = async (field: any, value: any) => {
  if (field === "phones") {
    const list = await phones.find({ contactID: { $eq: value } });
    //return list;
    return await res(list);
  } else if (field === "emails") {
    const list = await emails.find({ contactID: { $eq: value } });
    //return list;
    return await res(list);
  } else if (field === "address") {
    const list = await address.find({ contactID: { $eq: value } });
    //return list;
    return await res(list);
  }
};

export const addPE = async (
  collection: any,
  contactID: any,
  desc: any,
  type: any,
  status: any,
  value: any,
) => {
  if (collection === "phones") {
    let number = value;
    const { $oid: id } = await phones.insertOne(
      { contactID, desc, type, status, number },
    );
    const list = await phones.findOne({ _id: { $oid: id } });
    if (list) {
      return { ...list, id: list._id.$oid };
    } else {
      return false;
    }
  } else if (collection === "emails") {
    let email = value;
    const { $oid: id } = await emails.insertOne(
      { contactID, desc, type, status, email },
    );
    const list = await emails.findOne({ _id: { $oid: id } });
    if (list) {
      return { ...list, id: list._id.$oid };
    } else {
      return false;
    }
  }
};

export const addAddress = async (
  contactID: any,
  desc: any,
  type: any,
  status: any,
  bldgNo: any,
  street: any,
  brgy: any,
  city: any,
  province: any,
  region: any,
  country: any,
  zip: any,
  lat: any,
  lang: any,
) => {
  const { $oid: id } = await address.insertOne(
    {
      contactID,
      desc,
      type,
      status,
      bldgNo,
      street,
      brgy,
      city,
      province,
      region,
      country,
      zip,
      lat,
      lang,
    },
  );
  const list = await address.findOne({ _id: { $oid: id } });
  if (list) {
    return { ...list, id: list._id.$oid };
  } else {
    return false;
  }
};

export const editPE = async (
  id: any,
  collection: any,
  status: any,
  desc: any,
) => {
  if (collection === "phones") {
    const lists = await phones.updateOne(
      { _id: { $oid: id } },
      { $set: { status: status, desc: desc } },
    );
    const list = await phones.findOne({ _id: { $oid: id } });
    if (list) {
      return { ...list, id: list._id.$oid };
    }
  } else if (collection === "emails") {
    const lists = await emails.updateOne(
      { _id: { $oid: id } },
      { $set: { status: status, desc: desc } },
    );
    const list = await emails.findOne({ _id: { $oid: id } });
    if (list) {
      return { ...list, id: list._id.$oid };
    }
  } else if (collection === "address") {
    const lists = await address.updateOne(
      { _id: { $oid: id } },
      { $set: { status: status, desc: desc } },
    );
    const list = await address.findOne({ _id: { $oid: id } });
    if (list) {
      return { ...list, id: list._id.$oid };
    }
  }
};

export const getContactsById = async (id: any) => {
  const lists = await contacts.find({ id: { $eq: id } });
  const getCID = await res(lists);
  let cid = getCID[0].id;

  var allAddress = await findContacts("address", id);
  var allPhones = await findContacts("phones", id);
  var allEmails = await findContacts("emails", id);

  return {
    ...lists,
    id: cid,
    collection: getCID[0].collection,
    owner: getCID[0].owner,
    desc: getCID[0].desc,
    email: allEmails,
    phone: allPhones,
    address: allAddress,
  };
};

export const getAllContacts = async () => {
  // const lists = await contacts.aggregate([
  //   {
  //     $lookup:{
  //       from: "phones",
  //       localField: "id",
  //       foreignField: "contactID",
  //       as: "phone"
  //     }
  //   }
  // ]);
  const lists = await contacts.find();
  "use strict";
  let allContacts = await res(lists);

  var x = await contacts.count() - 1;

  var all: any = [];

  var i = x;

  while (i > 0) {
    var cid = allContacts[i].id;

    var allAddress = await findContacts("address", cid);
    var allPhones = await findContacts("phones", cid);
    var allEmails = await findContacts("emails", cid);

    console.log(cid);
    //all.push({ id: cid });
    //return all;
    all.push([{
      id: cid,
      collection: allContacts[i].collection,
      owner: allContacts[i].owner,
      desc: allContacts[i].desc,
      email: allEmails,
      phone: allPhones,
      address: allAddress,
    }]);
    //all.push("push");
    // all = {
    //   ...lists,
    //   id: cid,
    //   collection: allContacts[i].collection,
    //   owner: allContacts[i].owner,
    //   desc: allContacts[i].desc,
    //   email: allEmails,
    //   phone: allPhones,
    //   address: allAddress,
    // };
    i--;

    // return all.push(newAll);
  }
  console.log(...all);
  return { ...all };
  //return console.log(i + " " + x);
  // return {
  //   ...lists,
  //   id: cid,
  //   collection: allContacts[1].collection,
  //   owner: allContacts[1].owner,
  //   desc: allContacts[1].desc,
  //   email: allEmails,
  //   phone: allPhones,
  //   address: allAddress,
  // };
};
