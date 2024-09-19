import React from "react";
import styles from "./burger-constructor.module.css";
import ConstructorItem from "./constructor-item/constructor-item";
import { data } from "../../utils/data";
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

interface Ingredient {
    _id: string;
    name: string;
    price: number;
    image_large: string;
}

function BurgerConstructor() {
    return (
        <p className={`${styles.burgerConstructor} pt-20`}>
            <p className={styles.constructorItems}>
                {data.map((item: Ingredient) => (
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
            </p>
            <p className={`${styles.constructorBottom} text text_type_digits-medium pr-30`}>
                600
                <CurrencyIcon className="pl-2" type="primary"/>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
                    <p className="text text_type_main-small">Оформить заказ</p>
                </Button>
            </p>
        </p>
    );
}

export default BurgerConstructor;