import mongoose, { InferSchemaType, ObjectId } from 'mongoose';

export enum RoleName {
  ADMIN = 'admin',
  MARKETING_MANAGER = 'marketing manager',
  MARKETING_COORDINATOR = 'marketing coordinator',
  STUDENT = 'student',
  GUEST = 'guest',
}
const role = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: RoleName,
      maxLength: 32,
      required: true,
      unique:true,
    },
  },
  {
    timestamps: true,
  }
);

export type Role = InferSchemaType<typeof role>;
export default mongoose.model('role', role);


