// actions/order.ts
import { Dispatch } from "redux";
import { RootState } from "../reducers/reducers";
import { ThunkAction } from "redux-thunk";

export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";

interface CreateOrderSuccessAction {
  type: typeof CREATE_ORDER_SUCCESS;
  payload: { orderNumber: number };
}

interface CreateOrderFailureAction {
  type: typeof CREATE_ORDER_FAILURE;
}

interface CreateOrderRequestAction {
  type: typeof CREATE_ORDER_REQUEST;
}

export type OrderActionTypes =
  | CreateOrderSuccessAction
  | CreateOrderFailureAction
  | CreateOrderRequestAction;

export const createOrder = (
  ingredientIds: string[],
): ThunkAction<void, RootState, unknown, OrderActionTypes> => {
  return async (dispatch: Dispatch<OrderActionTypes>) => {
    dispatch({ type: CREATE_ORDER_REQUEST });

    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients: ingredientIds }),
        },
      );

      if (!response.ok) {
        throw new Error("Ошибка при создании заказа");
      }

      const data = await response.json();

      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data.order.number,
      });
    } catch (error) {
      dispatch({ type: CREATE_ORDER_FAILURE });
    }
  };
};
