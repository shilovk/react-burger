import { BASE_URL } from "../../components/@types/api";
import { checkResponse } from "../../utils/api";
import { Dispatch } from "redux";
import { RootState } from "../reducers/reducers";
import { ThunkAction } from "redux-thunk";
import { clearConstructor } from "./burger-constructor";
import { resetIngredientCounts } from "./burger-ingredients";

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
  return async (
    dispatch: Dispatch<
      | OrderActionTypes
      | ReturnType<typeof clearConstructor>
      | ReturnType<typeof resetIngredientCounts>
    >,
  ) => {
    dispatch({ type: CREATE_ORDER_REQUEST });

    fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: { orderNumber: data.order.number },
        });

        // Очистка конструктора и сброс счетчиков
        dispatch(clearConstructor());
        dispatch(resetIngredientCounts());
      })
      .catch(() => {
        dispatch({ type: CREATE_ORDER_FAILURE });
      });
  };
};
