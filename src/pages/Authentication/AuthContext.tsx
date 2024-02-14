
// AuthContext.tsx
import { createContext } from 'react';

interface AuthContextType {
  userRole: string | null;
  login: (role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
