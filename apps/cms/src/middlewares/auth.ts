import jwt from 'jsonwebtoken';
import { PopolatedAccount } from '../models/account.model';
import { RoleName } from '../models/role.model';

class JwtError extends Error {
  status: number;
}

export function verifyToken(req, _res, next) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken || !bearerToken.startsWith('Bearer')) {
    const error =  new JwtError('Jwt error');
    error.status = 401;
    throw error;
  }
  
  const userAccessToken = bearerToken.split('Bearer ')[1];
  const userData : any = jwt.verify(userAccessToken, process.env.JWT_SECRET);
  req.user = userData.userAccount;

  return next();
}

export function authorization(allowRole: RoleName[]) {
  return function(req, res, next) {
    const userData: PopolatedAccount = req.user;
    if (!allowRole.includes(userData.role_id.name as RoleName)) {
      const error =  new JwtError('Unauthorized');
      error.status = 401;
      throw error;
    }

    return next();
  }
}
