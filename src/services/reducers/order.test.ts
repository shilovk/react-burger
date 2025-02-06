import { orderReducer, initialState } from "./order";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE } from "../constants";
import type { OrderActionTypes } from "../types";

describe("orderReducer", () => {
  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(orderReducer(undefined, {} as OrderActionTypes)).toEqual(initialState);
  });

  it("должен устанавливать `isOrderLoading: true` при `CREATE_ORDER_REQUEST`", () => {
    expect(orderReducer(initialState, { type: CREATE_ORDER_REQUEST })).toEqual({
      ...initialState,
      isOrderLoading: true,
      hasOrderError: false,
    });
  });

  it("должен устанавливать `orderNumber` при `CREATE_ORDER_SUCCESS`", () => {
    const mockOrderNumber = 12345;

    expect(
      orderReducer(initialState, {
        type: CREATE_ORDER_SUCCESS,
        payload: { orderNumber: mockOrderNumber },
      })
    ).toEqual({
      ...initialState,
      isOrderLoading: false,
      orderNumber: mockOrderNumber,
    });
  });

  it("должен устанавливать `hasOrderError: true` при `CREATE_ORDER_FAILURE`", () => {
    const errorMessage = "Ошибка создания заказа";

    expect(orderReducer(initialState, { type: CREATE_ORDER_FAILURE, error: errorMessage })).toEqual({
      ...initialState,
      isOrderLoading: false,
      hasOrderError: true,
    });
  });
});
