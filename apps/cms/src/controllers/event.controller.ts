import eventModel from '../models/event.model';
import { RoleName } from '../models/role.model';
import {getRoleID} from '../service/account.service';
import accountModel from '../models/account.model';
import * as _ from 'lodash';
import { sendMail } from '../service/sendMail.service';
export const listEvent = async (_req, res, next) => {
  try {
    const event = await eventModel.find();
    return res.status(200).json({ event });
  } catch (err) {
    next(err);
  }
};


export const createEvent = async (req, res, next) => {
  try {
    const currentDate = new Date(req.body.closure_date);
    currentDate.setDate(currentDate.getDate() + 14); 
    const closureDate = new Date(req.body.closure_date);
    const finalClosureDate = new Date(req.body.finalclosure_date);
    if (finalClosureDate <= closureDate) {
      return res.status(400).json({ error: 'Final closure date must be after the closure date' });
    }
    const event = new eventModel({
      account_id : req.user._id,
      faculty_id : req.body.faculty_id,
      closure_date : req.body.closure_date,
      finalclosure_date: req.body.finalclosure_date ?? currentDate,
      name: req.body.name
    });
    await event.save();
    return res.json({
      message: 'New Event has been added',
    });
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const event = req.body.values;
    const closureDate = new Date(req.body.values.closure_date);
    const finalClosureDate = new Date(req.body.values.finalclosure_date);
    if (finalClosureDate <= closureDate) {
      return res.status(400).json({ error: 'Final closure date must be after the closure date' });
    }
    await eventModel.updateOne({ _id: eventId }, event);


    return res.json({
      message: 'Update Event successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const removeEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    await eventModel.deleteOne({ _id: eventId });
    return res.json({
      message: 'Delete Event successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const findEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const result = await eventModel.findById({ _id: eventId });
    res.json({
      Result: result,
      message: 'Event successfully found',
    });
  } catch (error) {
    next(error);
  }
};

export const findEventbyFac = async (req, res, next) => {
  try {
    const { facId } = req.params;
    const result = await eventModel.find({ faculty_id: facId });
    res.json({
      Result: result,
      message: 'Event successfully found',
    });
  } catch (error) {
    next(error);
  }
};



