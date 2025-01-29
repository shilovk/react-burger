import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_START,
} from "../action-types";
import type { IOrdersResponse } from "./order.types";

export interface IWSClearOrders {
  readonly type: typeof WS_CLEAR_ORDERS;
  readonly payload?: any;
}

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: {
    endpoint: string;
  };
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload?: any;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload?: any;
}

export interface IWSGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: IOrdersResponse;
}

export type TWSActions =
  | IWSClearOrders
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetOrdersAction;
