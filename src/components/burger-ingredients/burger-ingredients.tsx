import React, { useState } from "react";
import Modal from "../modal/modal";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsItem from "./ingridients-item/ingredients-item";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { Ingredient, IngredientsProps } from "./burger-ingredients.types";

const BurgerIngredients = ({ ingredients }: IngredientsProps) => {
  const [current, setCurrent] = useState("bun");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);

  const openModal = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        {filteredIngredients.map((item) => (
          <div key={item._id} onClick={() => openModal(item)}>
            <IngredientsItem
              name={item.name}
              price={item.price}
              image_large={item.image_large}
            />
          </div>
        ))}
      </div>
      {isModalOpen && selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails
            name={selectedIngredient.name}
            image={selectedIngredient.image_large}
            proteins={selectedIngredient.proteins}
            fat={selectedIngredient.fat}
            carbohydrates={selectedIngredient.carbohydrates}
            calories={selectedIngredient.calories}
          />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
