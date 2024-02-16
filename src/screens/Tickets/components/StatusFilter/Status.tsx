import { TicketStatus } from "@/interfaces/tickets";
import { StatusStyled } from "./StatusFilter.styles";

interface Props {
  status: TicketStatus;
  active?: boolean;
  onClick?: (status: TicketStatus) => void;
}

export function Status({
  status,
  active,
  onClick,
}: Props) {
  const handleClick = () => {
    onClick?.(status);
  };

  return (
    <StatusStyled
      variant={active ? 'contained' : 'outlined'}
      status={status}
      active={active}
      onClick={handleClick}
    >
      {status}
    </StatusStyled>
  )
}
