import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../services/types";

const OrdersStat: React.FC = () => {
  const orders = useSelector((state: RootState) => state.ws.orders) || [];
  const totalOrders = useSelector((state: RootState) => state.ws.total) || 0;
  const totalToday = useSelector((state: RootState) => state.ws.totalToday) || 0;

  const completedOrders = orders
    .filter((order) => order.status === "done")
    .map((order) => order.number)
    .slice(0, 5);

  const pendingOrders = orders
    .filter((order) => order.status !== "done")
    .map((order) => order.number)
    .slice(0, 5);

  return (
    <div className="text text_type_main-medium">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="font-bold mb-5">Готовы:</div>
          <ul className="space-y-2 text_type_digits-default text-cyan-400">
            {completedOrders.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-bold mb-5">В работе:</div>
          <ul className="space-y-2 text_type_digits-default">
            {pendingOrders.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-bold">Выполнено за все время:</h2>
        <p className="text text_type_digits-large">{totalOrders}</p>

        <h2 className="font-bold mt-6">Выполнено за сегодня:</h2>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  );
};

export default OrdersStat;
