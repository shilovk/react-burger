import React from "react";
import styles from "./ingredients-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsItemProps } from "./ingredients-item.types";

const IngredientsItem = ({
  name,
  price,
  image_large,
}: IngredientsItemProps) => {
  return (
    <div className={`${styles["ingredients-item"]}`}>
      <img
        className={styles["ingredients-item__image"]}
        src={image_large}
        alt={name}
      />
      <div
        className={`${styles["ingredients-item__price"]} text text_type_digits-default pt-2`}
      >
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <div
        className={`${styles["ingredients-item__name"]} text text_type_main-small pt-2`}
      >
        {name}
      </div>
    </div>
  );
};

export default IngredientsItem;
