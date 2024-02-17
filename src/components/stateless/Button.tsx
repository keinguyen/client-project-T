import MUIButton, { ButtonProps } from '@mui/material/Button';
import styled from '@mui/material/styles/styled';

type ButtonLayout = "primary" | "secondary" | "text";

interface Props extends Omit<ButtonProps, "variant"> {
  layout?: ButtonLayout;
}

const layoutMapper: Record<ButtonLayout, ButtonProps["variant"]> = {
  primary: 'contained',
  secondary: 'outlined',
  text: 'text',
}

export function Button({ layout, children, ...props }: Props) {
  return (
    <ButtonStyled
      variant={layoutMapper[layout as ButtonLayout] || layoutMapper.primary}
      {...props}
    >
      {children}
    </ButtonStyled>
  );
}

const ButtonStyled = styled(MUIButton)`
  padding: 16px 16px 10px;
`;
