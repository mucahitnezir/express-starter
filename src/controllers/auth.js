import createError from 'http-errors';

import db from '../database';

/**
 * POST /auth/login
 * Login request
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email address
    const user = await db.models.user.findOne({ where: { email } });
    if (!user) {
      return next(createError(400, 'There is no user with this email address!'));
    }

    // Check user password
    if (!user.validatePassword(password)) {
      return next(createError(400, 'Incorrect password!'));
    }

    // Generate and return token
    const token = user.generateToken();
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

/**
 * POST /auth/register
 * Register request
 */
export const register = async (req, res, next) => {
  try {
    // Create user
    const user = await db.models.user
      .create(req.body, {
        fields: ['firstName', 'lastName', 'email', 'password'],
      });

    // Generate and return token
    const token = user.generateToken();
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /auth/me
 * Get current user
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await db.models.user
      .findByPk(id, {
        attributes: {
          exclude: ['password'],
        },
      });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
