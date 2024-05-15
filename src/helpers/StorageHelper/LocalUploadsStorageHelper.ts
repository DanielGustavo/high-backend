import path from 'path';
import fs from 'fs';

import { TStorageHelper } from './TStorageHelper';

export default class LocalUploadsStorageHelper implements TStorageHelper {
  private dest = path.resolve(__dirname, '..', '..', '..', 'static', 'uploads');

  async removeFile(filename: string) {
    await new Promise((resolve, reject) => {
      const finalFilename = path.resolve(this.dest, filename);

      const exists = fs.existsSync(finalFilename);

      if (!exists) {
        resolve(true);
        return;
      }

      fs.unlink(finalFilename, (err) => {
        if (err) {
          reject(false);
          return;
        }

        resolve(true);
      });
    });
  }
}
