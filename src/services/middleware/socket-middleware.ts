import type { Middleware, MiddlewareAPI } from "redux";
import type { AppActions, TWSStoreActions, AppDispatch, RootState, IOrdersResponse } from "../types";

export const socketMiddleware = (baseWsUrl: string, wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AppActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const token = sessionStorage.getItem("accessToken");

      if (type === wsInit) {
        let wsUrl = baseWsUrl;
        const pathname = window.location.pathname; // Берем текущий путь

        if (pathname.startsWith("/feed")) {
          wsUrl = `${baseWsUrl}/orders/all`;
        } else {
          wsUrl = `${baseWsUrl}/orders`;
          if (token) {
            wsUrl += `?token=${token.replace("Bearer ", "")}`;
          }
        }

        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const parsedData: IOrdersResponse = JSON.parse(event.data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  }) as Middleware;
};
