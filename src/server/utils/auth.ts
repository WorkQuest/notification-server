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

  return {
    isValid: true,
    credentials: { sessionId: data.id, id: data.userId, auth: true },
    artifacts: { token },
  };
}

export function dualAuthScheme() {
  return {
    authenticate: async function (r, h) {
      const token: string = r.headers.Authorization
        ? r.headers.Authorization
        : r.headers.authorization;

      const isAuthorized = token !== null;

      if (isAuthorized) {
        const credentials = await tokenValidate(r, token.split(' ')[1]);

        return h.authenticated(credentials);
      }

      return h.authenticated({ credentials: { auth: false } });
    },
  };
}
