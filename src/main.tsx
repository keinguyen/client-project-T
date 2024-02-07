import 'normalize.css';
import './fonts.css';
import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { MUIThemeProvider } from './components/providers/MUIThemeProvider';
import { RoutesProvider } from './components/providers/RoutesProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10 * 60 * 1000,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MUIThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RoutesProvider />
      </QueryClientProvider>
    </MUIThemeProvider>
  </React.StrictMode>
);
