import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app__main}>
        <div className={styles["burger-ingredients"]}>
          <BurgerIngredients />
        </div>
        <div className={styles["burger-constructor"]}>
          <BurgerConstructor />
        </div>
      </main>
    </div>
  );
}

export default App;
