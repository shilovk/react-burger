import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientsItem({ name, price, image_large }) {
  return (
    <div className={`${styles["ingredients-item"]} pt-5`}>
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
}

IngredientsItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_large: PropTypes.string.isRequired,
};

export default IngredientsItem;
