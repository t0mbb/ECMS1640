import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const event = new mongoose.Schema(
  {
    account_id:{
        type: ObjectId,
        ref:'account',
    },
    faculty_id:{
        type: ObjectId,
        ref:'faculty',
    },
    name : {
      type : String,
      unique : true
    },
    closure_date: {
        type: Date,
    },
    finalclosure_date: {
        type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('event', event);
