import jsonwebtoken from 'jsonwebtoken';

import { TTokenHelper } from './TTokenHelper';

export default class JWTHelper implements TTokenHelper {
  constructor(secret: string, options: jsonwebtoken.SignOptions) {
    this.secret = secret;
    this.options = options;
  }

  private secret: string;
  private options: jsonwebtoken.SignOptions;

  generateToken(data: string | object) {
    return jsonwebtoken.sign(data, this.secret, this.options);
  }

  decode<T = unknown>(token: string, hasBearer = false) {
    let finalToken = token;

    if (hasBearer) {
      finalToken = finalToken.split('Bearer ')[1];
    }

    return jsonwebtoken.verify(finalToken, this.secret) as T;
  }

  validate(token: string) {
    let isValid = true;

    try {
      jsonwebtoken.verify(token, this.secret);
    } catch {
      isValid = false;
    }

    return isValid;
  }
}
