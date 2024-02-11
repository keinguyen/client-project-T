import { useEffect } from 'react';
import { useSocketActions } from '@/hooks/useSocketActions';

export function useInitSocketEffect() {
  const { init, disconnect } = useSocketActions();

  useEffect(() => {
    init();

    return () => {
      disconnect()
    }
  }, [init, disconnect]);
}
