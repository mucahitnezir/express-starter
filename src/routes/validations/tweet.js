import { body } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const createTweetRules = [
  body('tweet').isLength({ max: 140 }).exists(),
];
