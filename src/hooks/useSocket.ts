import { useCallback } from 'react';
import { io } from 'socket.io-client';
import { useSocketCommit, useSocketLazySelector } from '../store/socket';

export function useSocket() {
  const socketCommit = useSocketCommit();
  const getSocket = useSocketLazySelector((store) => store.socket);

  const init = useCallback((username: string) => {
    const socket = io('ws://127.0.0.1:3000', {
      auth: {
        token: username
      }
    });

    socketCommit({ socket });
  }, [socketCommit]);

  const disconnect = useCallback(() => {
    const socket = getSocket();

    socket?.disconnect();
    socketCommit({ socket: null })
  }, [getSocket, socketCommit]);

  return {
    init,
    disconnect,
  };
}
