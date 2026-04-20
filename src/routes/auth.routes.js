import { Router } from 'express';

import { loginController, signupController } from '../controllers/auth.controller.js';
import { loginSchema, signupSchema } from '../lib/validators.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.post('/signup', validateBody(signupSchema), signupController);
router.post('/login', validateBody(loginSchema), loginController);

export default router;