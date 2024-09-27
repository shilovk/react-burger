import React from "react";
import styles from "./constructor-item.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorItemProps } from "./constructor-item.types"; // Импорт интерфейса

const ConstructorItem = ({
  text,
  price,
  thumbnail,
  type,
  isLocked,
  dragIcon,
}: ConstructorItemProps) => {
  return (
    <div className={`${styles["constructor-item"]} pb-5`}>
      {dragIcon && (
        <DragIcon
          type="primary"
          className={styles["constructor-item__drag-icon"]}
        />
      )}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
        extraClass={styles["constructor-item__element"]}
      />
    </div>
  );
};

export default ConstructorItem;
