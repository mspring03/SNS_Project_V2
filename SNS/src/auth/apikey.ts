import express from 'express';
import { ForbiddenError } from '../core/ApiError';
import { PublicRequest } from 'app-request';
import asyncHandler from '../middleware/asyncHandler';
import { apiKey } from '../config';
import Logger from '../core/Logger';
import LoginKeyRepository from '../database/repository/loginKeyRepo';
import { getCustomRepository } from 'typeorm';
import url from 'url';

const router = express.Router();

export default router.use(
  asyncHandler(async (req: PublicRequest, res, next) => {
    const loginKeyRepository = getCustomRepository(LoginKeyRepository);
    const queryData = url.parse(req.url, true).query;

    if (String(req.headers['x-api-key']) === apiKey) {
      Logger.info(apiKey);
      return next();
    }

    if (await loginKeyRepository.findKey(String(queryData.key))) {
      await loginKeyRepository.removeKey(String(queryData.key));
      return next();
    }

    throw new ForbiddenError();
  }),
);
