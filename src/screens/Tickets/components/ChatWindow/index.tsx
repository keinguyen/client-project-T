import 'stream-chat-react/dist/css/v2/index.css';

import {
  Channel as ChannelContainer,
  ChannelHeader,
  Chat,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import Drawer from '@mui/material/Drawer';

import { ITicket } from '@/interfaces/tickets';
import { useGeneralCommit } from '@/store/general';
import {
  AcceptButton,
  ChatWindowStyled,
  IncomingCall,
  MessageContainer,
  VideoContainer,
  VideoScreen,
} from './ChatWindow.styles';
import { useInitChat } from './hooks/useInitChat';
import { ChatMessages } from '../ChatMessages';

interface Props {
  open?: boolean;
  ticket?: ITicket | null;
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
          <ChannelContainer channel={activeChannel}>
            <Window>
              <ChannelHeader />
              <MessageContainer>
                {!!requestCallInfo && (
                  <IncomingCall isAcceptedCall={isAcceptedCall}>
                    {requestText}
                    <AcceptButton onClick={handleAcceptCall}>{requestButtonText}</AcceptButton>
                  </IncomingCall>
                )}
                <ChatMessages />
              </MessageContainer>
              <MessageInput />
            </Window>
            <Thread />
          </ChannelContainer>
        </Chat>

        {isAcceptedCall && !!requestCallInfo && (
          <VideoContainer>
            <VideoScreen
              src={`https://viewer.millicast.com?streamId=${requestCallInfo.accountId}/${requestCallInfo.streamName}`}
              allowFullScreen
            />
          </VideoContainer>
        )}
      </ChatWindowStyled>
    </Drawer>
  );
}
