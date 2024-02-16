import styled from 'styled-components';
import Button from '@mui/material/Button';
import muiStyled from '@mui/material/styles/styled';
import { TicketStatus } from '@/interfaces/tickets';
import { statusColor } from '@/constants/tickets';

export const StatusFilterStyled = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const StatusStyled = muiStyled(Button, {
  shouldForwardProp: (prop) => !['status', 'active'].includes(prop as string),
})<{ status: TicketStatus; active?: boolean }>`

  &.MuiButton-contained {
    background-color: ${({ status }) => statusColor[status]};

    &:hover {
      background-color: ${({ status }) => statusColor[status]};
    }
  }

  &.MuiButton-outlined {
    color: ${({ status }) => statusColor[status]};
    border-color: ${({ status }) => statusColor[status]};
  }
`;
