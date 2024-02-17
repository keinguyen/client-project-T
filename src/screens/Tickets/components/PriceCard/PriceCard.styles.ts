import styled from 'styled-components';
import cardBg from '@/assets/images/card-background.jpg';
import { white } from '@/constants/colors';

export const PriceCardStyled = styled.div`
  padding: 12px 4px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  min-width: 180px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px -2px rgba(0,0,0,.2);
  background: url(${cardBg}) no-repeat;
  background-size: cover;
  color: ${white};
`;

export const CardTitle = styled.p`
  font-family: 'BD Lifeless Grotesk', sans-serif;
  font-weight: 500;
  font-size: 14px;
`;

export const CardPrice = styled.p`
  font-family: monospace;
  font-weight: 800;
  font-size: 20px;
`;
