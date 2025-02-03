import React from "react";
import { Orders } from "../components/orders/orders";
import OrdersStat from "../components/orders/orders-stat";

export function Feed() {
  return (
    <div className="mt-10">
      <div className="text text_type_main-large mb-5">Лента заказов</div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 pr-20">
          <Orders />
        </div>
        <div>
          <OrdersStat />
        </div>
      </div>
    </div>
  );
}
