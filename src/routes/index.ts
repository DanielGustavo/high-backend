import { Router } from 'express';

import usersRouter from './usersRouter';
import postsRouter from './postsRouter';

const router = Router();

router.use(usersRouter);
router.use(postsRouter);

export default router;
