import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Route } from '@/constants/routes';
import { App } from '@/screens/App';

export const router = createBrowserRouter([
  {
    path: Route.Main,
    element: <App />,
    children: [
      {
        path: Route.Main,
        async lazy() {
          const { Main: Component } = await import('@/screens/Main');

          return { Component };
        },
        children: [
          {
            path: Route.Tickets,
            async lazy() {
              const { Tickets: Component } = await import('@/screens/Tickets');

              return { Component };
            },
          },
          { path: '*', element: <Navigate to={Route.Main} replace /> },
        ],
      },
      {
        path: Route.Login,
        async lazy() {
          const { Login: Component } = await import('@/screens/Login');

          return { Component };
        },
      },
    ],
  },
]);
