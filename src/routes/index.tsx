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
            path: Route.Connections,
            async lazy() {
              const { Connections: Component } = await import('@/screens/Connections');

              return { Component };
            },
          },
          // {
          //   path: '/connect',
          //   async lazy() {
          //     const { Connect: Component } = await import('@/screens/Connect');

          //     return { Component };
          //   },
          // },
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
    ]
  },
]);
