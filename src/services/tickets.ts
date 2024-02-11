import { API } from '@/constants/api';
import { http } from './http';

export async function getAllTickets(ctrl?: AbortController) {
  const response = await http.get<any[]>(API.Tickets, undefined, {
    signal: ctrl?.signal,
    headers: {
      subject: 'tickets.api.getList',
    }
  });

  return response;
}
