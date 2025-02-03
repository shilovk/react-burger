import { AppDispatch } from "../types";
import { request } from "../../utils/api";
import { clearConstructor } from "./burger-constructor";
import { resetIngredientCounts } from "./burger-ingredients";

export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";

interface CreateOrderRequestAction {
  type: typeof CREATE_ORDER_REQUEST;
}

interface CreateOrderSuccessAction {
  type: typeof CREATE_ORDER_SUCCESS;
  payload: { orderNumber: number };
}

interface CreateOrderFailureAction {
  type: typeof CREATE_ORDER_FAILURE;
  error: string;
}

export type OrderActionTypes = CreateOrderRequestAction | CreateOrderSuccessAction | CreateOrderFailureAction;

export const createOrder = (ingredientIds: string[]) => (dispatch: AppDispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  request("orders", {
    method: "POST",
    headers: {
      Authorization: sessionStorage.getItem("accessToken") || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  })
    .then((data) => {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: { orderNumber: data.order.number },
      });

      // Очистка конструктора и сброс счетчиков
      dispatch(clearConstructor());
      dispatch(resetIngredientCounts());
    })
    .catch((error) => {
      dispatch({ type: CREATE_ORDER_FAILURE, error: error.message });
    });
};
