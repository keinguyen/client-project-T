import { useLocalStorage } from '@keinguyen/hooks/useStorage';
import { Navigate, Outlet } from 'react-router-dom';
import { StorageKey } from '../../constants/storage';
import { Route } from '../../constants/routes';
import { useProfileEffect } from './hooks/useProfileEffect';

function PrivateRoute() {
  useProfileEffect();

  return (
    <>
      Private Route
      <Outlet />
    </>
  );
}

export function Main() {
  const [token] = useLocalStorage(StorageKey.Token);

  return token ? <PrivateRoute /> : <Navigate to={Route.Login} />;
}
