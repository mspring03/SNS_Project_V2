import express, { Request, Response } from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import validator from '../../middleware/validator';
import schema from '../../schema/access';
import asyncHandler from '../../middleware/asyncHandler';
import { BadRequestError, AuthFailureError } from '../../core/ApiError';
import UserRepo from '../../database/repository/UserRepo';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User } from '../../database/model/User';
import { getCustomRepository } from 'typeorm';

const router = express.Router();

router.post(
  '/signup',
  validator(schema.signup),
  asyncHandler(async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepo);
    const user = await userRepo.findByEmail(req.body.email);
    console.log(user);

    if (user) throw new BadRequestError('User already registered');

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const createdUser: User = await userRepo.createUser(
      req.body.email,
      passwordHash,
      req.body.nickname,
    );
    new SuccessResponse('Signup Successful', {
      user: _.pick(createdUser, ['_id', 'email', 'nickname']),
      message: 'Congratulations.',
    }).send(res);
  }),
);

export default router;
