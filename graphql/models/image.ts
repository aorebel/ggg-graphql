import { gql } from "../../config/deps.ts";

export const ImageType = (gql as any)`
  extend type Query {
    allImages: [Image!]!
    getImage(id: ID!): Image
    findImages(filter: String!): [Image!]!
  }

  type Image {
    id: ID!
    imageType: String!
    collection: String!
    owner: String!
    title: String
    filename: String!
    filetype: String
    filesize: String
    filepath: String!
    dateCreated: String
    dateModified: String
  }

  input ImageInput {
    imageType: String!
    owner: String!
    title: String
    filename: String!
    filetype: String
    filesize: String
    filepath: String!    
    dateCreated: String
  }
  
  input ImageEdit {
    title: String
    filename: String
    filetype: String
    filesize: String
    filepath: String
    dateModified: String
  }

  extend type Mutation {
    addImage(input: ImageInput): Image!
    updateImage(id: String, input: ImageEdit): Image
  }
`;
