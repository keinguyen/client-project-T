import { useEffect, useState } from 'react';
import { useGeneralSelector } from '@/store/general';
import { getAllTickets } from '@/services/tickets';
import { http } from '@/services/http';
import { ITicket } from '@/interfaces/tickets';

export function useTickets() {
  const socket = useGeneralSelector((store) => store.socket);
  const [tickets, setTickets] = useState([] as ITicket[]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    let abortCtrl = new AbortController();

    async function fetch() {
      try {
        abortCtrl.abort();
        abortCtrl = new AbortController();

        const response = await getAllTickets(abortCtrl);

        setTickets(response);
      } catch (err) {
        if (!http.isHttpAbort(err)) {
          console.error('FAILED GETTING TICKET LIST');
        }
      }
    }

    socket.on('ticketlistChanged', fetch);

    fetch();
    return () => {
      socket.off('ticketlistChanged', fetch);
      abortCtrl.abort();
    };
  }, [socket]);

  return {
    tickets,
  };
}
