import React, { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Main } from "../../pages/main";
import { Login } from "../../pages/login";
import { Register } from "../../pages/register";
import { ForgotPassword } from "../../pages/forgot-password";
import { ResetPassword } from "../../pages/reset-password";
import { NotFound } from "../../pages/not-found";
import { IngredientDetailsPage } from "../../pages/ingredient-details-page";
import { ProtectedRoute } from "../protected-route/protected-route";
import Modal from "../modal/modal";
import { RootState } from "../../services/types";
import { useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { setAuthState } from "../../services/actions/login";
import { useAppDispatch } from "../../services/types";
import { Feed } from "../../pages/feed";
import { OrderPage } from "../../pages/order-page";
import { Orders } from "../orders/orders";
import { Profile } from "../../pages/profile";
import { ProfileEdit } from "../profile/profile-edit";

function App() {
  const dispatch = useAppDispatch();
  const { ingredients, isLoading, hasError } = useSelector((state: RootState) => state.burgerIngredients);

  const isAuth = useSelector((state: RootState) => state.login.isAuthenticated);

  useEffect(() => {
    dispatch(setAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (ingredients.length === 0 && !isLoading && !hasError) {
      dispatch(getIngredients() as never);
    }
  }, [dispatch, ingredients.length, isLoading, hasError]);

  if (isLoading) {
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
  const backgroundLocation = location.state?.background;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Main />} />
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
        <Route path="profile/orders/:id" element={<ProtectedRoute element={<OrderPage />} isAuth={isAuth} />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<OrderPage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Модальное окно отображается только при фоновом маршруте */}
      {backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={() => window.history.back()}>
                <IngredientDetailsPage />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal title="" onClose={() => window.history.back()}>
                <OrderPage />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal title="" onClose={() => window.history.back()}>
                <OrderPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
