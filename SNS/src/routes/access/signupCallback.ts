import express, { Request, Response, Router } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { getCustomRepository } from 'typeorm';
import { User } from '../../database/model/User';
import _ from 'lodash';
import url from 'url';

const router = express.Router();

router.use(
  '/basic',
  asyncHandler(async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepo);
    const queryData = url.parse(req.url, true).query;

    const createdUser: User = await userRepo.createUser(
      String(queryData.email),
      String(queryData.password),
      String(queryData.nickname),
    );

    await new SuccessResponse('create Successful', {
      user: _.pick(createdUser, ['_id', 'email', 'nickname']),
    }).send(res);
  }),
);

export default router;
