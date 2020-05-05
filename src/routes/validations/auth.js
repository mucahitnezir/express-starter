import { body } from 'express-validator';

export const loginRules = [
  body('email').isEmail().exists(),
  body('password').exists(),
];

export const registerRules = [
  body('firstName').exists(),
  body('lastName').exists(),
  body('email').isEmail().exists(),
  body('password').isLength({ min: 6 }).exists(),
];

export const updateProfileRules = [
  body('firstName').optional(),
  body('lastName').optional(),
  body('email').isEmail().optional(),
];

export const changePasswordRules = [
  body('current').exists(),
  body('password').isLength({ min: 6 }).exists(),
];
