import { Router } from 'express';

import { createCatchController, deleteCatchController, getCatchController, listCatchesController, updateCatchController } from '../controllers/catches.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { catchSchema, idParamSchema } from '../lib/validators.js';
import { validateBody, validateParams } from '../middleware/validate.js';

const router = Router();

router.use(authenticate);

router.post('/', validateBody(catchSchema), createCatchController);
router.get('/', listCatchesController);
router.get('/:id', validateParams(idParamSchema), getCatchController);
router.put('/:id', validateParams(idParamSchema), validateBody(catchSchema), updateCatchController);
router.delete('/:id', validateParams(idParamSchema), deleteCatchController);

export default router;