import { ITicket } from "@/interfaces/tickets";
import {
  BottomContainer,
  Cost,
  CreatedBy,
  Description,
  NoticationIndicator,
  NotificationContainer,
  Status,
  TicketStyled,
  Title,
} from "./Ticket.styles";
import { DollarIcon } from "@/components/stateless/Icons/DollarIcon";
import { useGeneralCommit, useGeneralSelector } from "@/store/general";

interface Props extends ITicket {}

export function Ticket(ticket: Props) {
  const {
    title,
    desc,
    createBy,
    status,
    price,
    id,
  } = ticket;
  const commit = useGeneralCommit();
  const isCalling = useGeneralSelector((store) => store.requestCallTickets.some(({ ticketId }) => ticketId === id));

  const handleClick = () => {
    commit({ selectedTicket: ticket });
  };

  return (
    <TicketStyled onClick={handleClick}>
      {isCalling && (
        <NotificationContainer>
          <NoticationIndicator />
        </NotificationContainer>
      )}
      <Status status={status}>{status}</Status>
      <Title>{title}</Title>
      <Description>{desc}</Description>

      <BottomContainer>
        <CreatedBy>{createBy}</CreatedBy>
        {typeof price === 'number' && (
          <Cost>
            <DollarIcon width={14} />
            {`${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Cost>
        )}
      </BottomContainer>
    </TicketStyled>
  );
}
