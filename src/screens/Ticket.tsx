import { useQuery } from 'react-query';
import {
  Channel as ChannelS,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import styled from 'styled-components';
import { requestAPI } from '../apis';
import { Ticket } from '../type';
import useChatListener from '../hooks/useChatListener';
import streamChatServices from '../services/stream-chat.services';
import { useState } from 'react';
import { DefaultGenerics } from 'stream-chat/dist/types/types';
import { Channel } from 'stream-chat';

export function TicketScreen() {
  useChatListener();

  const [activeChannel, setActiveChannel] = useState<
    Channel<DefaultGenerics> | undefined
  >();

  const { data } = useQuery(
    'fetchTicket',
    () => requestAPI<Array<Ticket>>({ subject: 'tickets.api.getList' }),
    {
      onError: (error) => {
        console.log('error', error);
      },
    }
  );

  const onSelectItem = async (item: Ticket) => {
    const { channelId } = item;
    const channel = await streamChatServices.getChannelById(channelId);
    if (channel) {
      const membersInChannel = await channel.queryMembers({
        user_id: { $in: ['demo3'] },
      });
      if (membersInChannel.members.length === 0) {
        await channel.addMembers(['demo3']);
      }
      setActiveChannel(channel);
    }
  };

  return (
    <Chat client={streamChatServices.client}>
      <TicketStyled>
        {(data || []).map((e, key) => {
          return (
            <div key={key} onClick={() => onSelectItem(e)}>
              Bạn có yêu cầu từ đại lý: {e.title}
            </div>
          );
        })}
        {activeChannel && (
          <ChannelS channel={activeChannel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <div className="fixed bottom-0 min-w-full">
                <MessageInput />
              </div>
            </Window>
            <Thread />
          </ChannelS>
        )}
      </TicketStyled>
    </Chat>
  );
}

const TicketStyled = styled.div``;
