import { HandleMiddleware, IResponse } from "../interfaces";

export function getAuthorization(req: Request) {
  return req.headers.get('Authorization');
}

export function response(res: IResponse, contentType = 'application/json') {
  const data = contentType === 'application/json'
    ? JSON.stringify(res.data)
    : (res.data as BodyInit | null);

  return new Response(data, {
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    },
    status: res.status,
  })
}

type FinalMiddlewareAction = (req: Request) => Promise<Response>;
export function withMiddlewares(middlewares: HandleMiddleware[], action: FinalMiddlewareAction) {
  return async (req: Request) => {
    for (const mw of middlewares) {
      const value = await mw(req);

      if (value !== true) {
        return value;
      }
    }

    return await action(req);
  }
}
