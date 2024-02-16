import {
  Channel as ChannelContainer,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { useState } from 'react';
import { Channel, StreamChat } from 'stream-chat';

import { useTickets } from './hooks/useTicket';
import useChatListener from '@/hooks/useChatListener';
import streamChatServices from '@/services/stream-chat.services';
import { useGeneralSelector } from '@/store/general';
import { ITicket } from '@/interfaces/tickets';

function TicketsContent({ client }: { client: StreamChat }) {
  const [activeChannel, setActiveChannel] = useState<Channel>();

  const { tickets } = useTickets();

  const onSelectItem = async ({ channelId }: ITicket) => {
    const channel = streamChatServices.getChannelById(channelId);

    if (!channel || !client.userID) {
      alert('NO CHANEL OR USER ID AVAILABLE');
      return;
    }

    const membersInChannel = await channel.queryMembers({
      user_id: { $in: [client.userID] },
    });

    if (membersInChannel.members.length === 0) {
      await channel.addMembers([client.userID]);
    }

    setActiveChannel(channel);
  };

  return (
    <Chat client={client}>
      <div>
        {tickets.map((ticket) => {
          return (
            <div key={ticket.id} onClick={() => onSelectItem(ticket)}>
              Bạn có yêu cầu từ đại lý: {ticket.title}
            </div>
          );
        })}
        {activeChannel && (
          <ChannelContainer channel={activeChannel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <div className="fixed bottom-0 min-w-full">
                <MessageInput />
              </div>
            </Window>
            <Thread />
          </ChannelContainer>
        )}
      </div>
    </Chat>
  );
}

export function Tickets() {
  const chatClient = useGeneralSelector((store) => store.chatClient);

  useChatListener();

  return chatClient ? <TicketsContent client={chatClient} /> : null;
}
