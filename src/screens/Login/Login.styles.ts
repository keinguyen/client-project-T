import styled from "styled-components";
import { error, primary, white } from "@/constants/colors";

export const LoginStyled = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 16px;
  min-height: 500px;
  background: ${primary};
`;

export const Container = styled.div`
  width: 100%;
  max-width: 350px;
  background: ${white};
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 6px 12px -4px rgba(0,0,0,.1);
`;

export const Title = styled.h1`
  margin: 0 0 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ServerErrorMessage = styled.p`
  color: ${error};
  font-size: 14px;
  margin: 0;
  text-align: center;
`;
