import React, { useRef } from "react";
import styles from "./constructor-item.module.css";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorItemProps } from "./constructor-item.types";

const ConstructorItem = ({
  text,
  price,
  thumbnail,
  type,
  isLocked,
  dragIcon,
  extraClass,
  onRemove,
  index,
  moveIngredient,
}: ConstructorItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !!moveIngredient && index !== undefined, // Проверяем возможность перетаскивания
  });

  const [, drop] = useDrop({
    accept: "ingredient",
    hover: (item: { index: number }) => {
      if (moveIngredient && item.index !== index && index !== undefined) {
        moveIngredient(item.index, index);
        item.index = index;
      }
    },
  });

  if (moveIngredient) {
    drag(drop(ref)); // Связываем с drag/drop только если moveIngredient есть
  }

  return (
    <div ref={ref} className={`${styles["constructor-item"]} ${extraClass}`} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {dragIcon && <DragIcon type="primary" className="pr-5" />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={onRemove}
        extraClass={styles["constructor-element"]}
      />
    </div>
  );
};

export default ConstructorItem;
