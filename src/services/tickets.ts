import { API } from '@/constants/api';
import { http } from './http';
import { ITicket } from '@/interfaces/tickets';

export async function getAllTickets(ctrl?: AbortController) {
  const response = await http.get<ITicket[]>(API.Tickets, undefined, {
    signal: ctrl?.signal,
    headers: {
      subject: 'tickets.api.getList',
    }
  });

  return response;
}
