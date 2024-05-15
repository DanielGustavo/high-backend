import { Request } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_: Request, __: Express.Multer.File, cb: CallableFunction) => {
    const dest = path.resolve(__dirname, '..', '..', 'static', 'uploads');

    fs.mkdir(dest, { recursive: true }, () => {
      cb(null, dest);
    });
  },
  filename: (_: Request, file: Express.Multer.File, cb: CallableFunction) => {
    const originalFilename = file.originalname.split(' ').join('');
    const randomHash = crypto.randomBytes(16).toString('hex');

    const filename = randomHash + originalFilename;

    cb(null, filename);
  },
});

export { storage };
