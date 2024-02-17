import styled from 'styled-components';

export const PriceCardStyled = styled.div`
  padding: 12px 4px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  width: 200px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px -2px rgba(0,0,0,.2);
`;

export const CardTitle = styled.p`
  font-family: 'BD Lifeless Grotesk', sans-serif;
  font-weight: 500;
  `;

export const CardPrice = styled.p`
  font-family: 'BD Lifeless Grotesk', sans-serif;
  font-weight: 800;
  font-size: 20px;
`;
