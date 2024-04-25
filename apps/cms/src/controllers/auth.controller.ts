import { Request, Response, NextFunction } from 'express';
import { findOneAccount } from '../service/account.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class LoginError extends Error {
  status: number;
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userAccount = await findOneAccount({ email });

    if (!userAccount) {
      const error = new LoginError('Invalid username or password');
      error.status = 401;
      throw error;
    }

    if (!bcrypt.compareSync(password, userAccount.password)) {
      const error = new LoginError('Invalid username or password');
      error.status = 401;
      throw error;
    }

    const accessToken = jwt.sign({ userAccount }, process.env.JWT_SECRET);

    return res.json({
      message: 'Login success',
      accessToken,
      userData: userAccount
    });
  } catch (err) {
    next(err);
  }
}
