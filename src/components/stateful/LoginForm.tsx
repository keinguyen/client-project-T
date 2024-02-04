import { FormEvent } from 'react';
import styled from 'styled-components';
import { useSocket } from '../../hooks/useSocket';
import { useSocketSelector } from '../../store/socket';

export function LoginForm() {
  const { init } = useSocket();
  const isLoggedIn = useSocketSelector((store) => !!store.socket);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = new FormData(evt.currentTarget);
    const username = form.get("username");

    if (username) {
      init(username as string);
    }
  };

  return (
    <LoginFormStyled onSubmit={handleSubmit}>
      <Input type="text" name="username" disabled={isLoggedIn} />
      <SubmitBtn disabled={isLoggedIn}>Login</SubmitBtn>
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.form``;

const Input = styled.input``;

const SubmitBtn = styled.button``;
