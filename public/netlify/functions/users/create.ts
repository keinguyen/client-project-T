import { fql } from 'fauna';
import { IResponse } from '../helpers/request';
import { getDb, isValidParams } from '../helpers/server';
import { hashPassword } from '../helpers/security';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidBody(body: any): body is { username: string; password: string; role: string } {
  if (
    !isValidParams(body.username)
    ||!isValidParams(body.password)
    ||!isValidParams(body.role)
  ) {
    return false;
  }

  return true;
}

export async function create(req: Request): Promise<IResponse> {
  try {
    const db = getDb();
    const body = await req.json();

    if (!isValidBody(body)) {
      return {
        data: { error: 'INVALID_BODY' },
        status: 400,
      };
    }

    const { username, password, role } = body;

    const { data } = await db.query(fql`Users.firstWhere(.username == ${username})`);

    if (data) {
      return {
        data: { error: 'EXISTED_USER' },
        status: 502,
      };
    }

    const hashedPassword = hashPassword(password);

    await db.query(fql`
      Users.create({ username: ${username}, password: ${hashedPassword}, role: ${role} })
    `);

    return {
      data: { message: 'CREATE USER SUCCESS' },
    };
  } catch (err) {
    console.log('CREATE USER ERROR:', err.message);

    return {
      data: { error: 'SERVER_ERROR', message: err.message },
      status: 500,
    };
  }
}
