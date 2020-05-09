import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import * as homeController from '@/controllers/home';
import swaggerDocument from '../../swagger.json';

const router = Router();

router.get('/', homeController.index);

router.get('/health', homeController.healthCheck);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

export default router;
