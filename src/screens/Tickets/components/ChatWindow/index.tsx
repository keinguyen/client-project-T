import 'stream-chat-react/dist/css/v2/index.css';

import {
  Channel as ChannelContainer,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
  MessageSimple,
  MessageContextValue,
} from 'stream-chat-react';
import Drawer from '@mui/material/Drawer';

import { ITicket } from '@/interfaces/tickets';
import { useGeneralCommit } from '@/store/general';
import {
  AcceptButton,
  ChatWindowStyled,
  IncomingCall,
  MessageContainer,
} from './ChatWindow.styles';
import { useInitChat } from './hooks/useInitChat';
import { handleRenderText } from '../../Tickets.helpers';
import { StreamVideo } from '../StreamVideo';

interface Props {
  open?: boolean;
  ticket?: ITicket | null;
}

function CustomMessage(props: Partial<MessageContextValue>) {
  return <MessageSimple {...props} renderText={handleRenderText} />
}

export function ChatWindow({ open, ticket }: Props) {
  const commit = useGeneralCommit();

  const {
    chatClient,
    activeChannel,
    requestCallInfo,
    isAcceptedCall,
    acceptCall,
    cancelCall,
  } = useInitChat(ticket);

  const requestText = isAcceptedCall
    ? 'Đang tham gia video call'
    : 'Đang có yêu cầu cuộc gọi ở ticket này';

  const requestButtonText = isAcceptedCall
    ? 'Thoát'
    : 'Tham gia';

  const handleCloseDrawer = () => {
    commit({ selectedTicket: null });
  };

  const handleAcceptCall = () => {
    isAcceptedCall ? cancelCall() : acceptCall();
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={handleCloseDrawer}
    >
      <ChatWindowStyled>
        <Chat client={chatClient}>
          <ChannelContainer channel={activeChannel} Message={CustomMessage}>
            <Window>
              <ChannelHeader />
              <MessageContainer>
                {!!requestCallInfo && (
                  <IncomingCall isAcceptedCall={isAcceptedCall}>
                    {requestText}
                    <AcceptButton onClick={handleAcceptCall}>{requestButtonText}</AcceptButton>
                  </IncomingCall>
                )}
                <MessageList />
              </MessageContainer>
              <MessageInput />
            </Window>
            <Thread />
          </ChannelContainer>
        </Chat>

        {isAcceptedCall && !!requestCallInfo && <StreamVideo {...requestCallInfo} />}
      </ChatWindowStyled>
    </Drawer>
  );
}
