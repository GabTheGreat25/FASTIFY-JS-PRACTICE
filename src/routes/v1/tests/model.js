import { Schema, model } from "mongoose";
import { RESOURCE } from "../../../constants/index.js";

const schemaOptions = {
  timestamps: true,
};

const schema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    // image: [
    //   {
    //     public_id: String,
    //     url: String,
    //     originalname: String,
    //   },
    // ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  schemaOptions
);

export default model(RESOURCE.TEST, schema);
