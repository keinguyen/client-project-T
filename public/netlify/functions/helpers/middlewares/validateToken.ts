import { HandleMiddleware } from "../../interfaces";
import { getAuthorization, response } from "../request";
import { verifyToken } from "../security";

export const validateToken: HandleMiddleware = async (req) => {
  const valid = verifyToken(getAuthorization(req));

  if (valid) {
    return true;
  }

  return response({
    data: { error: 'INVALID_TOKEN' },
    status: 401,
  });
}
