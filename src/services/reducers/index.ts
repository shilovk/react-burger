import { combineReducers } from "redux";
import { burgerIngredientsReducer, initialState as initialStateBurgerIngredients } from "./burger-ingredients";
import { burgerConstructorReducer, initialState as initialStateBurgerConstructor } from "./burger-constructor";
import { ingredientDetailsReducer, initialState as initialStateIngredientDetails } from "./ingredient-details";
import { orderReducer, initialState as initialStateOrder } from "./order";
import { tabReducer, initialState as initialStateTab } from "./tab";
import { registerReducer, initialState as initialStateRegister } from "./register";
import { resetPasswordReducer, initialState as initialStateResetPassword } from "./reset-password";
import { loginReducer, initialState as initialStateLogin } from "./login";
import { forgotPasswordReducer, initialState as initialStateForgotPassword } from "./forgot-password";
import { profileReducer, initialState as initialStateProfile } from "./profile";
import { ws, initialState as initialStateWS } from "./ws";

export const initialStateRoot = {
  burgerIngredients: initialStateBurgerIngredients,
  burgerConstructor: initialStateBurgerConstructor,
  ingredientDetails: initialStateIngredientDetails,
  order: initialStateOrder,
  tab: initialStateTab,
  register: initialStateRegister,
  resetPassword: initialStateResetPassword,
  login: initialStateLogin,
  forgotPassword: initialStateForgotPassword,
  profile: initialStateProfile,
  ws: initialStateWS,
};

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  tab: tabReducer,
  order: orderReducer,
  register: registerReducer,
  resetPassword: resetPasswordReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,
  ws: ws,
});
