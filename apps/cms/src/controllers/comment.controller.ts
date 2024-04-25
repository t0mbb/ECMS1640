import commentModel from '../models/comment.model';
import * as _ from 'lodash';

export const listComment = async (req, res, next) => {
  try {
    const { comId }= req.params;
   
    const commentList = await commentModel.find({ contribution_id: comId}).populate('account_id').populate('contribution_id'); 
    console.log(commentList);
    console.log(commentModel.find({_id : comId}));
    return res.status(200).json({ commentlist : commentList });
  } catch (err) {
    next(err);
  }
};


export const createComment = async (req, res, next) => {
  try {
    const comment = new commentModel(req.body);
    await comment.save();

    return res.json({
      message: 'New Comment has been added',
    });
  } catch (err) {
    next(err);
  }
};

export const removeComment = async (req, res, next) => {
  try {
    const comId = req.params.comId;
    await commentModel.deleteOne({ _id: comId });
    return res.json({
      message: 'Delete Comment successfully',
    });
  } catch (err) {
    next(err);
  }
};