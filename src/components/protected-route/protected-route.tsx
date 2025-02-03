import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  isAuth: boolean | null;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isAuth }) => {
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true); // Флаг для отслеживания загрузки состояния

  useEffect(() => {
    if (isAuth === null) {
      setCheckingAuth(true);
    } else {
      setCheckingAuth(false);
    }
  }, [isAuth]);

  if (checkingAuth) {
    return <div className="text-center text-lg">Загрузка...</div>;
  }

  if (!isAuth) {
    localStorage.setItem("redirectTo", location.pathname);
    return <Navigate to="/login" />;
  }

  return element;
};
