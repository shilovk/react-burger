import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedIngredientIds] = useState<string[]>([
    "643d69a5c3f7b9001cfa0942",
    "643d69a5c3f7b9001cfa0944",
    "643d69a5c3f7b9001cfa0945",
    "643d69a5c3f7b9001cfa0946",
    "643d69a5c3f7b9001cfa0940",
    "643d69a5c3f7b9001cfa0947",
    "643d69a5c3f7b9001cfa0949",
  ]);
  const [selectedBunId] = useState<string>("643d69a5c3f7b9001cfa093c");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const generateOrderNumber = () => {
    const randomOrderNumber = Math.floor(Math.random() * 100000).toString();
    setOrderNumber(randomOrderNumber);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        return response.json();
      })
      .then((data) => {
        setIngredients(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (hasError) {
    return <div>Произошла ошибка при загрузке данных</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.app__main} pl-10 pr-7`}>
        <div className={styles["burger-ingredients"]}>
          <BurgerIngredients ingredients={ingredients} />
        </div>
        <div className={styles["burger-constructor"]}>
          <BurgerConstructor
            ingredients={ingredients}
            selectedIds={selectedIngredientIds}
            selectedBunId={selectedBunId}
            onOrder={generateOrderNumber}
            orderNumber={orderNumber}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
