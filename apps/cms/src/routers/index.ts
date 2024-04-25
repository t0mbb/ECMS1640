import express from 'express';
import {
  createUser,
  updateUser,
  removeAccount,
  listAccount,
  findAccount,
  listRole,
  checkToken,
} from '../controllers/account.controller';
import { login } from '../controllers/auth.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/role.model';


const router = express.Router();
// auth routes
router.post('/auth/login', login);
//

router.get('/getaccessToken' ,verifyToken, checkToken)

// user routes
router.get('/user/listAcc', verifyToken, authorization([RoleName.ADMIN]), listAccount);
router.get('/user/listRole', verifyToken, authorization([RoleName.ADMIN]), listRole);
router.post('/user/create',verifyToken,authorization([RoleName.ADMIN]), createUser);
router.get('/user/find/:userId', verifyToken, findAccount);
router.put('/user/update/:userId', verifyToken,authorization([RoleName.ADMIN]), updateUser);
router.delete('/user/delete/:userId', verifyToken,authorization([RoleName.ADMIN]), removeAccount);

export default router;
