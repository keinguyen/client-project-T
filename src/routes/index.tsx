import { createBrowserRouter } from 'react-router-dom';
import { Main } from '../screens/Main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/connections',
        async lazy() {
          const { Connections: Component } = await import('../screens/Connections');

          return { Component };
        },
      },
      {
        path: "/connect",
        async lazy() {
          const { Connect: Component } = await import('../screens/Connect');

          return { Component };
        },
      },
    ],
  },
]);
