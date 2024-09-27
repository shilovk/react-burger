import React from "react";
import styles from "./ingredient-details.module.css";
import { IngredientDetailsProps } from "./ingredient-details.types";

const IngredientDetails = ({
  name,
  image,
  proteins,
  fat,
  carbohydrates,
  calories,
  description,
}: IngredientDetailsProps) => {
  const nutritionInfo = [
    { label: "Калории, ккал", value: calories },
    { label: "Белки, г", value: proteins },
    { label: "Жиры, г", value: fat },
    { label: "Углеводы, г", value: carbohydrates },
  ];

  return (
    <div className={styles["ingredient-details__details"]}>
      <img
        src={image}
        alt={name}
        className={styles["ingredient-details__image"]}
      />
      <p
        className={`${styles["ingredient-details__name"]} text text_type_main-medium pb-5`}
      >
        {name}
      </p>
      {description && (
        <p className={styles["ingredient-details__description"]}>
          {description}
        </p>
      )}
      <div
        className={`${styles["ingredient-details__nutrition"]} text text_color_inactive`}
      >
        {nutritionInfo.map((item, index) => (
          <div
            key={index}
            className={styles["ingredient-details__nutritionItem"]}
          >
            <span className="text_type_main-small">{item.label}</span>
            <span className="text_type_digits-default">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientDetails;
