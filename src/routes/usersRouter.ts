import { Request, Router } from 'express';
import multer from 'multer';

import usersController from '../controllers/usersController';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorizationMiddleware';

import { storage } from '../config/multer';
import AppError from '../shared/errors/AppError';

const router = Router();

router.post('/signup', usersController.register);
router.post('/signin', usersController.authenticate);

router.put(
  '/avatar',
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

      cb(new AppError(400, 'Avatar must be an image: jpg, jpeg or png') as any);
    },
  }).single('avatar'),
  usersController.changeAvatar
);

export default router;
