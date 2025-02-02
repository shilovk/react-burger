import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Order from "../components/orders/order";
import { request } from "../utils/api";
import { RootState, useSelector, IOrder } from "../services/types";

export const OrderPage = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Сначала ищем заказ в WebSocket-хранилище
  const wsOrder = useSelector((state: RootState) => state.ws.orders?.find((item) => item.number === Number(id)));

  useEffect(() => {
    if (wsOrder) {
      setOrder(wsOrder);
      setLoading(false);
      return;
    }

    // Если заказа нет в WebSocket, загружаем через API с `request`
    request(`orders/${id}`)
      .then((data) => {
        if (!data.orders?.length) {
          throw new Error("Order not found");
        }
        setOrder(data.orders[0]);
      })
      .catch(() => {
        setError(true);
        navigate("/not-found", { replace: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, wsOrder, navigate]);

  if (loading) {
    return <div className="text-center text-lg">Загрузка заказа...</div>;
  }

  if (error || !order) {
    return null;
  }

  return (
    <div className={`${backgroundLocation ? "" : "flex items-center justify-center pt-20"}`}>
      <div className="max-h-[800px] max-w-[700px] z-[1050] flex flex-col items-center">
        <Order order={order} />
      </div>
    </div>
  );
};
