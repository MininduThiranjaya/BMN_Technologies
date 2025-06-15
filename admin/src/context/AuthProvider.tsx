// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface JwtPayload {
  exp: number;
  // add other fields if you want
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("accessToken")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    checkTokenValidity(token)
  );

  function checkTokenValidity(token: string | null): boolean {
    if (!token) return false;
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  }

  useEffect(() => {
    setIsAuthenticated(checkTokenValidity(token));
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken); // Redirect to dashboard after login
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
