import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

export function hashPassword(pw: string) {
  return crypto.pbkdf2Sync(pw, 'Salt-key', 1000, 64, 'sha512').toString('hex');
}

export function createToken(userId: string, isRefresh?: boolean) {
  const expiresIn = isRefresh ? '1d' : '8h';
  const secret = isRefresh ? 'secret-refresh-token-jwt' : 'secret-token-jwt';

  return jwt.sign({ userId }, secret, {
    expiresIn,
  });
}
