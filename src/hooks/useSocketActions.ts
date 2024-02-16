import { useCallback } from 'react';
import { io } from 'socket.io-client';
import { useGeneralCommit, useGeneralLazySelector } from '../store/general';
import { useLocalStorage } from '@keinguyen/hooks';
import { StorageKey } from '@/constants/storage';

export function useSocketActions() {
  const socketCommit = useGeneralCommit();
  const getSocket = useGeneralLazySelector((store) => store.socket);
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
