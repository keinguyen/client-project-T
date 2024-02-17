import { useState } from 'react';

import useChatListener from '@/hooks/useChatListener';
import { useGeneralSelector } from '@/store/general';
import { TicketStatus } from '@/interfaces/tickets';
import { Loader } from '@/components/stateless/Loader';
import { useTickets } from './hooks/useTicket';
import { Ticket } from './components/Ticket';
import { ChatWindow } from './components/ChatWindow';
import { Container, TicketsStyled, Title, TopNav } from './Tickets.styles';
import { StatusFilter } from './components/StatusFilter';
import { useSocketEvents } from './hooks/useSocketEvents';

function TicketsContent() {
  const selectedTicket = useGeneralSelector((store) => store.selectedTicket);
  const [currentStatus, setCurrentStatus] = useState(TicketStatus.WAITING);

  const { loading, tickets } = useTickets(currentStatus);

  const handleStatusChange = (status: TicketStatus) => {
    setCurrentStatus(status);
  };

  useSocketEvents();

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
          <Ticket {...ticket} key={ticket.id} />
        ))}
        {!loading && !tickets.length && <>Không có ticket</>}
      </Container>

      <ChatWindow open={!!selectedTicket} ticket={selectedTicket} />
    </TicketsStyled>
  );
}

export function Tickets() {
  const chatClient = useGeneralSelector((store) => store.chatClient);

  useChatListener();

  return chatClient ? <TicketsContent /> : null;
}
