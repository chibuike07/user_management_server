import { Schema } from "mongoose";
import { coreModal } from "./coreUsers";
import { IStudentDocument } from "../Interfaces/model";

const StudentMember: Schema<IStudentDocument> = new Schema(
  {
    code: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Student = coreModal.discriminator("student", StudentMember);
