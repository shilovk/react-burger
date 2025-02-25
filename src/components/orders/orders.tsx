import React, { useEffect, useMemo, useCallback } from "react";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_CLEAR_ORDERS } from "../../services/constants";
import { useNavigate, useLocation } from "react-router-dom";
import OrdersItem from "./orders-item";
import { IOrder } from "../../services/types";
import { RootState, useDispatch, useSelector } from "../../services/types";

export const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
      dispatch({ type: WS_CLEAR_ORDERS });
    };
  }, []);

  const orders = useSelector((state: RootState) => state.ws.orders) ?? [];
  const error = useSelector((state: RootState) => state.ws.error);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders]);

  const openModal = useCallback(
    (order: IOrder) => {
      navigate(`${location.pathname}/${order.number}`, {
        state: { background: location },
      });
    },
    [navigate, location]
  );

  return (
    <div className="col-span-2">
      {orders.length === 0 && !error && <p className="text-center text-gray-400 text-lg">Загрузка заказов...</p>}
      {error && <p className="text-center text-red-500 text-lg">Ошибка загрузки заказов</p>}

      <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2">
        {sortedOrders.length > 0 &&
          sortedOrders.map((order) => (
            <div key={order._id} onClick={() => openModal(order)}>
              <OrdersItem order={order} />
            </div>
          ))}
      </div>
    </div>
  );
};
