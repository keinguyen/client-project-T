import { useCallback } from 'react';
import { io } from 'socket.io-client';
import { useSocketCommit, useSocketLazySelector } from '../store/socket';
import { useLocalStorage } from '@keinguyen/hooks';
import { StorageKey } from '@/constants/storage';

export function useSocketActions() {
  const socketCommit = useSocketCommit();
  const getSocket = useSocketLazySelector((store) => store.socket);
  const [token] = useLocalStorage(StorageKey.Token);

  const init = useCallback(() => {
    const socket = io(import.meta.env.VITE_SOCKET_SERVER, {
      autoConnect: true,
      transports: ['websocket'],
      auth: { token },
    });

    socketCommit({ socket });
  }, [socketCommit, token]);

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
