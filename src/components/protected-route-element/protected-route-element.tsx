import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  isAuth: boolean;
  redirectTo?: string;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
  element,
  isAuth,
  redirectTo = "/login",
}) => {
  const location = useLocation();

  return isAuth ? (
    element
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
};
