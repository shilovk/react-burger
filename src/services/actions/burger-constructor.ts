import { v4 as uuidv4 } from "uuid";
import { incrementIngredientCount, decrementIngredientCount } from "./burger-ingredients";
import { AppDispatch } from "../types";
import { ADD_INGREDIENT, REORDER_INGREDIENTS, REMOVE_INGREDIENT, SET_BUN, CLEAR_CONSTRUCTOR } from "../constants";

export const addIngredient = (id: string) => (dispatch: AppDispatch) => {
  dispatch(incrementIngredientCount(id));
  dispatch({
    type: ADD_INGREDIENT,
    payload: {
      id,
      uniqueId: uuidv4(),
    },
  });
};

export const removeIngredient = (id: string) => (dispatch: AppDispatch) => {
  dispatch(decrementIngredientCount(id));
  dispatch({ type: REMOVE_INGREDIENT, payload: id });
};

export const setBun = (id: string) => (dispatch: AppDispatch, getState: any) => {
  const state = getState();
  const { bun: currentBun } = state.burgerConstructor;

  if (currentBun) {
    dispatch(decrementIngredientCount(currentBun, 2)); // Обнуляем старую булку
  }
  dispatch(incrementIngredientCount(id, 2));
  dispatch({ type: SET_BUN, payload: id });
};

export const reorderIngredients = (dragIndex: number, hoverIndex: number) => ({
  type: REORDER_INGREDIENTS,
  payload: { dragIndex, hoverIndex },
});

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR,
});
