import express, { Request, Response } from 'express';
import validator from '../../middleware/validator';
import schema from '../../schema/access';
import asyncHandler from '../../middleware/asyncHandler';
import { BadRequestError, AuthFailureError } from '../../core/ApiError';
import UserRepo from '../../database/repository/UserRepo';

const router = express.Router();

router.post(
  'signup',
  validator(schema.signup),
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (!user) throw new BadRequestError('User already registered');
  }),
);
