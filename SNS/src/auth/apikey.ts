import express from 'express';
import { ForbiddenError } from '../core/ApiError';
import { PublicRequest } from 'app-request';
import schema from '../schema/auth';
import validator, { ValidationSource } from '../middleware/validator';
import asyncHandler from '../middleware/asyncHandler';
import { apiKey } from '../config';
import Logger from '../core/Logger';
import LoginKeyRepository from '../database/repository/loginKeyRepo';
import { getCustomRepository } from 'typeorm';
import url from 'url';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, res, next) => {
    const loginKeyRepository = getCustomRepository(LoginKeyRepository);
    const queryData = url.parse(req.url, true).query;

    req.apiKey = req.headers['x-api-key'].toString();

    if (req.apiKey === apiKey) {
      Logger.info(apiKey);
      return next();
    }
    console.log(queryData.key);

    if (await loginKeyRepository.findKey(String(queryData.key))) {
      Logger.info(apiKey);
      return next();
    }

    throw new ForbiddenError();
  }),
);
