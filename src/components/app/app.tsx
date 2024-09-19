import React from 'react';
import './app.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
      <div className="app">
          <AppHeader />
          <div style={{display: 'flex'}}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
      </div>
  );
}

export default App;
