import { Router } from 'express';

import postsController from '../controllers/postsController';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorizationMiddleware';

const router = Router();

router.get('/posts/:postId', postsController.findOne);

router.use(ensureAuthorizationMiddleware);

router.post('/posts', postsController.create);
router.delete('/posts/:postId', postsController.delete);
router.put('/posts/:postId', postsController.update);

export default router;
