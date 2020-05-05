import 'dotenv/config';

import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';

import routerConfig from './config/router';
import sentryConfig from './config/sentry';
import { authentication as authenticationMiddleware, sentry as sentryMiddleware } from './middleware';

const { NODE_ENV } = process.env;

const app = express();

// Initialize sentry
if (NODE_ENV !== 'development') {
  Sentry.init(sentryConfig);
  app.use(Sentry.Handlers.requestHandler());
}

// Required middleware list
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CORS_ALLOWED_ORIGIN, optionsSuccessStatus: 200 }));
app.use(cookieParser());

// Custom middleware list
app.use(authenticationMiddleware);
if (NODE_ENV !== 'development') {
  app.use(sentryMiddleware); // This should be loaded after authentication middleware.
}

// Load router paths
routerConfig(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Sentry error logging - error handler
if (NODE_ENV !== 'development') {
  app.use(Sentry.Handlers.errorHandler());
}

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json(err);
});

export default app;
