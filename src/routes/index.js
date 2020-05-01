import { Router } from 'express';

import * as homeController from '../controllers/home';

const router = Router();

router.get('/', homeController.index);

router.get('/health', homeController.healthCheck);

export default router;
