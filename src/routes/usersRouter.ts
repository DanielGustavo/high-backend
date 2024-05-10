import { Router } from 'express';

import usersController from '../controllers/usersController';

const router = Router();

router.post('/signup', usersController.register);
router.post('/signin', usersController.authenticate);

export default router;
