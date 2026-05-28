import { createContext, useContext } from 'react';

const DEMO_USER = {
  id: 'demo-001',
  name: 'Demo User',
  role: 'super_admin',
  assignedWardIds: ['ward-amu', 'ward-surgical', 'ward-icu', 'ward-ccu', 'ward-og', 'ward-paeds']
};

export const AuthContext = createContext({ user: DEMO_USER, logout: () => {} });

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{ user: DEMO_USER, logout: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
}
