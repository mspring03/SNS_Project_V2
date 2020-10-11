import express, { Request, Response } from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import validator from '../../middleware/validator';
import schema from '../../schema/access';
import asyncHandler from '../../middleware/asyncHandler';
import UserRepo from '../../database/repository/UserRepo';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { getCustomRepository } from 'typeorm';
import sender from '../../middleware/emailSender';
import { hostAddress } from '../../config';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import LoginKeyRepo from '../../database/repository/loginKeyRepo';

const router = express.Router();

router.post(
  '/basic',
  validator(schema.signup),
  asyncHandler(async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepo);
    const loginKeyRepo = getCustomRepository(LoginKeyRepo);
    const user = await userRepo.findByEmail(req.body.email);

    if (user) throw new BadRequestError('User already registered');

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const loginAccessKey = crypto.randomBytes(17).toString('hex');

    const url = `<div style="width: 1100px; height: 50px; background-color: #99ccff;"><a style="text-align: center" href="${hostAddress}/v2/signupCallback/basic?email=${req.body.email}&password=${passwordHash}&nickname=${req.body.nickname}">${hostAddress}/v2/signupCallback/basic?email=${req.body.email}&password=${passwordHash}&nickname=${req.body.nickname}&key=${loginAccessKey}</a></div>`;
    const mailOptions = {
      from: 'aespringaa@gmail.com',
      to: req.body.email,
      subject: 'E-mail confirmation url',
      html: url,
    };

    const errorMessage: string = await sender(mailOptions);
    if (errorMessage) throw new NotFoundError(errorMessage);

    await loginKeyRepo.createKey(loginAccessKey);

    new SuccessResponse('send Successful', {
      message: 'Send mail',
    }).send(res);
  }),
);

export default router;
