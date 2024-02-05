import styled from 'styled-components';
import { LoginForm } from '../components/stateful/LoginForm';
import { useSocketSelector } from '../store/socket';

export function Connect() {
  const isLoggedIn = useSocketSelector((store) => !!store.socket);

  return (
    <ConnectStyled>
      <LoginForm />

      {isLoggedIn}
    </ConnectStyled>
  );
}

const ConnectStyled = styled.div``;
