import styled from 'styled-components';
import muiStyled from '@mui/material/styles/styled';
import { Button } from '@/components/stateless/Button';
import { blue, red, white } from '@/constants/colors';

export const ChatWindowStyled = styled.div`
  width: 600px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .str-chat__thread-container {
    position: absolute;
    right: 0;
    top: 0;
    width: 80%;
    height: 100%;
  }
`;

export const MessageContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const IncomingCall = styled.div<{ isAcceptedCall: boolean }>`
  flex: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  background: ${({ isAcceptedCall }) => isAcceptedCall ? red: blue};
  font-size: 14px;
  font-weight: 600;
  color: ${white};
`;

export const AcceptButton = muiStyled(Button)`
  padding: 8px 16px 4px;
  font-size: 12px;
`;
