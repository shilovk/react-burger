import React from "react";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderProps } from "./order-details.types";

const OrderDetails = ({ orderNumber }: OrderProps) => {
  return (
    <>
      <p className="text text_type_digits-large pb-1">{orderNumber}</p>
      <p className="text text_type_main-medium pb-2">идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <p className="text text_type_main-small pt-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pb-1">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
