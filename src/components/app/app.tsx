import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { RootState, useDispatch, useSelector } from "../../services/types";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { setAuthState } from "../../services/actions/login";

import { Main } from "../../pages/main";
import { Login } from "../../pages/login";
import { Register } from "../../pages/register";
import { ForgotPassword } from "../../pages/forgot-password";
import { ResetPassword } from "../../pages/reset-password";
import { NotFound } from "../../pages/not-found";
import { IngredientDetailsPage } from "../../pages/ingredient-details-page";
import { ProtectedRoute } from "../protected-route/protected-route";
import { Feed } from "../../pages/feed";
import { OrderPage } from "../../pages/order-page";
import { Orders } from "../orders/orders";
import { Profile } from "../../pages/profile";
import { ProfileEdit } from "../profile/profile-edit";
import Modal from "../modal/modal";

function App() {
  const dispatch = useDispatch();
  const { ingredients, isLoading, hasError } = useSelector((state: RootState) => state.burgerIngredients);
  const isAuth = useSelector((state: RootState) => state.login.isAuthenticated);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    dispatch(setAuthState());
    setAuthChecked(true);
  }, [dispatch]);

  useEffect(() => {
    if (ingredients.length === 0 && !isLoading && !hasError) {
      dispatch(getIngredients() as never);
    }
  }, [dispatch, ingredients.length, isLoading, hasError]);

  if (!authChecked || isLoading) {
    return <div>Загрузка...</div>;
  }

  if (hasError) {
    return <div>Произошла ошибка при загрузке данных</div>;
  }

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <AppRoutes isAuth={isAuth} />
      </div>
    </Router>
  );
}

const AppRoutes = ({ isAuth }: { isAuth: boolean }) => {
  const location = useLocation();
  const backgroundLocation = location.state?.background || null;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Main />} />
        <Route path="/react-burger/" element={<Main />} />
        <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuth ? <Register /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={!isAuth ? <ForgotPassword /> : <Navigate to="/" />} />
        <Route
          path="/reset-password"
          element={
            !isAuth && !!localStorage.getItem("visitedForgotPassword") ? (
              <ResetPassword />
            ) : (
              <Navigate to="/forgot-password" />
            )
          }
        />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} isAuth={isAuth} />}>
          <Route index element={<ProfileEdit />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/profile/orders/:id" element={<ProtectedRoute element={<OrderPage />} isAuth={isAuth} />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<OrderPage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Модальное окно отображается только при наличии backgroundLocation */}
      {backgroundLocation && (
        <Modal title="" onClose={() => window.history.back()}>
          <Routes>
            <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
            <Route path="/feed/:id" element={<OrderPage />} />
            <Route path="/profile/orders/:id" element={<OrderPage />} />
          </Routes>
        </Modal>
      )}
    </>
  );
};

export default App;
