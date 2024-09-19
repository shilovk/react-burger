import React from "react";
import PropTypes from "prop-types";
import styles from "./constructor-item.module.css";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorItem({ text, price, thumbnail, type, isLocked, dragIcon }) {
    return (
        <p className={`${styles.constructorItem}`}>
            {dragIcon && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}
            />
        </p>
    )
}

ConstructorItem.propTypes = {
    type: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
};

export default ConstructorItem;