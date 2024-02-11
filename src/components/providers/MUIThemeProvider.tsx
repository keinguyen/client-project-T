import ThemeProvider, { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { muiTheme } from '@/helpers/theme';

export function MUIThemeProvider({ children }: Pick<ThemeProviderProps, "children">) {
  return (
    <ThemeProvider theme={muiTheme}>
      {children}
    </ThemeProvider>
  )
}
