import React, { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  useEffect(() => {
    // Durante desarrollo, siempre permitir acceso
    if (import.meta.env.DEV) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', 'dev@example.com');
      return;
    }

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      window.location.href = '/';
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute; 