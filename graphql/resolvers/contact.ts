import { contacts, phones, emails, address } from "../../config/data.ts";
import {
  res,
  addPE,
  addAddress,
  editPE,
  findContacts,
  getAllContacts,
  getContactsById,
} from "../controller/index.ts";

export const ContactResolvers = {
  Query: {
    allContacts: async () => {
      const lists = await contacts.find();
      return await res(lists);
    },
    getContact: async (
      _: any,
      { collection, owner }: any,
      context: any,
      info: any,
    ) => {
      const lists = await contacts.find({
        $and: [
          { collection: { $eq: collection } },
          { owner: { $eq: owner } },
        ],
      });

      // return lists.map((list: any) => {
      //   const {
      //     _id: { $oid: _id },
      //   } = list;
      //   list.id = _id;
      //   return list;
      // });
      const getCID = await res(lists);
      let cid = getCID[0].id;

      var allAddress = await findContacts("address", cid);
      var allPhones = await findContacts("phones", cid);
      var allEmails = await findContacts("emails", cid);
      console.log("cid " + cid);
      return {
        ...lists,
        id: cid,
        collection: collection,
        owner: owner,
        desc: getCID[0].desc,
        email: allEmails,
        phone: allPhones,
        address: allAddress,
      };
    },
    getAllContactByCollection: async (
      _: any,
      { collection }: any,
      context: any,
      info: any,
    ) => {
      const allContacts = await contacts.find(
        { collection: { $eq: collection } },
      );
      //console.log(res(allContacts));
      return await res(allContacts);
    },
  },
  Mutation: {
    addContact: async (
      _: any,
      { input: { collection, owner, desc } }: any,
      context: any,
      info: any,
    ) => {
      const x = { collection, owner };
      const match = await contacts.count(
        {
          $and: [
            { collection: { $eq: x.collection } },
            { owner: { $eq: x.owner } },
          ],
        },
      );
      if (match) {
        throw Error(
          "This contact " + x.collection + " owner " + x.owner +
            " already exists " +
            match,
        );
      } else {
        const { $oid: id } = await contacts.insertOne({
          collection,
          owner,
          desc,
        });
        return { id, collection, owner };
      }
    },
    addPhone: async (
      _: any,
      { input: { contactID, desc, type, status, number } }: any,
      context: any,
      info: any,
    ) => {
      const match = await phones.count(
        {
          $and: [
            { contactID: { $eq: contactID } },
            { number: { $eq: number } },
          ],
        },
      );
      if (match) {
        throw Error(
          "This contact " + number + " owner " + contactID +
            " already exists " +
            match,
        );
      } else {
        let collection = "phones";
        let value = number;
        return await addPE(collection, contactID, desc, type, status, value);
      }
    },
    addEmail: async (
      _: any,
      { input: { contactID, desc, type, status, email } }: any,
      context: any,
      info: any,
    ) => {
      const match = await emails.count(
        {
          $and: [
            { contactID: { $eq: contactID } },
            { email: { $eq: email } },
          ],
        },
      );
      if (match) {
        throw Error(
          "This contact " + email + " owner " + contactID +
            " already exists " +
            match,
        );
      } else {
        let collection = "emails";
        let value = email;
        return await addPE(collection, contactID, desc, type, status, value);
      }
    },
    addAddress: async (
      _: any,
      {
        input: {
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
      }: any,
      context: any,
      info: any,
    ) => {
      return await addAddress(
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
      );
    },
    updateEmail: async (
      _: any,
      { id, input: { desc, status } }: any,
      context: any,
      info: any,
    ) => {
      let collection = "emails";
      return await editPE(id, collection, status, desc);
    },
    updatePhone: async (
      _: any,
      { id, input: { desc, status } }: any,
      context: any,
      info: any,
    ) => {
      let collection = "phones";
      return await editPE(id, collection, status, desc);
    },
    updateAddress: async (
      _: any,
      { id, input: { desc, status } }: any,
      context: any,
      info: any,
    ) => {
      let collection = "address";
      return await editPE(id, collection, status, desc);
    },
  },
};
