import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import IngredientDetails from "../components/burger-ingredients/ingredient-details/ingredient-details";
import { RootState } from "../services/types";
import { Ingredient } from "../components/burger-ingredients/burger-ingredients.types";

export const IngredientDetailsPage = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ingredient = useSelector<RootState, Ingredient | undefined>((state) =>
    state.burgerIngredients.ingredients.find((item) => item._id === id)
  );

  useEffect(() => {
    if (ingredient === null) {
      navigate("/not-found", { replace: true });
    }
  }, [ingredient, navigate]);

  if (!ingredient) return null;

  return (
    <div className={`${backgroundLocation ? "" : "flex items-center justify-center pt-40"}`}>
      <div className="w-full text-center p-5 shadow-lg max-w-[600px] z-[1050] flex flex-col items-center">
        {!backgroundLocation && <h1 className="text text_type_main-large mb-4">Детали ингредиента</h1>}
        <IngredientDetails
          name={ingredient.name}
          image={ingredient.image}
          proteins={ingredient.proteins}
          fat={ingredient.fat}
          carbohydrates={ingredient.carbohydrates}
          calories={ingredient.calories}
          description={ingredient.description}
        />
      </div>
    </div>
  );
};
