import React from "react";
import PropTypes from "prop-types";
import styles from "./ingridients-item.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngridientsItem({ name, price, image_large }) {
    return (
        <p className={`${styles.ingridientsItem} pt-5`}>
            <img className={styles.image} src={image_large} alt={name}/>
            <p className="text text_type_digits-default">
                {price}
                <CurrencyIcon className="pl-2" type="primary"/>
            </p>
            <p className="text text_type_main-small pt-2">{name}</p>
        </p>
    )
        ;
}

IngridientsItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired
};

export default IngridientsItem;