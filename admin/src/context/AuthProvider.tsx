// // // src/context/AuthContext.tsx
// // import React, {
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useState,
// //   ReactNode,
// // } from "react";
// // import { jwtDecode } from "jwt-decode";

// // interface AuthContextType {
// //   token: string | null;
// //   isAuthenticated: boolean;
// //   login: (token: string, user?: any) => void;
// //   logout: () => void;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // interface AuthProviderProps {
// //   children: ReactNode;
// // }

// // interface JwtPayload {
// //   exp: number;
// // }

// // export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
// //   const [token, setToken] = useState<string | null>(() =>
// //     localStorage.getItem("accessToken")
// //   );
// //   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
// //     checkTokenValidity(token)
// //   );

// //   function checkTokenValidity(token: string | null): boolean {
// //     if (!token) return false;
// //     try {
// //       const { exp } = jwtDecode<JwtPayload>(token);
// //       return Date.now() < exp * 1000;
// //     } catch {
// //       return false;
// //     }
// //   }

// //   useEffect(() => {
// //     setIsAuthenticated(checkTokenValidity(token));
// //   }, [token]);

// //   const login = (newToken: string, user: any) => {
// //     localStorage.setItem("accessToken", newToken);
// //     localStorage.setItem("userId", user.toString());
// //     setToken(newToken); // Redirect to dashboard after login
// //   };

// //   const logout = () => {
// //     localStorage.clear();
// //     setToken(null);
// //     setIsAuthenticated(false);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = (): AuthContextType => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error("useAuth must be used within an AuthProvider");
// //   }
// //   return context;
// // };

// // src/context/AuthContext.tsx
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { jwtDecode } from "jwt-decode";

// export interface AuthUser {
//   email: string;
//   userName: string;
//   role: string;
//   phoneNumber?: string;
//   lastLogin?: string;
//   createdAt?: string;
//   updatedAt?: string;
//   suspended?: boolean;
// }

// interface AuthContextType {
//   token: string | null;
//   user: AuthUser | null;
//   isAuthenticated: boolean;
//   login: (token: string, user: AuthUser) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// interface JwtPayload {
//   exp: number;
// }

// function readStoredUser(): AuthUser | null {
//   const raw = localStorage.getItem("authUser");
//   if (!raw) return null;
//   try {
//     return JSON.parse(raw) as AuthUser;
//   } catch {
//     return null;
//   }
// }

// function checkTokenValidity(token: string | null): boolean {
//   if (!token) return false;
//   try {
//     const { exp } = jwtDecode<JwtPayload>(token);
//     return Date.now() < exp * 1000;
//   } catch {
//     return false;
//   }
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [token, setToken] = useState<string | null>(() =>
//     localStorage.getItem("accessToken")
//   );
//   const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
//     checkTokenValidity(token)
//   );

//   // If the token is missing/expired at any point, force a clean logout
//   // (covers "invalid/expired token -> clear auth data and return to login").
//   useEffect(() => {
//     const valid = checkTokenValidity(token);
//     setIsAuthenticated(valid);
//     if (token && !valid) {
//       logout();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   const login = (newToken: string, newUser: AuthUser) => {
//     localStorage.setItem("accessToken", newToken);
//     localStorage.setItem("authUser", JSON.stringify(newUser));
//     setUser(newUser);
//     setToken(newToken);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setToken(null);
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../api";
import { ApiResponse } from "../interfaces/ApiResponses";

export interface AuthUser {
  userName: string;
  email: string;
  phoneNumber: string;
  role: string;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  suspended: boolean;
}

interface LoginTokenData {
  token: string;
}

interface LoginResult {
  ok: boolean;
  error?: string;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean; // true while the app is validating a session on first load
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface JwtPayload {
  exp: number;
}

function readStoredUser(): AuthUser | null {
  const raw = localStorage.getItem("authUser");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("accessToken"),
  );
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    isTokenValid(localStorage.getItem("accessToken")),
  );
  const [loading, setLoading] = useState(true);

  // Kept in a ref so the interceptor (registered once on mount) always
  // reads the *current* token instead of one captured at registration time.
  const tokenRef = useRef(token);
  tokenRef.current = token;

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updated: AuthUser) => {
    localStorage.setItem("authUser", JSON.stringify(updated));
    setUser(updated);
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<LoginResult> => {
    try {
      // Step 1 — authenticate. Backend returns only { token } inside data.
      const loginRes = await axios.post<ApiResponse<LoginTokenData>>(
        endpoints.user.login,
        { email, password },
      );

      if (!loginRes.data.success || !loginRes.data.data?.token) {
        return {
          ok: false,
          error: loginRes.data.message || "Invalid username or password",
        };
      }
      const jwtToken = loginRes.data.data.token;

      // Step 2 — fetch the profile for that token. /me is the source of
      // truth for role/suspended, so we never trust anything decoded
      // client-side from the JWT itself for authorization decisions.
      const profileRes = await axios.get<ApiResponse<AuthUser>>(
        endpoints.user.getMe,
        { headers: { Authorization: `Bearer ${jwtToken}` } },
      );

      if (!profileRes.data.success || !profileRes.data.data) {
        return {
          ok: false,
          error: "Could not load your account details. Please try again.",
        };
      }

      const profile = profileRes.data.data;

      if (profile.suspended) {
        return {
          ok: false,
          error: "Your account is suspended. Please contact support.",
        };
      }

      localStorage.setItem("accessToken", jwtToken);
      localStorage.setItem("authUser", JSON.stringify(profile));
      setUser(profile);
      setToken(jwtToken);
      setIsAuthenticated(true);
      return { ok: true };
    } catch (err: any) {
      const status = err?.response?.status;
      const serverMessage: string | undefined = err?.response?.data?.message;

      if (status === 403) {
        return {
          ok: false,
          error: serverMessage || "Your account is suspended. Please contact support.",
        };
      }
      if (status === 401 || status === 400) {
        return { ok: false, error: serverMessage || "Invalid username or password" };
      }
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  };

  // Attach the token to every outgoing request, and force logout if any
  // *protected* endpoint comes back 401 (expired/invalid token mid-session).
  // The login call itself is excluded so a wrong password never triggers
  // an accidental logout redirect.
  useEffect(() => {
    const reqId = axios.interceptors.request.use((config) => {
      if (tokenRef.current) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${tokenRef.current}`;
      }
      return config;
    });

    const resId = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;
        const url: string = error?.config?.url ?? "";
        const isLoginCall = url === endpoints.user.login;

        if (status === 401 && !isLoginCall) {
          logout();
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(reqId);
      axios.interceptors.response.eject(resId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On first mount, validate whatever session was persisted. If the token
  // has expired since the last visit, clear it instead of leaving the app
  // in a half-authenticated state (token present, but effectively dead).
  useEffect(() => {
    const valid = isTokenValid(token);
    setIsAuthenticated(valid);
    if (token && !valid) {
      logout();
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, loading, login, logout, updateUser }}
    >
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