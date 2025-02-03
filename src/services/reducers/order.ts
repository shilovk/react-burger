import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE } from "../constants";
import type { OrderActionTypes } from "../types";

interface OrderState {
  orderNumber: number | null;
  isOrderLoading: boolean;
  hasOrderError: boolean;
}

export const initialState: OrderState = {
  orderNumber: null,
  isOrderLoading: false,
  hasOrderError: false,
};

export const orderReducer = (state = initialState, action: OrderActionTypes): OrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, isOrderLoading: true, hasOrderError: false };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isOrderLoading: false,
        orderNumber: action.payload.orderNumber,
      };
    case CREATE_ORDER_FAILURE:
      return { ...state, isOrderLoading: false, hasOrderError: true };
    default:
      return state;
  }
};
