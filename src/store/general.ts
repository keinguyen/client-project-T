import { createFastContext } from '@keinguyen/react-fast-context'
import type { Socket } from 'socket.io-client';
import type { StreamChat } from 'stream-chat';

interface IGeneralContext {
  socket: Socket | null;
  chatClient: StreamChat | null;
}

const initialGeneralState: IGeneralContext = {
  socket: null,
  chatClient: null,
};

export const {
  Provider: GeneralProvider,
  useCommit: useGeneralCommit,
  useSelector: useGeneralSelector,
  useLazySelector: useGeneralLazySelector,
} = createFastContext(initialGeneralState)
