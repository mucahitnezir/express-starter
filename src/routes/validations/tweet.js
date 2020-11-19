import { body, query } from 'express-validator';

export const listTweetsRules = [
  query('page').optional().isInt().toInt(),
  query('perPage').optional().isInt().toInt(),
];

export const createTweetRules = [
  body('tweet').isLength({ max: 140 }).exists(),
];
