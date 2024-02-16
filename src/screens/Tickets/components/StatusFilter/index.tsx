import { TicketStatus } from "@/interfaces/tickets";
import { StatusFilterStyled } from "./StatusFilter.styles";
import { Status } from './Status';

const allStatuses = [TicketStatus.WAITING, TicketStatus.PENDING, TicketStatus.SUCCESS];

interface Props {
  activeStatus?: TicketStatus;
  onClick?: (status: TicketStatus) => void;
}

export function StatusFilter({ activeStatus, onClick }: Props) {
  return (
    <StatusFilterStyled>
      {allStatuses.map((status) => (
        <Status
          key={status}
          status={status}
          active={activeStatus === status}
          onClick={onClick}
        />
      ))}
    </StatusFilterStyled>
  );
}
