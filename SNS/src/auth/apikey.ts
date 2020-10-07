import express from 'express';
import { ForbiddenError } from '../core/ApiError';
import { PublicRequest } from 'app-request';
import schema from '../schema/auth';
import validator, { ValidationSource } from '../middleware/validator';
import asyncHandler from '../middleware/asyncHandler';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, res, next) => {
    req.apiKey = req.headers['x-api-key'].toString();

    // const apiKey = await ApiKeyRepo.findByKey(req.apiKey);
    // console.log(req.apikey);

    if (!req.apiKey) throw new ForbiddenError();
    return next();
  }),
);
