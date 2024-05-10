import jsonwebtoken from 'jsonwebtoken';

import { TTokenHelper } from './TTokenHelper';

import tokenConfig from '../../config/token';

export default class JWTHelper implements TTokenHelper {
  generateToken(data: string | object) {
    return jsonwebtoken.sign(data, tokenConfig.secret, tokenConfig.options);
  }

  decode<T = unknown>(token: string) {
    return jsonwebtoken.verify(token, tokenConfig.secret) as T;
  }

  validate(token: string) {
    let isValid = true;

    try {
      jsonwebtoken.verify(token, tokenConfig.secret);
    } catch {
      isValid = false;
    }

    return isValid;
  }
}
