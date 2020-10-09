import express, { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import validator from '../../middleware/validator';
import schema from '../../schema/access';
import asyncHandler from '../../middleware/asyncHandler';
import UserRepo from '../../database/repository/UserRepo';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { getCustomRepository } from 'typeorm';
import sender from '../../middleware/emailSender';
import {
  BadRequestError,
  AuthFailureError,
  NotFoundError,
} from '../../core/ApiError';

const router = express.Router();

router.post(
  '/signup',
  validator(schema.signup),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = getCustomRepository(UserRepo);
    const user = await userRepo.findByEmail(req.body.email);

    if (user) throw new BadRequestError('User already registered');

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const mailOptions = {
      from: 'mspringmspring@naver.com',
      to: req.body.email,
      subject: 'E-mail confirmation url',
      text: 'ddd',
      html: `<div style="width: 100px; height: 10px; border: 1 solid #99ccff;"><a href="170.0.0.1:80/?email=${req.body.email}&password=${passwordHash}&nickname=${req.body.nickname}"></a></div>`, // 내용
    };

    const errorMessage = await sender(mailOptions);
    console.log(errorMessage);

    // throw new NotFoundError(errorMessage);

    // const createdUser: User = await userRepo.createUser(
    //   req.body.email,
    //   passwordHash,
    //   req.body.nickname,
    // );

    new SuccessResponse('send Successful', {
      // user: _.pick(createdUser, ['_id', 'email', 'nickname']),
      message: 'Send mail',
    }).send(res);
  }),
);

export default router;
