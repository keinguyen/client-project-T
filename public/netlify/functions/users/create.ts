import { fql } from "fauna";
import { allowCORS, getDb, hashPassword, isValidParams } from "./helpers";

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

export async function create(req: Request) {
  try {

    const db = getDb();

    const body = await req.json();

    if (!isValidBody(body)) {
      return new Response(JSON.stringify({ error: "INVALID_BODY" }), {
        headers: allowCORS(),
        status: 400,
      });
    }

    const { username, password, role } = body;

    const { data } = await db.query(fql`Users.firstWhere(.username == ${username})`);

    if (data) {
      return new Response(JSON.stringify({ error: "EXISTED_USER" }), {
        headers: allowCORS(),
        status: 502,
      });
    }

    const hashedPassword = hashPassword(password);

    await db.query(fql`
      Users.create({ username: ${username}, password: ${hashedPassword}, role: ${role} })
    `);

    return new Response("success", {
      headers: allowCORS(),
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "SERVER_ERROR", message: err }), {
      headers: allowCORS(),
      status: 500,
    });
  }
}
