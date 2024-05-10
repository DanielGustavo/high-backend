import jsonwebtoken from 'jsonwebtoken';

import { TTokenHelper } from './TTokenHelper';

import tokenConfig from '../../config/token';

export default class JWTHelper implements TTokenHelper {
  generateToken(data: string | object) {
    return jsonwebtoken.sign(data, tokenConfig.secret, tokenConfig.options);
  }
}
