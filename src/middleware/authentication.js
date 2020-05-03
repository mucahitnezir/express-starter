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
        req.user = await tokenHelper.verifyToken(token);
      } catch (err) {
        return next({ status: 401, ...err });
      }
    }
  }

  // Go to next middleware
  return next();
}
