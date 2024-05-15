import { Request, Router } from 'express';
import multer from 'multer';

import postsController from '../controllers/postsController';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorizationMiddleware';

import { storage } from '../config/multer';
import AppError from '../shared/errors/AppError';

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
router.put(
  '/posts/:postId/thumbnail',
  ensureAuthorizationMiddleware,
  multer({
    storage: storage,
    fileFilter: (
      _: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      const mimetypeRegex = /image\/(png|jpg|jpeg)/i;

      if (mimetypeRegex.test(file.mimetype)) {
        cb(null, true);
        return;
      }

      cb(
        new AppError(400, 'Thumbnail must be an image: jpg, jpeg or png') as any
      );
    },
  }).single('thumbnail'),
  postsController.changeThumbnail
);

export default router;
