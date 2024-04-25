import mongoose from 'mongoose';

const faculty = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 32,
      required: true,
      unique : true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('faculty', faculty);
