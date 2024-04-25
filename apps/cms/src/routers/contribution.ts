import express from 'express';
import { createContribution, deleteContribution, downloadFile , findContribution, listContribution, updateContribution, uploadFile } from '../controllers/contribution.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/role.model';
import multer from 'multer';

const router = express.Router();
//multer se handle form data de upload file
const upload = multer();


router.post(
  '/con/createCon',
  verifyToken ,
  upload.single('file'), authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
    ,RoleName.MARKETING_COORDINATOR ,RoleName.STUDENT]),
  createContribution
);

router.post(
  '/con/uploadFileOnly',
  verifyToken ,authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
    ,RoleName.MARKETING_COORDINATOR ,RoleName.STUDENT]),
  upload.single('file'),
  uploadFile
);

router.post('/con/downloadFile/:fileName', verifyToken, authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
  ,RoleName.MARKETING_COORDINATOR ,RoleName.STUDENT]),downloadFile);

router.get('/con/listCon/:event_Id', verifyToken, authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
  ,RoleName.MARKETING_COORDINATOR ,RoleName.STUDENT]), listContribution);
router.get('/con/find/:conId', verifyToken, authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
  ,RoleName.MARKETING_COORDINATOR ,RoleName.STUDENT]), findContribution);

router.put('/con/updateContribution/:conId' , verifyToken ,authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
  ,RoleName.MARKETING_COORDINATOR ,RoleName.STUDENT]) , 
upload.single('file'), updateContribution);

router.delete('/con/delete/:conId' , verifyToken , authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
  ,RoleName.MARKETING_COORDINATOR ,RoleName.STUDENT]),
 deleteContribution)
export default router;
