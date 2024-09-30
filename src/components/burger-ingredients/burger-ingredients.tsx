import React, { useState, useRef, useEffect, useMemo } from "react";
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

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openModal = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleScroll = () => {
    const container = containerRef.current;

    if (container && bunRef.current && sauceRef.current && mainRef.current) {
      const bunPos = bunRef.current.getBoundingClientRect().top;
      const saucePos = sauceRef.current.getBoundingClientRect().top;
      const mainPos = mainRef.current.getBoundingClientRect().top;

      const containerTop = container.getBoundingClientRect().top;

      if (Math.abs(bunPos - containerTop) < Math.abs(saucePos - containerTop)) {
        setCurrent("bun");
      } else if (
        Math.abs(saucePos - containerTop) < Math.abs(mainPos - containerTop)
      ) {
        setCurrent("sauce");
      } else {
        setCurrent("main");
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToSection = (section: string) => {
    setCurrent(section);

    if (section === "bun" && bunRef.current) {
      bunRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "sauce" && sauceRef.current) {
      sauceRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "main" && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { buns, sauces, mains } = useMemo(() => {
    const categorizedIngredients = {
      buns: [] as Ingredient[],
      sauces: [] as Ingredient[],
      mains: [] as Ingredient[],
    };

    ingredients.forEach((item) => {
      if (item.type === "bun") {
        categorizedIngredients.buns.push(item);
      } else if (item.type === "sauce") {
        categorizedIngredients.sauces.push(item);
      } else if (item.type === "main") {
        categorizedIngredients.mains.push(item);
      }
    });

    return categorizedIngredients;
  }, [ingredients]);

  return (
    <section className={styles["burger-ingredients"]}>
      <div className="text text_type_main-medium pt-5">Соберите бургер</div>
      <div className={styles["burger-ingredients__tabs"]}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => scrollToSection("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => scrollToSection("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => scrollToSection("main")}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles["burger-ingredients__items"]} ref={containerRef}>
        <div ref={bunRef} className="text text_type_main-medium pt-7">
          Булки
        </div>
        <div className={styles["burger-ingredients__category"]}>
          {buns.map((item) => (
            <div key={item._id} onClick={() => openModal(item)}>
              <IngredientsItem
                name={item.name}
                price={item.price}
                image_large={item.image_large}
              />
            </div>
          ))}
        </div>

        <div ref={sauceRef} className="text text_type_main-medium pt-7">
          Соусы
        </div>
        <div className={styles["burger-ingredients__category"]}>
          {sauces.map((item) => (
            <div key={item._id} onClick={() => openModal(item)}>
              <IngredientsItem
                name={item.name}
                price={item.price}
                image_large={item.image_large}
              />
            </div>
          ))}
        </div>

        <div ref={mainRef} className="text text_type_main-medium pt-7">
          Начинки
        </div>
        <div className={styles["burger-ingredients__category"]}>
          {mains.map((item) => (
            <div key={item._id} onClick={() => openModal(item)}>
              <IngredientsItem
                name={item.name}
                price={item.price}
                image_large={item.image_large}
              />
            </div>
          ))}
        </div>
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

export default React.memo(BurgerIngredients);
