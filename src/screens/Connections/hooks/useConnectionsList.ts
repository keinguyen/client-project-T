import { useEffect, useState } from 'react';
import { useSocketSelector } from '@/store/socket';
import { getAllTickets } from '@/services/tickets';
import { http } from '@/services/http';

export function useConnectionList() {
  const socket = useSocketSelector((store) => store.socket);
  const [connectionList, setConnectionList] = useState([] as string[]);

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

        setConnectionList(response);
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
    connectionList,
  };
}
