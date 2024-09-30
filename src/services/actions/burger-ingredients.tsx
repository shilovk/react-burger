export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const INCREMENT_INGREDIENT_COUNT = "INCREMENT_INGREDIENT_COUNT";
export const DECREMENT_INGREDIENT_COUNT = "DECREMENT_INGREDIENT_COUNT";

export const incrementIngredientCount = (id: string, incrementBy = 1) => ({
  type: INCREMENT_INGREDIENT_COUNT,
  payload: { id, incrementBy },
});

export const decrementIngredientCount = (id: string, decrementBy = 1) => ({
  type: DECREMENT_INGREDIENT_COUNT,
  payload: { id, decrementBy },
});

export const getIngredients = () => {
  return async (
    dispatch: (arg0: { type: string; payload?: any; error?: any }) => void,
  ) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });

    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/ingredients",
      );
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const data = await response.json();
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch({ type: GET_INGREDIENTS_FAILED, error: error.message });
    }
  };
};
