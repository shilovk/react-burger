import { AppDispatch } from "../types";
import { request } from "../../utils/api";
import { clearConstructor } from "./burger-constructor";
import { resetIngredientCounts } from "./burger-ingredients";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE } from "../constants";

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
