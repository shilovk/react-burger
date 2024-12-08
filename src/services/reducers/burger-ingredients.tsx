import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREMENT_INGREDIENT_COUNT,
  DECREMENT_INGREDIENT_COUNT,
  RESET_INGREDIENT_COUNTS,
} from "../actions/burger-ingredients";
import { Ingredient } from "../../components/burger-ingredients/burger-ingredients.types";

interface BurgerIngredientsState {
  ingredients: Ingredient[];
  isLoading: boolean;
  hasError: boolean;
}

export const initialState: BurgerIngredientsState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: { type: string; payload: any },
): BurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      const ingredientsWithCount = action.payload.map(
        (ingredient: Ingredient) => ({
          ...ingredient,
          count: 0,
        }),
      );
      return {
        ...state,
        ingredients: ingredientsWithCount,
        isLoading: false,
        hasError: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case INCREMENT_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient._id === action.payload.id) {
            const incrementBy = action.payload.incrementBy;
            const currentCount =
              ingredient.count !== undefined ? ingredient.count : 0;
            const newCount =
              ingredient.type === "bun"
                ? Math.min(currentCount + incrementBy, 2)
                : currentCount + incrementBy;

            return {
              ...ingredient,
              count: newCount,
            };
          }
          return ingredient;
        }),
      };
    }
    case DECREMENT_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient._id === action.payload.id) {
            const decrementBy = action.payload.decrementBy;
            const currentCount =
              ingredient.count !== undefined ? ingredient.count : 0;
            const newCount = Math.max(currentCount - decrementBy, 0);

            return {
              ...ingredient,
              count: newCount,
            };
          }
          return ingredient;
        }),
      };
    }
    case RESET_INGREDIENT_COUNTS: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => ({
          ...ingredient,
          count: 0,
        })),
      };
    }
    default: {
      return state;
    }
  }
};
