import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import GradientCircle from "./gradient-circle";
import formatOrderDate from "../../utils/format-order-date";
import { useLocation } from "react-router-dom";
import { IOrderProps } from "../../services/types";
import { RootState, useSelector } from "../../services/types";

const Order: React.FC<IOrderProps> = ({ order }) => {
  const ingredientsList = useSelector((state: RootState) => state.burgerIngredients.ingredients);

  const ingredientCountMap = order.ingredients.reduce<Record<string, number>>((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const orderIngredients = Object.keys(ingredientCountMap)
    .map((id) => {
      const ingredient = ingredientsList.find((item) => item._id === id);
      return ingredient ? { ...ingredient, count: ingredientCountMap[id] } : null;
    })
    .filter((ingredient): ingredient is NonNullable<typeof ingredient> => Boolean(ingredient));

  const totalPrice = orderIngredients.reduce((sum, ingredient) => {
    return sum + ingredient.price * ingredient.count;
  }, 0);

  const location = useLocation();
  const backgroundLocation = location.state?.background;

  return (
    <div className="w-full pb-10 text-left">
      <p className={`text_type_digits-default ${backgroundLocation ? "" : "text-center"}`}>#{order.number}</p>
      <p className="text_type_main-medium pt-5 pb-3">{order.name}</p>
      <div className={`text_type_main-default ${order.status === "done" ? "text-cyan-400" : "text-red-500"}`}>
        {order.status === "done" ? "Выполнен" : "Готовится"}
      </div>

      <p className="text-left mt-10 mb-5 text_type_main-medium">Состав:</p>

      {/* Список ингредиентов с прокруткой */}
      <ul className="max-h-[300px] overflow-y-auto pr-3 space-y-3">
        {orderIngredients.map((ingredient, index) => (
          <li key={index} className="flex justify-between py-2">
            <div className="flex items-center pr-5 gap-2">
              <GradientCircle imageUrl={ingredient?.image_mobile} />
              <p className="text_type_main-default">{ingredient.name}</p>
            </div>
            <div className="flex items-center flex-nowrap whitespace-nowrap">
              <span className="text_type_digits-default pr-3">
                {ingredient.count} x {ingredient.type === "bun" ? ingredient.price * 2 : ingredient.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-between">
        <div className="items-center text_type_main-default text-grayText">{formatOrderDate(order.createdAt)}</div>
        <div className="flex items-center">
          <p className="text_type_digits-default pr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default Order;
