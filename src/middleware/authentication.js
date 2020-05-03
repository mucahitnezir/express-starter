import db from '../database';
import { tokenHelper } from '../helpers';

export default async function (req, res, next) {
  // Get authorization header from request
  const { authorization } = req.headers;

  // Firstly, set request user to null
  req.user = null;

  if (authorization) {
    // Get token
    const token = authorization.split(' ')[1];

    // Decode token - verifies secret and checks exp
    if (token) {
      try {
        // Verify token data
        const tokenData = await tokenHelper.verifyToken(token);

        // Find user from database
        const user = await db.models.user
          .findByPk(tokenData.id, {
            attributes: { exclude: ['password'] },
          });
        if (!user) {
          return next({ status: 401, message: 'There is no user' });
        }

        // Set request user
        req.user = user;
      } catch (err) {
        return next({ status: 401, ...err });
      }
    }
  }

  // Go to next middleware
  return next();
}
