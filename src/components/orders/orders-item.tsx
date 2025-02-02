import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import GradientCircle from "./gradient-circle";
import { useLocation } from "react-router-dom";
import formatOrderDate from "../../utils/format-order-date";
import { IOrderProps } from "../../services/types";
import { RootState, useSelector } from "../../services/types";

const OrdersItem: React.FC<IOrderProps> = ({ order }) => {
  const ingredientsList = useSelector((state: RootState) => state.burgerIngredients.ingredients);

  const orderIngredients = order.ingredients
    .map((id) => ingredientsList.find((item) => item._id === id))
    .filter(Boolean);

  const totalPrice = orderIngredients.reduce((sum, ingredient) => {
    if (!ingredient) return sum;
    return sum + ingredient.price;
  }, 0);

  const location = useLocation();
  const isProfileOrder = location.pathname.includes("/profile/orders");

  return (
    <div className="bg-grayBackground p-5 rounded-3xl">
      <div className="flex justify-between">
        <p className="text_type_digits-default">#{order.number}</p>
        <p className="text_type_main-default text-grayText">{formatOrderDate(order.createdAt)}</p>
      </div>

      <p className="pt-7 text_type_main-medium">{order.name}</p>
      {isProfileOrder && (
        <p className={`text_type_main-default ${order.status === "done" ? "text-cyan-400" : "text-red-500"}`}>
          {order.status === "done" ? "Выполнен" : "Готовится"}
        </p>
      )}

      <div className="pt-7 flex justify-between items-center ml-5">
        <div className="flex items-center relative">
          {orderIngredients.slice(0, 5).map((ingredient, index) => (
            <div
              key={index}
              className="-ml-5"
              style={{
                zIndex: orderIngredients.length - index,
              }}
            >
              <GradientCircle imageUrl={ingredient?.image_mobile} />
            </div>
          ))}

          {orderIngredients.length > 5 && (
            <div className="-ml-5">
              <GradientCircle text={`+${orderIngredients.length - 5}`} />
            </div>
          )}
        </div>

        <div className="flex justify-end items-center mt-4">
          <p className="text_type_digits-default pr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrdersItem;
