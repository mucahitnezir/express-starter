import db from '@/database';
import { tokenHelper } from '@/helpers';

export default async function (req, res, next) {
  // Get authorization header from request
  const { authorization, refreshtoken: refreshToken } = req.headers;

  // Firstly, set request user to null
  req.user = null;

  if (authorization) {
    // Make sure the token is bearer token
    const isBearerToken = authorization.startsWith('Bearer ');

    // Decode token - verifies secret and checks exp
    if (isBearerToken) {
      const token = authorization.slice(7, authorization.length);

      try {
        // Verify token and get token data
        const tokenData = await tokenHelper.verifyToken(token);

        // Find user from database
        const user = await db.models.user.findByPk(tokenData.id);
        if (!user) {
          return next({ status: 401, message: 'There is no user' });
        }

        // Set request user
        req.user = user;

        // Check if the token renewal time is coming
        const now = new Date();
        const exp = new Date(tokenData.exp * 1000);
        const difference = exp.getTime() - now.getTime();
        const minutes = Math.round(difference / 60000);

        if (refreshToken && minutes < 15) {
          // Verify refresh token and get refresh token data
          const refreshTokenData = await tokenHelper.verifyToken(refreshToken);
          // Check the user of refresh token
          if (refreshTokenData.id === tokenData.id) {
            // Generate new tokens
            const newToken = user.generateToken();
            const newRefreshToken = user.generateToken('2h');
            // Set response headers
            res.setHeader('Token', newToken);
            res.setHeader('RefreshToken', newRefreshToken);
          }
        }
      } catch (err) {
        return next({ status: 401, ...err });
      }
    }
  }

  // Go to next middleware
  return next();
}
