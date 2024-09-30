// components/App.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { RootState } from "../../services/reducers/reducers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const { ingredients, isLoading, hasError } = useSelector(
    (state: RootState) => state.burgerIngredients,
  );

  const isOrderLoading = useSelector(
    (state: RootState) => state.order.isLoading,
  );

  const hasOrderError = useSelector((state: RootState) => state.order.hasError);

  useEffect(() => {
    dispatch(getIngredients() as never);
  }, [dispatch]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (hasError) {
    return <div>Произошла ошибка при загрузке данных</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <AppHeader />
        <main className={`${styles.app__main} pl-10 pr-7`}>
          <div className={styles["burger-ingredients"]}>
            <BurgerIngredients ingredients={ingredients} />
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

export default App;
