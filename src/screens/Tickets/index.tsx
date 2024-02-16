import { useState } from 'react';
import Drawer from '@mui/material/Drawer';

import useChatListener from '@/hooks/useChatListener';
import streamChatServices from '@/services/stream-chat.services';
import { useGeneralSelector } from '@/store/general';
import { TicketStatus, type ITicket } from '@/interfaces/tickets';
import { Loader } from '@/components/stateless/Loader';
import { useTickets } from './hooks/useTicket';
import { Ticket } from './components/Ticket';
import { ChatWindow } from './components/ChatWindow';
import { ChatContainer, Container, TicketsStyled, Title, TopNav } from './Tickets.styles';
import { StatusFilter } from './components/StatusFilter';

type ActiveChanel = ReturnType<typeof streamChatServices.getChannelById>;


function TicketsContent() {
  const chatClient = useGeneralSelector((store) => store.chatClient)!;
  const [activeChannel, setActiveChannel] = useState<ActiveChanel>();
  const [currentStatus, setCurrentStatus] = useState(TicketStatus.WAITING);

  const { loading, tickets } = useTickets(currentStatus);

  const clientUserID = chatClient.userID;

  const onSelectItem = async ({ channelId }: ITicket) => {
    const channel = streamChatServices.getChannelById(channelId);

    if (!channel || !clientUserID) {
      alert('NO CHANEL OR USER ID AVAILABLE');
      return;
    }

    setActiveChannel(channel);

    const membersInChannel = await channel.queryMembers({
      user_id: { $in: [clientUserID] },
    });

    if (membersInChannel.members.length === 0) {
      await channel.addMembers([clientUserID]);
    }
  };

  const handleCloseDrawer = () => {
    setActiveChannel(undefined);
  }

  const handleStatusChange = (status: TicketStatus) => {
    setCurrentStatus(status);
  };

  return (
    <TicketsStyled>
      <TopNav>
        <Title>Danh sách đơn chờ xét</Title>
        <StatusFilter
          activeStatus={currentStatus}
          onClick={handleStatusChange}
        />
      </TopNav>
      <Container>
        {loading && <Loader scale={1.2} />}
        {!loading && !!tickets.length && tickets.map((ticket) => (
          <Ticket
            {...ticket}
            key={ticket.id}
            onClick={onSelectItem}
          />
        ))}
        {!loading && !tickets.length && <>Không có ticket</>}
      </Container>
      <Drawer
        open={!!activeChannel}
        anchor="right"
        onClose={handleCloseDrawer}
      >
        <ChatContainer>
          <ChatWindow channel={activeChannel!} />
        </ChatContainer>
      </Drawer>
    </TicketsStyled>
  );
}

export function Tickets() {
  const chatClient = useGeneralSelector((store) => store.chatClient);

  useChatListener();

  return chatClient ? <TicketsContent /> : null;
}
