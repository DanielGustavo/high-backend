import { Router } from 'express';

import helloWorldRouter from './helloworld.route';

const router = Router();

router.use(helloWorldRouter);

export default router;
