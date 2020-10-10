import nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer');
import { NextFunction } from 'express';
import { NotFoundError } from '../core/apiError';
import Logger from '../core/Logger';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aespringaa@gmail.com', // gmail 계정 아이디를 입력
    pass: 'bazvzoqopkodfhxo', // gmail 계정의 비밀번호를 입력
  },
});

const sender = (mailOptions: object): string => {
  transporter.sendMail(mailOptions, function (error: Error) {
    if (error) return error.message;
    Logger.info('Email sent');
  });
  return '';
};

export default sender;
