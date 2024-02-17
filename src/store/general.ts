import { createFastContext } from '@keinguyen/react-fast-context'
import type { Socket } from 'socket.io-client';
import type { StreamChat } from 'stream-chat';
import type { IConversationResponse, ITicket } from '@/interfaces/tickets';

interface IGeneralContext {
  socket: Socket | null;
  chatClient: StreamChat | null;
  selectedTicket: ITicket | null;
  requestCallTickets: IConversationResponse[];
}

const initialGeneralState: IGeneralContext = {
  socket: null,
  chatClient: null,
  selectedTicket: null,
  requestCallTickets: [],
};

export const {
  Provider: GeneralProvider,
  useCommit: useGeneralCommit,
  useSelector: useGeneralSelector,
  useLazySelector: useGeneralLazySelector,
} = createFastContext(initialGeneralState)
