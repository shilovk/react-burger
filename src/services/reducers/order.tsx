import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from "../actions/order";

interface OrderState {
  orderNumber: number | null;
  isLoading: boolean;
  hasError: boolean;
}

export const initialState: OrderState = {
  orderNumber: null,
  isLoading: false,
  hasError: false,
};

export const orderReducer = (state = initialState, action: any): OrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, isLoading: true, hasError: false };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderNumber: action.payload.orderNumber,
      };
    case CREATE_ORDER_FAILURE:
      return { ...state, isLoading: false, hasError: true };
    default:
      return state;
  }
};
