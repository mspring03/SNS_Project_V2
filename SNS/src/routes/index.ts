import express from 'express';
import apikey from '../auth/apikey';
import signup from './access/signup';
import signupCallback from './access/signupCallback';

const router = express.Router();

router.use('/', apikey);

router.use('/signup', signup);
router.use('/signupCallback', signupCallback);

export default router;
