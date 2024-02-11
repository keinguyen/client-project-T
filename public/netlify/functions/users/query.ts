import { fql } from 'fauna';
import { getDb, isValidParams } from '../helpers/server';
import { IUserResponse } from './interface';
import { createToken, hashPassword } from '../helpers/security';
import { IResponse } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidBody(body: any): body is { username: string; password: string } {
  if (
    !isValidParams(body.username)
    ||!isValidParams(body.password)
  ) {
    return false;
  }

  return true;
}

export async function query(req: Request): Promise<IResponse> {
  try {
    const db = getDb();
    const url = new URL(req.url);

    const body = {
      username: url.searchParams.get('username'),
      password: url.searchParams.get('password'),
    };

    if (!isValidBody(body)) {
      return {
        data: { error: 'INVALID_BODY' },
        status: 400,
      };
    }

    const { username, password } = body;

    const { data } = await db.query<IUserResponse | null>(fql`Users.firstWhere(.username == ${username})`);

    if (!data || hashPassword(password) !== data.password) {
      return {
        data: { error: 'INVALID_USER_QUERY' },
        status: 502,
      };
    }

    const tokenPayload = { userId: data.username, role: data.role };

    return {
      data: {
        accessToken: createToken(tokenPayload),
        refreshToken: createToken(tokenPayload, true),
        username: data.username,
        role: data.role,
      },
    };
  } catch (err) {
    console.log('QUERY USER ERROR:', err.message);

    return {
      data: { error: 'SERVER_ERROR', message: err.message },
      status: 500,
    };
  }
}
