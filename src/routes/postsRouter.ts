import { Router } from 'express';

import postsController from '../controllers/postsController';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorizationMiddleware';

const router = Router();

router.get('/posts/:postId', postsController.findOne);
router.get('/posts', postsController.list);

router.post('/posts', ensureAuthorizationMiddleware, postsController.create);
router.delete(
  '/posts/:postId',
  ensureAuthorizationMiddleware,
  postsController.delete
);
router.put(
  '/posts/:postId',
  ensureAuthorizationMiddleware,
  postsController.update
);

export default router;
