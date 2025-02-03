import { ws, initialState } from "./ws";
import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../constants";
import type { TWSActionsTypes } from "../types";
import type { IOrdersResponse, IOrder } from "../types";

describe("ws reducer", () => {
  const mockOrder: IOrder = {
    _id: "1",
    status: "done",
    number: 123,
    name: "Burger",
    ingredients: ["123", "456"],
    createdAt: "2024-02-04T12:00:00Z",
    updatedAt: "2024-02-04T12:30:00Z",
  };

  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(ws(undefined, {} as TWSActionsTypes)).toEqual(initialState);
  });

  it("должен очищать заказы при `WS_CLEAR_ORDERS`", () => {
    const stateWithOrders = {
      ...initialState,
      orders: [mockOrder],
      total: 100,
      totalToday: 10,
    };

    expect(ws(stateWithOrders, { type: WS_CLEAR_ORDERS })).toEqual({
      ...initialState,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it("должен устанавливать `wsConnected: true` при `WS_CONNECTION_SUCCESS`", () => {
    expect(ws(initialState, { type: WS_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined,
    });
  });

  it("должен устанавливать `wsConnected: false` и передавать ошибку при `WS_CONNECTION_ERROR`", () => {
    const mockError = new Event("error");
    expect(ws(initialState, { type: WS_CONNECTION_ERROR, payload: mockError })).toEqual({
      ...initialState,
      wsConnected: false,
      error: mockError,
    });
  });

  it("должен устанавливать `wsConnected: false` при `WS_CONNECTION_CLOSED`", () => {
    const stateWithConnection = { ...initialState, wsConnected: true };
    expect(ws(stateWithConnection, { type: WS_CONNECTION_CLOSED })).toEqual({
      ...stateWithConnection,
      wsConnected: false,
      error: undefined,
    });
  });

  it("должен обновлять заказы при `WS_GET_ORDERS`", () => {
    const mockOrders: IOrdersResponse = {
      success: true,
      orders: [mockOrder],
      total: 200,
      totalToday: 20,
    };

    expect(ws(initialState, { type: WS_GET_ORDERS, payload: mockOrders })).toEqual({
      ...initialState,
      orders: mockOrders.orders,
      total: mockOrders.total,
      totalToday: mockOrders.totalToday,
      error: undefined,
    });
  });
});
