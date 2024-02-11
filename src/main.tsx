import 'normalize.css'
import './fonts.css';
import './styles.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { MUIThemeProvider } from './components/providers/MUIThemeProvider';
import { RoutesProvider } from './components/providers/RoutesProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MUIThemeProvider>
      <RoutesProvider />
    </MUIThemeProvider>
  </React.StrictMode>,
)
