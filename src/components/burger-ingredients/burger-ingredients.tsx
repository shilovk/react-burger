import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsItem from "./ingridients-item/ingredients-item";

interface Ingredient {
  _id: string;
  name: string;
  type: string;
  price: number;
  image_large: string;
}

interface Props {
  ingredients: Ingredient[];
}

function BurgerIngredients({ ingredients }: Props) {
  const [current, setCurrent] = useState("bun");

  const filteredIngredients = ingredients.filter(
    (item: Ingredient) => item.type === current,
  );

  return (
    <section className={styles["burger-ingredients"]}>
      <h2 className="text text_type_main-medium pt-5 pb-5">Соберите бургер</h2>
      <div className={styles["burger-ingredients__tabs"]}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => setCurrent("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => setCurrent("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => setCurrent("main")}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles["burger-ingredients__items"]}>
        {filteredIngredients.map((item: Ingredient) => (
          <IngredientsItem
            key={item._id}
            name={item.name}
            price={item.price}
            image_large={item.image_large}
          />
        ))}
      </div>
    </section>
  );
}

export default BurgerIngredients;
