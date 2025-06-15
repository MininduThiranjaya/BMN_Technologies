// src/components/PrivateRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // Adjust path as needed

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
