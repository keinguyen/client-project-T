import 'stream-chat-react/dist/css/v2/index.css';

import { Channel } from "stream-chat";
import {
  Channel as ChannelContainer,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import { useGeneralSelector } from '@/store/general';

interface Props {
  channel: Channel;
}

export function ChatWindow({ channel }: Props) {
  const chatClient = useGeneralSelector((store) => store.chatClient)!;

  return (
    <Chat client={chatClient}>
      <ChannelContainer channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </ChannelContainer>
    </Chat>
  );
}
