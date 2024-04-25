import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const comment = new mongoose.Schema(
  {
    account_id:{
        type: ObjectId,
        ref:'account',
    },
    contribution_id: {
        type: ObjectId,
        ref:'contribution',
    },
    comment: {
        type: String,
        required: true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('comment', comment);
