import { create } from './create';
import { getTickets } from './getTickets';

const func = (req: Request) => {
  if (req.method === 'GET') {
    return {
      'tickets.api.getList': getTickets,
    };
  }

  if (req.method === 'POST') {
    return {
      'tickets.api.createTicket': create,
    };
  }
};

export default async (req: Request) => {
  const subject = req.headers.get('subject');

  if (subject) {
    const callApi = func(req)?.[subject];
    if (callApi) return await callApi(req);
    return new Response(JSON.stringify({ error: 'NO_VALID_METHOD' }));
  }

  return new Response(JSON.stringify({ error: 'NO_VALID_METHOD' }));
};
