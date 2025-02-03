import { v4 as uuidv4 } from "uuid";
import { incrementIngredientCount, decrementIngredientCount } from "./burger-ingredients";
import { AppDispatch } from "../types";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_BUN = "SET_BUN";
export const REORDER_INGREDIENTS = "REORDER_INGREDIENTS";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

interface AddIngredientAction {
  type: typeof ADD_INGREDIENT;
  payload: { id: string; uniqueId: string };
}

interface RemoveIngredientAction {
  type: typeof REMOVE_INGREDIENT;
  payload: string;
}

interface SetBunAction {
  type: typeof SET_BUN;
  payload: string;
}

interface ReorderIngredientsAction {
  type: typeof REORDER_INGREDIENTS;
  payload: { dragIndex: number; hoverIndex: number };
}

interface ClearConstructorAction {
  type: typeof CLEAR_CONSTRUCTOR;
}

export type BurgerConstructorActionTypes =
  | AddIngredientAction
  | RemoveIngredientAction
  | SetBunAction
  | ReorderIngredientsAction
  | ClearConstructorAction;

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
