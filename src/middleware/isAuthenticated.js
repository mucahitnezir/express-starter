import createError from 'http-errors';

export default async function (req, res, next) {
  if (!req.user) {
    const error = createError(401, 'Not authenticated!');
    return next(error);
  }
  return next();
}
