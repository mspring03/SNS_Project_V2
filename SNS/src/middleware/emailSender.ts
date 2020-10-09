// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');
import { NextFunction } from 'express';
import { NotFoundError } from '../core/apiError';
import Logger from '../core/Logger';

let transporter = nodemailer.createTransport({
  service: 'naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
    user: 'mspringmspring@naver.com', // gmail 계정 아이디를 입력
    pass: '@@aa030517', // gmail 계정의 비밀번호를 입력
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sender = (mailOptions: object) => {
  transporter.sendMail(mailOptions, function (error: Error) {
    console.log(error.message);

    if (error) return error;
    Logger.info('Email sent');
  });
};

export default sender;
