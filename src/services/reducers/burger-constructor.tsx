import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_BUN,
  REORDER_INGREDIENTS,
  CLEAR_CONSTRUCTOR,
} from "../actions/burger-constructor";

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
  action: { type: string; payload?: any },
): BurgerConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case REMOVE_INGREDIENT: {
      const ingredientIdToRemove = action.payload;

      // Найдем индекс первого найденного ингредиента с таким ID
      const indexToRemove = state.ingredients.findIndex(
        (id) => id === ingredientIdToRemove,
      );

      // Если такой ингредиент найден, удалим его
      if (indexToRemove !== -1) {
        const updatedIngredients = [...state.ingredients];
        updatedIngredients.splice(indexToRemove, 1);

        return {
          ...state,
          ingredients: updatedIngredients,
        };
      }

      return state;
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
