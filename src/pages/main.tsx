import React, { useEffect } from "react";
import styles from "../components/app/app.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { RootState, useSelector } from "../services/types";

export function Main() {
  const { isOrderLoading, hasOrderError } = useSelector((state: RootState) => state.order);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.login);
  const redirectTo = localStorage.getItem("redirectTo") || "/";

  useEffect(() => {
    if (isAuthenticated && redirectTo !== null) {
      localStorage.removeItem("redirectTo");
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <main className={`${styles.app__main} pl-10 pr-7`}>
          <div className={styles["burger-ingredients"]}>
            <BurgerIngredients />
          </div>
          <div className={styles["burger-constructor"]}>
            <BurgerConstructor />
            {isOrderLoading && <div>Создание заказа...</div>}
            {hasOrderError && <div>Ошибка при создании заказа</div>}
          </div>
        </main>
      </div>
    </DndProvider>
  );
}
