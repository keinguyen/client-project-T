import { API } from '@/constants/api';
import { http, httpRender } from './http';
import { IConversationResponse, ITicket, TicketStatus } from '@/interfaces/tickets';

export async function getAllTickets(status: TicketStatus, ctrl?: AbortController) {
  const response = await http.get<ITicket[]>(API.Tickets, { status }, {
    signal: ctrl?.signal,
    headers: {
      subject: 'tickets.api.getList',
    }
  });

  return response;
}

export async function acceptConversation(params: IConversationResponse, ctrl?: AbortController) {
  const response = await httpRender.post('api/conversation/accept', {
    streamName: params.streamName,
    accountId: params.accountId,
    ticketId: params.ticketId,
  }, {
    signal: ctrl?.signal,
  });

  return response;
}
