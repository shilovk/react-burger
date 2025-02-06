import { store } from "../store";
import type { TWSActionsTypes } from "./ws";
import type { BurgerConstructorActionTypes } from "./burger-constructor";
import type { BurgerIngredientsActionTypes } from "./burger-ingredients";
import type { ForgotPasswordActionTypes } from "./forgot-password";
import type { IngredientDetailsActionTypes } from "./ingredient-details";
import type { LoginActionTypes } from "./login";
import type { OrderActionTypes } from "./order";
import type { ProfileActionTypes } from "./profile";
import type { RegisterActionTypes } from "./register";
import type { ResetPasswordActionTypes } from "./reset-password";
import type { TabActionTypes } from "./tab";

export type AppActions =
  | TWSActionsTypes
  | BurgerConstructorActionTypes
  | BurgerIngredientsActionTypes
  | ForgotPasswordActionTypes
  | IngredientDetailsActionTypes
  | LoginActionTypes
  | OrderActionTypes
  | ProfileActionTypes
  | RegisterActionTypes
  | ResetPasswordActionTypes
  | TabActionTypes;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
