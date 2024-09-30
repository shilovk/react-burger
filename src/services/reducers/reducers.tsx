import { combineReducers } from "redux";
import {
  burgerIngredientsReducer,
  initialState as initialStateBurgerIngredients,
} from "./burger-ingredients";
import {
  burgerConstructorReducer,
  initialState as initialStateBurgerConstructor,
} from "./burger-constructor";
import {
  ingredientDetailsReducer,
  initialState as initialStateIngredientDetails,
} from "./ingredient-details";
import { orderReducer, initialState as initialStateOrder } from "./order";
import { tabReducer, initialState as initialStateTab } from "./tab";

export const initialStateRoot = {
  burgerIngredients: initialStateBurgerIngredients,
  burgerConstructor: initialStateBurgerConstructor,
  ingredientDetails: initialStateIngredientDetails,
  order: initialStateOrder,
  tab: initialStateTab,
};

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  tab: tabReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
