import { Navigate, Outlet } from 'react-router-dom';
import { useLocalStorage } from '@keinguyen/hooks/useStorage';

import { StorageKey } from '@/constants/storage';
import { Route } from '@/constants/routes';
import { GeneralProvider } from '@/store/general';

import { useProfileEffect } from './hooks/useProfileEffect';
import { useRedirectEffect } from './hooks/useRedirectEffect';
import { useInitSocketEffect } from './hooks/useInitSocketEffect';

function PrivateRoute() {
  useProfileEffect();
  useRedirectEffect();
  useInitSocketEffect();

  return <Outlet />;
}

export function Main() {
  const [token] = useLocalStorage(StorageKey.Token);

  return !token ? <Navigate to={Route.Login} /> : (
    <GeneralProvider>
      <PrivateRoute />
    </GeneralProvider>
  );
}
