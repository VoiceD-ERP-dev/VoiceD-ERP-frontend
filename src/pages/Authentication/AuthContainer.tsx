// AuthContainer.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContext } from './AuthContext';

export const AuthContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  const login = (role: string) => {
    setUserRole(role);
  };

  const logout = () => {
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
