import mongoose, { InferSchemaType, } from 'mongoose';
import { Role } from './role.model';

const { ObjectId } = mongoose.Schema;

const account = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    role_id: {
      type: ObjectId,
      ref: 'role',
      required: true,
    },
    fullname: {
      type: String,
      maxLength: 32,
      required: true,
    },
    dob: {
      type: Date,
    },
    address: {
      type: String,
      maxLength: 255,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    faculty_id:{
      type: ObjectId,
      ref: 'faculty',
    },
  },
  {
    timestamps: true,
  }
);

export type Account = InferSchemaType<typeof account>;
// ROLE ID tu db sang la type string , khi populate vao bang se khong bi o dang string
export interface PopolatedAccount extends Omit<Account, 'role_id'> {
  role_id: Role,
}

export default mongoose.model('account', account);
