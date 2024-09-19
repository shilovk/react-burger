import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-ingredients.module.css";
import IngridientsItem from "./ingridients-item/ingridients-item";
import { data } from "../../utils/data";

interface Ingredient {
    _id: string;
    name: string;
    price: number;
    image_large: string;
}

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');

    return (
        <p className={`${styles.burgerIngredients} pl-10 pt-5`}>
            <p className="text text_type_main-medium pt-5 pb-5">
                Соберите бургер
            </p>
            <p style={{display: 'flex'}}>
                <Tab value="one" active={current === 'one'} onClick={() => setCurrent('one')}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={() => setCurrent('two')}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={() => setCurrent('three')}>
                    Начинки
                </Tab>
            </p>
            <p className={styles.ingredientsItems}>
                {data.map((item: Ingredient) => (
                    <IngridientsItem
                        key={item._id}
                        name={item.name}
                        price={item.price}
                        image_large={item.image_large}
                    />
                ))}
            </p>
        </p>
    );
}

export default BurgerIngredients;