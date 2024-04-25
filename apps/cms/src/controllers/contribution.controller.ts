import {
  BlobSASPermissions,
  BlobSASSignatureValues,
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters
} from '@azure/storage-blob';

import contributionModel from '../models/contribution.model';
import archiver from 'archiver';
import accountModel from '../models/account.model';
import { RoleName } from '../models/role.model';
import { getRoleID } from '../service/account.service';
import { sendMail } from '../service/sendMail.service';
const account = process.env.account;
const accountKey = process.env.accountKey;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerName = process.env.containerName;
const containerZip = process.env.CONTAINERZIP;

export const createContribution = async (req, res, next) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const fileBuffer = req.file.buffer;
    const fileType = req.file.originalname.split('.').at(-1);
    const fileName = `${req.body.event_id}_${Date.now()}.${fileType}`;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(fileBuffer);

    const contribution = new contributionModel({
      event_id : req.body.event_id,
      filepath: blockBlobClient.url,
      fileSize: req.file.size,
      fileName: fileName,
      UploadDate: new Date(),
      content : req.body.content
    });
    await contribution.save();

    const roleID = await getRoleID(RoleName.MARKETING_COORDINATOR);
    const accountFound = await accountModel.findOne({role_id : roleID._id , faculty_id : req.user.faculty_id})

    await sendMail(accountFound.email);

    res.send('File uploaded successfully!');
  } catch (err) {
    next(err);
  }
};

export const uploadFile = async (req, res, next) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    console.log(req.file);
    const fileBuffer = req.file.buffer;
    const fileType = req.file.originalname.split('.').at(-1);
    const fileName = `${req.body.event_id}_${Date.now()}.${fileType}`;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(fileBuffer);
    res.send('File uploaded successfully!');
  } catch (err) {
    next(err);
  }
};

export const downloadFile = async (req, res, next) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    const blobClient = containerClient.getBlobClient(req.params.fileName);
    const download = await blobClient.downloadToBuffer();
    const archive = archiver('zip', {
      zlib: { level: 9 } 
    });
    archive.append(download, { name: req.params.fileName });
    archive.finalize();

    const time = `${Date.now()}.zip`
    const oneDayInMilliseconds = 24 * 3600 * 1000;
    const containerDownload = blobServiceClient.getContainerClient(containerZip);
    const zipClient = containerDownload.getBlockBlobClient(time);
    await zipClient.uploadStream(archive);
    const currentTime = new Date();

    const sasOptions: BlobSASSignatureValues = {
      containerName: containerZip,
      blobName: time,
      startsOn: currentTime,
      expiresOn: new Date(currentTime.valueOf() + oneDayInMilliseconds * 7),
      permissions: BlobSASPermissions.parse('r')
    };
    
    const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
    const blobSasUri = `${containerDownload.getBlockBlobClient(time).url}?${sasToken}`

    res.json(blobSasUri);
  } catch (err) {
    next(err);
  }
};

export const updateContribution = async (req, res, next) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
  
    const fileBuffer = req.file.buffer;
    const fileType = req.file.originalname.split('.').at(-1);
    const fileName = `${req.body.event_id}_${Date.now()}.${fileType}`;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(fileBuffer);

    await contributionModel.updateOne({_id : req.params.conId} ,{
      event_id : req.body.event_id,
      filepath: blockBlobClient.url,
      fileSize: req.file.size,
      fileName: fileName,
      UploadDate: new Date(),
      content : req.body.content
    });
    await blockBlobClient.uploadData(fileBuffer);
  
    res.send('File uploaded successfully!');
  } catch (err) {
    next(err);
  }
};
export const deleteContribution = async (req, res, next) => {
  try {
    await contributionModel.deleteOne({_id : req.params.conId});
    res.send('Delete contribution successfully!');
  } catch (err) {
    next(err);
  }
};


export const listContribution = async (req, res, next) => {
  try {
    const { event_Id } = req.params;
    const result = await contributionModel.find({ event_id: event_Id });
    res.json({
      Result: result,
      message: 'list Contribution successfully found',
    });
  } catch (error) {
    next(error);
  }
};

export const findContribution = async (req, res, next) => {
  try {
    const { conId } = req.params;
    const result = await contributionModel.findOne({ _id : conId });
     res.json({
      Result: result,
      message: 'list Contribution successfully found',
    });
  } catch (error) {
    next(error);
  }
};