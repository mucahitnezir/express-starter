import createError from 'http-errors';

import db from '@/database';

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
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return next(createError(400, 'Incorrect password!'));
    }

    // Generate and return token
    const token = user.generateToken();
    const refreshToken = user.generateToken('2h');
    return res.status(200).json({ token, refreshToken });
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

    // Generate and return tokens
    const token = user.generateToken();
    const refreshToken = user.generateToken('2h');
    res.status(201).json({ token, refreshToken });
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
    delete req.user.dataValues.password;
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /auth/me
 * Update current user
 */
export const updateCurrentUser = async (req, res, next) => {
  try {
    await req.user.update(req.body, {
      fields: ['firstName', 'lastName', 'email'],
    });
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /auth/me
 * Delete current user
 */
export const deleteCurrentUser = async (req, res, next) => {
  try {
    await req.user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /auth/me/password
 * Update password of current user
 */
export const updatePassword = async (req, res, next) => {
  try {
    const { current, password } = req.body;

    // Check user password
    const isValidPassword = await req.user.validatePassword(current);
    if (!isValidPassword) {
      return next(createError(400, 'Incorrect password!'));
    }

    // Update password
    req.user.password = password;
    await req.user.save();

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};
