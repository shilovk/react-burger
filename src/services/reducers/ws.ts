import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../constants";
import type { IOrdersResponse, TWSActionsTypes } from "../types";

type TWSState = {
  wsConnected: boolean;
  orders: IOrdersResponse["orders"];
  total: number;
  totalToday: number;
  error?: Event | Error;
};

export const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const ws = (state = initialState, action: TWSActionsTypes): TWSState => {
  switch (action.type) {
    case WS_CLEAR_ORDERS:
      return {
        ...state,
        orders: [],
        total: 0,
        totalToday: 0,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
