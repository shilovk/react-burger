import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_START,
} from "../constants";
import type { IOrdersResponse } from "./order";

export type TWSStoreActions = {
  wsClearOrders: typeof WS_CLEAR_ORDERS;
  wsInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_ORDERS;
};

export interface IWSClearOrders {
  readonly type: typeof WS_CLEAR_ORDERS;
  readonly payload?: never;
}

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: {
    endpoint: string;
  };
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload?: never;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload?: never;
}

export interface IWSGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: IOrdersResponse;
}

export type TWSActionsTypes =
  | IWSClearOrders
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetOrdersAction;
