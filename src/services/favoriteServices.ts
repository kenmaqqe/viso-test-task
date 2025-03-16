import { MealType } from "../types";

class FavoriteServices {
  static addFavoriteRecipe(recipe: MealType) {
    const favoriteRecipes = JSON.parse(
      localStorage.getItem("favoriteRecipes") || "[]"
    );
    favoriteRecipes.push(recipe);
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }
}

export default FavoriteServices;
