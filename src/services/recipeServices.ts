import axios from "axios";
import { MealType, CategoryType, AreaType } from "../types";

interface MealDBResponse {
  meals: MealType[] | null;
}

interface CategoryDBResponse {
  meals: CategoryType[] | null;
}

interface AreaDBResponse {
  meals: AreaType[] | null;
}

class RecipeServices {
  private readonly baseUrl = "https://www.themealdb.com/api/json/v1/1";
  private readonly axiosInstance = axios.create({
    baseURL: this.baseUrl,
  });

  async getRecipe(): Promise<MealType[]> {
    try {
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      const allRecipes = await Promise.all(
        alphabet.map((letter) =>
          this.axiosInstance.get<MealDBResponse>(`/search.php?f=${letter}`)
        )
      );

      const recipes = allRecipes
        .map((response) => response.data.meals || [])
        .flat();

      return recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  }

  async searchByName(query: string): Promise<MealType[]> {
    try {
      const response = await this.axiosInstance.get<MealDBResponse>(
        `/search.php?s=${encodeURIComponent(query)}`
      );
      return response.data.meals || [];
    } catch (error) {
      console.error(`Error searching recipes by name: ${query}`, error);
      return [];
    }
  }

  async getRecipeById(id: string): Promise<MealType | null> {
    try {
      const response = await this.axiosInstance.get<MealDBResponse>(
        `/lookup.php?i=${id}`
      );
      return response.data.meals?.[0] || null;
    } catch (error) {
      console.error(`Error fetching recipe by id: ${id}`, error);
      return null;
    }
  }

  async getRandomRecipe(): Promise<MealType | null> {
    try {
      const response = await this.axiosInstance.get<MealDBResponse>(
        "/random.php"
      );
      return response.data.meals?.[0] || null;
    } catch (error) {
      console.error("Error fetching random recipe:", error);
      return null;
    }
  }

  async getRecipesByCategory(category: string): Promise<MealType[]> {
    try {
      const response = await this.axiosInstance.get<MealDBResponse>(
        `/filter.php?c=${encodeURIComponent(category)}`
      );
      return response.data.meals || [];
    } catch (error) {
      console.error(`Error fetching recipes by category: ${category}`, error);
      return [];
    }
  }

  async getRecipesByArea(area: string): Promise<MealType[]> {
    try {
      const response = await this.axiosInstance.get<MealDBResponse>(
        `/filter.php?a=${encodeURIComponent(area)}`
      );
      return response.data.meals || [];
    } catch (error) {
      console.error(`Error fetching recipes by area: ${area}`, error);
      return [];
    }
  }

  async getRecipesByFirstLetter(letter: string): Promise<MealType[]> {
    try {
      const response = await this.axiosInstance.get<MealDBResponse>(
        `/search.php?f=${letter.charAt(0)}`
      );
      return response.data.meals || [];
    } catch (error) {
      console.error(`Error fetching recipes by first letter: ${letter}`, error);
      return [];
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await this.axiosInstance.get<CategoryDBResponse>(
        "/list.php?c=list"
      );
      return response.data.meals?.map((meal) => meal.strCategory) || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  async getAreas(): Promise<string[]> {
    try {
      const response = await this.axiosInstance.get<AreaDBResponse>(
        "/list.php?a=list"
      );
      return response.data.meals?.map((meal) => meal.strArea) || [];
    } catch (error) {
      console.error("Error fetching areas:", error);
      return [];
    }
  }
}

export default new RecipeServices();
