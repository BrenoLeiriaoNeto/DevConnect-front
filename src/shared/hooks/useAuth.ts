import { useEffect, useState } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { validateAuth } from '../auth/validateAuth';

interface UseAuthOptions {
  redirectToLogin?: boolean;
}

export function useAuth(options?: UseAuthOptions) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const check = async () => {
      const valid = await validateAuth();
      if (isMounted) {
        setIsAuthenticated(valid);
        setIsLoading(false);
      }
    };

    check();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoading && options?.redirectToLogin && !isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isLoading, isAuthenticated, options?.redirectToLogin, navigate]);

  return {
    isAuthenticated,
    isLoading,
  };
}
