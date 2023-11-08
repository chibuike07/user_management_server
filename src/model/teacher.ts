import { Schema } from "mongoose";
import { ITeacherDocument } from "../Interfaces/model";
import { coreModal } from "./coreUsers";
import { TitleEnum } from "../util/util";

const TeacherMember: Schema<ITeacherDocument> = new Schema(
  {
    salary: { type: String, required: true, trim: true },
    title: { type: String, enum: TitleEnum, required: true, trim: true },
  },
  { timestamps: true }
);

export const Teacher = coreModal.discriminator("teacher", TeacherMember);
