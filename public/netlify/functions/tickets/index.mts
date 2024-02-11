import { response } from '../helpers/request';
import { IResponse } from '../interfaces';
import { create } from './create';
import { getTickets } from './getTickets';
import { TicketAPI } from './interface';

type APIFunction = {
  [key: string]: (res: Request) => Promise<IResponse>;
}

const availableAPIs: Record<string, APIFunction> = {
  GET: {
    [TicketAPI.GET_LIST]: getTickets,
  },
  POST: {
    [TicketAPI.CREATE_TICKET]: create,
  },
};

export default async (req: Request) => {
  const subject = req.headers.get('subject') as TicketAPI | undefined;
  let res: IResponse = {
    data: { error: 'NO_VALID_METHOD' },
    status: 400,
  };

  if (subject) {
    const callApi = availableAPIs[req.method as keyof typeof availableAPIs]?.[subject];

    if (callApi) {
      res = await callApi(req);
    }
  }

  return response(res);
};
