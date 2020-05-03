import { Router } from 'express';

import * as authController from '../controllers/auth';
import { isAuthenticated } from '../middleware';

const router = Router();

router.post('/login', authController.login);

router.post('/register', authController.register);

router.route('/me')
  .get(isAuthenticated, authController.getCurrentUser)
  .put(isAuthenticated, authController.updateCurrentUser)
  .delete(isAuthenticated, authController.deleteCurrentUser);

export default router;
