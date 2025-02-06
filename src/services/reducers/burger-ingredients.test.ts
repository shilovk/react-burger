import { burgerIngredientsReducer, initialState, BurgerIngredientsState } from "./burger-ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREMENT_INGREDIENT_COUNT,
  DECREMENT_INGREDIENT_COUNT,
  RESET_INGREDIENT_COUNTS,
} from "../constants";
import type { BurgerIngredientsActionTypes } from "../types";
import type { Ingredient } from "../../components/burger-ingredients/burger-ingredients.types";

describe("burgerIngredientsReducer", () => {
  const mockIngredients: (Ingredient & { count: number })[] = [
    {
      _id: "1",
      name: "Bun",
      type: "bun",
      price: 10,
      count: 0,
      proteins: 5,
      fat: 3,
      carbohydrates: 20,
      calories: 150,
      image: "https://example.com/bun.png",
      image_mobile: "https://example.com/bun-mobile.png",
      image_large: "https://example.com/bun-large.png",
      __v: 1,
    },
    {
      _id: "2",
      name: "Patty",
      type: "main",
      price: 15,
      count: 0,
      proteins: 15,
      fat: 10,
      carbohydrates: 5,
      calories: 250,
      image: "https://example.com/patty.png",
      image_mobile: "https://example.com/patty-mobile.png",
      image_large: "https://example.com/patty-large.png",
      __v: 1,
    },
  ];

  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(burgerIngredientsReducer(undefined, {} as BurgerIngredientsActionTypes)).toEqual(initialState);
  });

  it("должен устанавливать `isLoading: true` при `GET_INGREDIENTS_REQUEST`", () => {
    expect(burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false,
    });
  });

  it("должен загружать ингредиенты при `GET_INGREDIENTS_SUCCESS`", () => {
    expect(burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_SUCCESS, payload: mockIngredients })).toEqual(
      {
        ...initialState,
        ingredients: mockIngredients.map((ingredient) => ({ ...ingredient, count: 0 })),
        isLoading: false,
        hasError: false,
      }
    );
  });

  it("должен устанавливать `hasError: true` при `GET_INGREDIENTS_FAILED`", () => {
    const errorMessage = "Ошибка загрузки ингредиентов"; // Добавляем сообщение об ошибке
    expect(burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED, error: errorMessage })).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
    });
  });

  it("должен увеличивать `count` ингредиента при `INCREMENT_INGREDIENT_COUNT`", () => {
    const stateWithIngredients: BurgerIngredientsState = {
      ...initialState,
      ingredients: mockIngredients,
    };

    expect(
      burgerIngredientsReducer(stateWithIngredients, {
        type: INCREMENT_INGREDIENT_COUNT,
        payload: { id: "2", incrementBy: 1 },
      })
    ).toEqual({
      ...stateWithIngredients,
      ingredients: mockIngredients.map((ingredient) =>
        ingredient._id === "2" ? { ...ingredient, count: 1 } : ingredient
      ),
    });
  });

  it("должен уменьшать `count` ингредиента при `DECREMENT_INGREDIENT_COUNT`", () => {
    const stateWithIngredients: BurgerIngredientsState = {
      ...initialState,
      ingredients: mockIngredients.map((ingredient) =>
        ingredient._id === "2" ? { ...ingredient, count: 2 } : ingredient
      ),
    };

    expect(
      burgerIngredientsReducer(stateWithIngredients, {
        type: DECREMENT_INGREDIENT_COUNT,
        payload: { id: "2", decrementBy: 1 },
      })
    ).toEqual({
      ...stateWithIngredients,
      ingredients: mockIngredients.map((ingredient) =>
        ingredient._id === "2" ? { ...ingredient, count: 1 } : ingredient
      ),
    });
  });

  it("должен сбрасывать `count` всех ингредиентов при `RESET_INGREDIENT_COUNTS`", () => {
    const stateWithCounts: BurgerIngredientsState = {
      ...initialState,
      ingredients: mockIngredients.map((ingredient) => ({ ...ingredient, count: 2 })),
    };

    expect(burgerIngredientsReducer(stateWithCounts, { type: RESET_INGREDIENT_COUNTS })).toEqual({
      ...stateWithCounts,
      ingredients: stateWithCounts.ingredients.map((ingredient) => ({ ...ingredient, count: 0 })),
    });
  });
});
