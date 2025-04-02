'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null,
  );

  React.useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      setIsAuthenticated(true);
    }

    if (!token) {
      setIsAuthenticated(false);
      navigate.push('/');
      return;
    }
  }, [navigate]);

  console.log(isAuthenticated);

  if (isAuthenticated === null) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <div>{children}</div>;
  }

  return <>{children}</>;
};
