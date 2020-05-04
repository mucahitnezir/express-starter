import 'dotenv/config';

import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';

import routerConfig from './config/router';
import { authentication as authenticationMiddleware } from './middleware';

const app = express();

// Required middleware list
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CORS_ALLOWED_ORIGIN, optionsSuccessStatus: 200 }));
app.use(cookieParser());

// Custom middleware list
app.use(authenticationMiddleware);

// Load router paths
routerConfig(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json(err);
});

export default app;
