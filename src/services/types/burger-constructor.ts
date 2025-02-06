import { ADD_INGREDIENT, CLEAR_CONSTRUCTOR, REMOVE_INGREDIENT, REORDER_INGREDIENTS, SET_BUN } from "../constants";

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
