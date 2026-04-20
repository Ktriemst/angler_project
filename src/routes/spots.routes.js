import { Router } from 'express';

import { createSpotController, deleteSpotController, getSpotController, listSpotsController, updateSpotController } from '../controllers/spots.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { idParamSchema, spotSchema } from '../lib/validators.js';
import { validateBody, validateParams } from '../middleware/validate.js';

const router = Router();

router.use(authenticate);

router.post('/', validateBody(spotSchema), createSpotController);
router.get('/', listSpotsController);
router.get('/:id', validateParams(idParamSchema), getSpotController);
router.put('/:id', validateParams(idParamSchema), validateBody(spotSchema), updateSpotController);
router.delete('/:id', validateParams(idParamSchema), deleteSpotController);

export default router;