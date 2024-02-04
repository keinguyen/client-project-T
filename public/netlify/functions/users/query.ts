import { fql } from "fauna";
import jwt from "jsonwebtoken";
import { allowCORS, getDb, getTokenSecret, hashPassword, isValidParams } from "./helpers";
import { IUserResponse } from "./interface";

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

export async function query(req: Request) {
  try {
    console.log('get');
    const db = getDb();

    // const body = await req.q
    const url = new URL(req.url);
    console.log(url.searchParams);

    const body = {
      username: url.searchParams.get('username'),
      password: url.searchParams.get('password'),
    };


    if (!isValidBody(body)) {
      return new Response(JSON.stringify({ error: "INVALID_BODY" }), {
        headers: allowCORS(),
        status: 400,
      });
    }

    const { username, password } = body;

    const { data } = await db.query<IUserResponse | null>(fql`Users.firstWhere(.username == ${username})`);

    if (!data || hashPassword(password) !== data.password) {
      return new Response(JSON.stringify({ error: "INVALID_USER_QUERY" }), {
        headers: allowCORS(),
        status: 502,
      });
    }

    const accessToken = jwt.sign({ userId: data.username }, getTokenSecret(), {
      expiresIn: '8h',
    });

    const refreshToken = jwt.sign({ userId: data.username }, getTokenSecret(), {
      expiresIn: '1d',
    });

    return new Response(
      JSON.stringify({
        accessToken,
        refreshToken,
        username: data.username,
        role: data.role,
      }), {
        headers: allowCORS(),
      },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "SERVER_ERROR", message: err }), {
      headers: allowCORS(),
      status: 500,
    });
  }
}
