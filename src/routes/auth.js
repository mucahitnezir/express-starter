import { Router } from 'express';

import * as authController from '@/controllers/auth';
import * as authValidations from '@/routes/validations/auth';
import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.post('/login', validate(authValidations.loginRules), authController.login);

router.post('/register', validate(authValidations.registerRules), authController.register);

router.route('/me')
  .get(isAuthenticated, authController.getCurrentUser)
  .put(isAuthenticated, validate(authValidations.updateProfileRules), authController.updateCurrentUser)
  .delete(isAuthenticated, authController.deleteCurrentUser);

router.put('/me/password',
  isAuthenticated,
  validate(authValidations.changePasswordRules),
  authController.updatePassword);

export default router;
