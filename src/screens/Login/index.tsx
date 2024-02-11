import { useLocalStorage } from "@keinguyen/hooks";
import { Navigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/stateless/Input";
import { Button } from "@/components/stateless/Button";
import { Route } from "@/constants/routes";
import { StorageKey } from "@/constants/storage";
import { Container, Form, LoginStyled, ServerErrorMessage, Title } from "./Login.styles";
import { login } from "@/services/users";
import { useMemo, useState } from "react";
import { http } from "@/services/http";
import { ErrorCode } from "@/constants/errors";
import { getRoleFromToken } from "@/helpers/token";

interface ILoginFormState {
  username: string;
  password: string;
}

const ServerError = {
  [ErrorCode.INVALID_USER_QUERY]: 'Tên đăng nhập/Mật khẩu không chính xác',
};

function LoginPage() {
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState } = useForm<ILoginFormState>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const isServerError = !!serverError && !isSubmitting;

  const handleFormSubmit: SubmitHandler<ILoginFormState> = async (data) => {
    try {
      setIsSubmitting(true);

      const { accessToken, refreshToken } = await login(data);

      localStorage.setItem(StorageKey.Token, accessToken);
      localStorage.setItem(StorageKey.RefreshToken, refreshToken);

      setServerError('');
    } catch (err) {
      if (http.isHttpError<{ error: ErrorCode }>(err)) {
        setServerError(
          ServerError[err.response?.data.error as keyof typeof ServerError]
          || 'Không đăng nhập được'
        );
      }
    }
    setIsSubmitting(false);
  };

  return (
    <LoginStyled>
      <Container>
        <Title>Đăng nhập</Title>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            label="Tên đăng nhập"
            error={isServerError || !!formState.errors['username']}
            helperText={!!formState.errors['username'] && 'Nhập tên đăng nhập'}
            {...register('username', { required: true })}
          />

          <Input
            label="Mật khẩu"
            type="password"
            error={isServerError || !!formState.errors['password']}
            helperText={!!formState.errors['password'] && 'Nhập mật khẩu'}
            {...register('password', { required: true })}
          />

          <Button type="submit">Đăng nhập</Button>

          {isServerError && <ServerErrorMessage>{serverError}</ServerErrorMessage>}
        </Form>
      </Container>
    </LoginStyled>
  );
}

function PrivateRoute({ token }: { token: string }) {
  const role = useMemo(() => getRoleFromToken(token), [token]);

  const path = role === 'admin' ? Route.Connections : Route.Main;

  return <Navigate to={path} />;
}

export function Login() {
  const [token] = useLocalStorage(StorageKey.Token);

  return token ? <PrivateRoute token={token} /> : <LoginPage />;
}
