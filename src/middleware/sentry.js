import { configureScope } from '@sentry/node';

export default function (req, res, next) {
  if (req.user) {
    configureScope((scope) => {
      scope.setUser({ id: req.user.id, email: req.user.email });
    });
  }
  next();
}
