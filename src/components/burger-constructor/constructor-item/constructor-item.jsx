import React from "react";
import PropTypes from "prop-types";
import styles from "./constructor-item.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorItem({ text, price, thumbnail, type, isLocked, dragIcon }) {
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
        className={styles["constructor-item__element"]}
      />
    </div>
  );
}

ConstructorItem.propTypes = {
  type: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  dragIcon: PropTypes.bool,
};

export default ConstructorItem;
