import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@keinguyen/hooks/useStorage';

import { StorageKey } from '@/constants/storage';
import { Route } from '@/constants/routes';

import { useProfileEffect } from './hooks/useProfileEffect';
import { useEffect } from 'react';
import { getRoleFromToken } from '@/helpers/token';

function PrivateRoute() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useProfileEffect();

  useEffect(() => {
    const role = getRoleFromToken();

    if (pathname === Route.Main && role === 'admin') {
      navigate(Route.Connections);
    }
  }, [pathname, navigate]);

  return <Outlet />;
}

export function Main() {
  const [token] = useLocalStorage(StorageKey.Token);

  return token ? <PrivateRoute /> : <Navigate to={Route.Login} />;
}
