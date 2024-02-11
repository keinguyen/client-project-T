import TextField, { TextFieldProps } from "@mui/material/TextField";
import { ForwardedRef, forwardRef } from "react";

interface Props extends Omit<TextFieldProps, "variant"> {}

function InputComponent(props: Props, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <TextField
      variant="outlined"
      ref={ref}
      {...props}
    />
  );
}

export const Input = forwardRef(InputComponent);
