import { createFastContext } from '@keinguyen/react-fast-context'
import type { Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket | null;
}

const initialSocketState: ISocketContext = {
  socket: null,
};

export const {
  Provider: SocketProvider,
  useCommit: useSocketCommit,
  useSelector: useSocketSelector,
  useLazySelector: useSocketLazySelector,
} = createFastContext(initialSocketState)
