import bcrypt from 'bcryptjs';

import { THashHelper } from './THashHelper';

export default class BcryptHelper implements THashHelper {
  async hash(content: string, salt: number | string) {
    return bcrypt.hash(content, salt);
  }

  async compare(content: string, hash: string) {
    return bcrypt.compare(content, hash);
  }
}
