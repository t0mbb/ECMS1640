import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const contribution = new mongoose.Schema(
  {
    event_id : {
      type : ObjectId,
      ref : "event"
    },
    filepath: {
        type: String,
    },
    fileSize: {
        type : Number,

    },
    fileName:{
        type : String, 
    },
    UploadDate:{
        type : Date,
    },
    content :{
        type : String,
    },
    account_id : {
      type : ObjectId,
      ref : "account"
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('contribution', contribution);



