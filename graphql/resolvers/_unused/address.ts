import { ObjectId } from "../../config/deps.ts";
import { address } from "../../config/data.ts";

export const AddressResolvers = {
  Query: {
    getAddress: async (_: any, { id }: any, context: any, info: any) => {
      const addressID = ObjectId(id);
      const list = await address.findOne(addressID);
      return { ...list, addressID };
    },
  },
  Mutation: {
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
          long,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const { $oid: id } = await address.insertOne({
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
        long,
      });
      return {
        id,
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
        long,
      };
    },
    updateAddress: async (
      _: any,
      {
        id,
        input: {
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
          long,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const addressID = ObjectId(id);
      const lists = await address.updateOne(
        {
          addressID,
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
          long,
        },
        {
          $set: {
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
            long,
          },
        },
      );
      const list = await address.findOne(addressID);
      return { ...list, addressID };
    },
  },
};
