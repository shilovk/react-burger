import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  isAuth: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isAuth }) => {
  const location = useLocation();

  if (!isAuth) {
    localStorage.setItem("redirectTo", location.pathname);
    return <Navigate to="/login" />;
  }

  return element;
};
