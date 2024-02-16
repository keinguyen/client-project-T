import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Route } from '@/constants/routes';
import { getRoleFromToken } from '@/helpers/token';

export function useRedirectEffect() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const role = getRoleFromToken();

    if (pathname !== Route.Main) {
      return;
    }

    if (role === 'admin') {
      navigate(Route.Tickets);
    }
  }, [pathname, navigate]);
}
