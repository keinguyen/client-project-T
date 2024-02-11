import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

export function hashPassword(pw: string) {
  return crypto.pbkdf2Sync(pw, 'Salt-key', 1000, 64, 'sha512').toString('hex');
}

const getSecretKey = (isRefresh?: boolean) => (
  isRefresh ? 'secret-refresh-token-jwt' : 'secret-token-jwt'
);

interface TokenPayload  {
  userId: string;
  role: string;
}
export function createToken(payload: TokenPayload, isRefresh?: boolean) {
  const expiresIn = isRefresh ? '1d' : '8h';

  return jwt.sign(payload, getSecretKey(isRefresh), {
    expiresIn,
  });
}

export function verifyToken(token: string | null, isRefresh?: boolean) {
  try {
    if (!token) {
      throw Error('No token found');
    }

    const verify = jwt.verify(token, getSecretKey(isRefresh));

    if (!verify || typeof verify === 'string' || !verify.exp) {
      throw Error('No valid jwt');
    }

    return Date.now() < verify.exp * 10000;
  } catch (err) {
    return false;
  }
}

export function parseToken(token: string) {
  return jwt.decode(token);
}
