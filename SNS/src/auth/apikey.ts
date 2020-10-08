import express from 'express';
import { ForbiddenError } from '../core/ApiError';
import { PublicRequest } from 'app-request';
import schema from '../schema/auth';
import validator, { ValidationSource } from '../middleware/validator';
import asyncHandler from '../middleware/asyncHandler';
import { apiKey } from '../config';
import Logger from '../core/Logger';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, res, next) => {
    req.apiKey = req.headers['x-api-key'].toString();

    if (req.apiKey !== apiKey) throw new ForbiddenError();
    Logger.info(apiKey);

    return next();
  }),
);
