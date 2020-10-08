import express from 'express';
import apikey from '../auth/apikey';
import signup from './access/signup';

const router = express.Router();

router.use('/', apikey);

router.use('/access', signup);

export default router;
