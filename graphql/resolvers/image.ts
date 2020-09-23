import { res, y, newImage, editImage } from "../controller/index.ts";
import { images } from "../../config/data.ts";

export const ImageResolvers = {
  Query: {
    allImages: async () => {
      const lists = await images.find();
      return lists.map((list: any) => {
        const {
          _id: { $oid: _id },
        } = list;
        list.id = _id;
        return list;
      });
    },
    findImages: async (_: any, { filter }: any, context: any, info: any) => {
      const lists = await images.find({
        $or: [
          { imageType: { $regex: filter } },
          { owner: { $regex: filter } },
          { collection: { $regex: filter } },
          { filename: { $regex: filter } },
          { title: { $regex: filter } },
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

    getImage: async (_: any, { id }: any, context: any, info: any) => {
      const list = await images.findOne({ _id: { $oid: id } });
      return { ...list, _id: { $oid: id } };
    },
  },
  Mutation: {
    addImage: async (
      _: any,
      {
        input: {
          imageType,
          collection,
          owner,
          title,
          filename,
          filetype,
          filesize,
          filepath,
          dateCreated,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      const x = { filepath };

      const match = await images.count({ filepath: { $eq: x.filepath } });
      if (match) {
        throw Error(
          "This image " + x.filepath + " already exists " +
            match + "",
        );
      } else {
        dateCreated = y;
        return await newImage(
          imageType,
          collection,
          owner,
          title,
          filename,
          filetype,
          filesize,
          filepath,
          dateCreated,
        );
      }
    },
    updateImage: async (
      _: any,
      {
        id,
        input: {
          title,
          filename,
          filetype,
          filesize,
          filepath,
          dateModified,
        },
      }: any,
      context: any,
      info: any,
    ) => {
      dateModified = y;
      return await editImage(
        id,
        title,
        filename,
        filetype,
        filesize,
        filepath,
        dateModified,
      );
    },
  },
};
