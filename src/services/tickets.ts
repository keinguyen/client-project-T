import { API } from '@/constants/api';
import { http } from './http';
import { ITicket, TicketStatus } from '@/interfaces/tickets';

export async function getAllTickets(status: TicketStatus, ctrl?: AbortController) {
  const response = await http.get<ITicket[]>(API.Tickets, { status }, {
    signal: ctrl?.signal,
    headers: {
      subject: 'tickets.api.getList',
    }
  });

  return response;
}
