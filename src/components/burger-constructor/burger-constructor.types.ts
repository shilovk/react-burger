interface Ingredient {
  _id: string;
  name: string;
  price: number;
  image_large: string;
}

export interface IngredientProps {
  ingredients: Ingredient[];
}
