import { create } from "./create";
import { query } from "./query";

export default async (req: Request) => {
  if (req.method === "GET") {
    return await query(req);
  } else if (req.method === "POST") {
    return await create(req);
  }

  return new Response(JSON.stringify({ error: "NO_VALID_METHOD" }))
}
