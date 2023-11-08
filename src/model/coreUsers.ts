import mongoose, { Schema } from "mongoose";
import { Role } from "../util/util";
import { ICoreUsersDocument } from "../Interfaces/model";

const CoreUsersModal: Schema<ICoreUsersDocument> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    nin: { type: Number, required: true, trim: true, unique: true },
    dob: { type: String, required: true },
    role: {
      type: String,
      enum: Role,
      default: Role[0],
      trim: true,
    },
  },
  { timestamps: true, discriminatorKey: "identity" }
);

export const coreModal = mongoose.model("CoreUsersModal", CoreUsersModal);
