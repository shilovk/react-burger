import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./reducers/reducers";
import { socketMiddleware } from "./middleware";
import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from "./action-types";
import type { TWSStoreActions } from "./types";

const wsUrl = "wss://norma.nomoreparties.space";

const wsActions: TWSStoreActions = {
  wsClearOrders: WS_CLEAR_ORDERS,
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsUrl, wsActions), logger),
  devTools: process.env.NODE_ENV !== "production",
});
