import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { Errors } from './error';
import { error } from './index';

export async function decodeJwt(token: string, secret: string) {
  try {
    return await jwt.verify(token, secret);
  } catch (err) {
    const code = err.name === 'TokenExpiredError' ? Errors.TokenExpired : Errors.TokenInvalid;
    const msg = err.name === 'TokenExpiredError' ? 'Token expired' : 'Token invalid';
    throw error(code, msg, {});
  }
}

export async function tokenValidate(r, token: string) {
  const data = await decodeJwt(token, config.auth.jwt.accessSecretKey);

  return { isValid: true, credentials: { id: data.id }, artifacts: { token } };
}
