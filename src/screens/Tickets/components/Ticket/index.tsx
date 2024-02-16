import { ITicket } from "@/interfaces/tickets";
import {
  BottomContainer,
  Cost,
  CreatedBy,
  Description,
  Status,
  TicketStyled,
  Title,
} from "./Ticket.styles";
import { DollarIcon } from "@/components/stateless/Icons/DollarIcon";

interface Props extends ITicket {
  onClick?: (ticket: ITicket) => void;
}

export function Ticket({ onClick, ...ticket }: Props) {
  const {
    title,
    desc,
    createBy,
    status,
    price,
  } = ticket;

  const handleClick = () => {
    onClick?.(ticket);
  };

  return (
    <TicketStyled onClick={handleClick}>
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
