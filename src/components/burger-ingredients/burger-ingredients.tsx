import React, { useRef, useEffect, useMemo } from "react";
import Modal from "../modal/modal";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsItem from "./ingridients-item/ingredients-item";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/reducers/reducers";
import {
  setIngredientDetails,
  clearIngredientDetails,
} from "../../services/actions/ingredient-details";
import { setTab } from "../../services/actions/tab";
import { Ingredient, IngredientsProps } from "./burger-ingredients.types";
import { useDrag } from "react-dnd";

const IngredientsItemDraggable = ({
  ingredient,
}: {
  ingredient: Ingredient;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ingredient.type,
    item: { id: ingredient._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={drag} style={{ opacity }} className={styles["ingredient-item"]}>
      <IngredientsItem
        name={ingredient.name}
        price={ingredient.price}
        image={ingredient.image}
        count={ingredient.count || 0}
      />
    </div>
  );
};

const BurgerIngredients = ({ ingredients }: IngredientsProps) => {
  const dispatch = useDispatch();
  const ingredientDetails = useSelector(
    (state: RootState) => state.ingredientDetails.ingredient,
  );
  const tab = useSelector((state: RootState) => state.tab.title);

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openModal = (ingredient: Ingredient) => {
    dispatch(setIngredientDetails(ingredient));
  };

  const closeModal = () => {
    dispatch(clearIngredientDetails());
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container && bunRef.current && sauceRef.current && mainRef.current) {
      const bunPos = bunRef.current.getBoundingClientRect().top;
      const saucePos = sauceRef.current.getBoundingClientRect().top;
      const mainPos = mainRef.current.getBoundingClientRect().top;
      const containerTop = container.getBoundingClientRect().top;

      if (Math.abs(bunPos - containerTop) < Math.abs(saucePos - containerTop)) {
        dispatch(setTab("bun"));
      } else if (
        Math.abs(saucePos - containerTop) < Math.abs(mainPos - containerTop)
      ) {
        dispatch(setTab("sauce"));
      } else {
        dispatch(setTab("main"));
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

  const scrollToTab = (tab: string) => {
    dispatch(setTab(tab));
    if (tab === "bun" && bunRef.current) {
      bunRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "sauce" && sauceRef.current) {
      sauceRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "main" && mainRef.current) {
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
      <div className="text text_type_main-large pt-7 pb-5">Соберите бургер</div>
      <div className={styles["burger-ingredients__tabs"]}>
        <Tab
          value="bun"
          active={tab === "bun"}
          onClick={() => scrollToTab("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={tab === "sauce"}
          onClick={() => scrollToTab("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={tab === "main"}
          onClick={() => scrollToTab("main")}
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
              <IngredientsItemDraggable ingredient={item} />
            </div>
          ))}
        </div>

        <div ref={sauceRef} className="text text_type_main-medium pt-7">
          Соусы
        </div>
        <div className={styles["burger-ingredients__category"]}>
          {sauces.map((item) => (
            <div key={item._id} onClick={() => openModal(item)}>
              <IngredientsItemDraggable ingredient={item} />
            </div>
          ))}
        </div>

        <div ref={mainRef} className="text text_type_main-medium pt-7">
          Начинки
        </div>
        <div className={styles["burger-ingredients__category"]}>
          {mains.map((item) => (
            <div key={item._id} onClick={() => openModal(item)}>
              <IngredientsItemDraggable ingredient={item} />
            </div>
          ))}
        </div>
      </div>

      {ingredientDetails && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails
            name={ingredientDetails.name}
            image={ingredientDetails.image}
            proteins={ingredientDetails.proteins}
            fat={ingredientDetails.fat}
            carbohydrates={ingredientDetails.carbohydrates}
            calories={ingredientDetails.calories}
          />
        </Modal>
      )}
    </section>
  );
};

export default React.memo(BurgerIngredients);
