import { useEffect, useState } from 'react';
import { useGeneralSelector } from '@/store/general';
import { getAllTickets } from '@/services/tickets';
import { http } from '@/services/http';
import { ITicket, TicketStatus } from '@/interfaces/tickets';

export function useTickets(status: TicketStatus) {
  const socket = useGeneralSelector((store) => store.socket);
  const [tickets, setTickets] = useState([] as ITicket[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!socket) {
      return;
    }

    let abortCtrl = new AbortController();

    async function fetch() {
      try {
        abortCtrl.abort();
        abortCtrl = new AbortController();

        setLoading(true);

        const response = await getAllTickets(status, abortCtrl);

        setTickets(response);
        setLoading(false);
      } catch (err) {
        if (!http.isHttpAbort(err)) {
          console.error('FAILED GETTING TICKET LIST');
          setLoading(false);
        }
      }
    }

    socket.on('ticketlistChanged', fetch);

    fetch();
    return () => {
      socket.off('ticketlistChanged', fetch);
      abortCtrl.abort();
    };
  }, [socket, status]);

  return {
    loading,
    tickets,
  };
}
