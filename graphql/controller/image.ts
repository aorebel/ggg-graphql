import { res } from "./index.ts";
import { images } from "../../config/data.ts";

export const newImage = async (
  imageType: any,
  collection: any,
  owner: any,
  title: any,
  filename: any,
  filetype: any,
  filesize: any,
  filepath: any,
  dateCreated: any,
) => {
  const { $oid: id } = await images.insertOne({
    imageType,
    collection,
    owner,
    title,
    filename,
    filetype,
    filesize,
    filepath,
    dateCreated,
  });
  const list = await images.findOne({ _id: { $oid: id } });
  if (list) {
    return { ...list, id: list._id.$oid };
  } else {
    return false;
  }
};

export const editImage = async (
  id: any,
  title: any,
  filename: any,
  filetype: any,
  filesize: any,
  filepath: any,
  dateModified: any,
) => {
  const lists = await images.updateOne(
    {
      _id: { $oid: id },
    },
    {
      $set: {
        title: title,
        filename: filename,
        filetype: filetype,
        filesize: filesize,
        filepath: filepath,
        dateModified: dateModified,
      },
    },
  );
  const list = await images.findOne({ _id: { $oid: id } });
  if (list) {
    return { ...list, id: list._id.$oid };
  } else {
    return false;
  }
};
