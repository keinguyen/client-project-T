import { white } from '@/constants/colors';
import { statusColor } from '@/constants/tickets';
import { TicketStatus } from '@/interfaces/tickets';
import styled from 'styled-components';


export const TicketStyled = styled.div`
  position: relative;
  flex: none;
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 8px;
  box-shadow: 0 6px 12px -6px rgba(0,0,0,.2);
  background-color: ${white};
  cursor: pointer;
  transition: all .15s ease;

  &:hover {
    box-shadow: 0 6px 16px 0 rgba(0,0,0,.2);
    border-color: rgba(0, 0, 0, .5);
    top: -2px;
  }
`;

export const Title = styled.span`
  margin: 8px 0 0;
  font-weight: 500;
`;

export const Description = styled.p`
  margin: 8px 0 0;
  color: gray;
  font-size: 14px;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

export const CreatedBy = styled.span`
  font-weight: 300;
  font-size: 14px;
`;

export const Cost = styled.span`
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 15px;
`;

export const Status = styled.span.withConfig({
  shouldForwardProp: (prop) => !['status'].includes(prop),
})<{ status: TicketStatus }>`
  font-weight: 700;
  font-size: 12px;
  color: ${({ status }) => statusColor[status]};
`;
