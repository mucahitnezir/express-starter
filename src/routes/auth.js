import { Router } from 'express';

import * as authController from '../controllers/auth';
import { isAuthenticated } from '../middleware';

const router = Router();

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/me', isAuthenticated, authController.getCurrentUser);

export default router;
