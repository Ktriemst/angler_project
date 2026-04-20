import { Router } from 'express';

import { createTripController, deleteTripController, getTripController, listTripsController, updateTripController } from '../controllers/trips.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { idParamSchema, tripSchema } from '../lib/validators.js';
import { validateBody, validateParams } from '../middleware/validate.js';

const router = Router();

router.use(authenticate);

router.post('/', validateBody(tripSchema), createTripController);
router.get('/', listTripsController);
router.get('/:id', validateParams(idParamSchema), getTripController);
router.put('/:id', validateParams(idParamSchema), validateBody(tripSchema), updateTripController);
router.delete('/:id', validateParams(idParamSchema), deleteTripController);

export default router;