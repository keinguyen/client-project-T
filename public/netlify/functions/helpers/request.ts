export interface IResponse {
  data?: BodyInit | Record<string, unknown> | unknown[] | null;
  status?: number;
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
