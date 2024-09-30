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
  extraClass,
}: ConstructorItemProps) => {
  return (
    <div className={`${styles["constructor-item"]} ${extraClass}`}>
      {dragIcon && <DragIcon type="primary" className="pr-5" />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
      />
    </div>
  );
};

export default ConstructorItem;
