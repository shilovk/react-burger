import React from "react";
import styles from "./burger-constructor.module.css";
import ConstructorItem from "./constructor-item/constructor-item";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface Ingredient {
  _id: string;
  name: string;
  price: number;
  image_large: string;
}

interface Props {
  ingredients: Ingredient[];
}

function BurgerConstructor({ ingredients }: Props) {
  const totalPrice = ingredients.reduce(
    (acc: number, item: Ingredient) => acc + item.price,
    0,
  );

  return (
    <section className={`${styles["burger-constructor"]} pt-20`}>
      <div className={styles["burger-constructor__items"]}>
        {ingredients.map((item: Ingredient) => (
          <ConstructorItem
            type={"top"}
            isLocked={true}
            key={item._id}
            text={item.name}
            price={item.price}
            thumbnail={item.image_large}
            dragIcon={true}
          />
        ))}
      </div>

      <div
        className={`${styles["burger-constructor__bottom"]} text text_type_digits-medium pr-30`}
      >
        {totalPrice}
        <CurrencyIcon className="pl-2" type="primary" />
        <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
          <span className="text text_type_main-small">Оформить заказ</span>
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
