import JWTHelper from '../TokenHelper/JWTHelper';

import token from '../../config/token';

export function makeJWTHelper() {
  return new JWTHelper(token.secret, token.options);
}
