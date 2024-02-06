import { IResponse, response } from '../helpers/request';
import { create } from './create';
import { query } from './query';

export default async (req: Request) => {
  let res: IResponse = {
    data: { error: 'NO_VALID_METHOD' },
    status: 400,
  };

  if (req.method === 'GET') {
    res = await query(req);
  } else if (req.method === 'POST') {
    res = await create(req);
  }

  return response(res);
}
