import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_BUN, REORDER_INGREDIENTS, CLEAR_CONSTRUCTOR } from "../constants";
import type { BurgerConstructorActionTypes } from "../types";

interface BurgerConstructorState {
  ingredients: { id: string; uniqueId: string }[];
  bun: string | null;
}

export const initialState: BurgerConstructorState = {
  ingredients: [],
  bun: null,
};

export const burgerConstructorReducer = (
  state = initialState,
  action: BurgerConstructorActionTypes
): BurgerConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient) => ingredient.id !== action.payload),
      };
    }
    case SET_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case REORDER_INGREDIENTS: {
      const { dragIndex, hoverIndex } = action.payload;
      const updatedIngredients = [...state.ingredients];
      const [movedItem] = updatedIngredients.splice(dragIndex, 1);
      updatedIngredients.splice(hoverIndex, 0, movedItem);
      return { ...state, ingredients: updatedIngredients };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [],
        bun: null,
      };
    }
    default:
      return state;
  }
};
