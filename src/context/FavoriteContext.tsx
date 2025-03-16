import React, { createContext, useContext, useState } from "react";
import { MealType } from "../types";

interface FavoriteContextType {
  favorites: MealType[];
  addToFavorites: (recipe: MealType) => void;
  removeFromFavorites: (recipeId: string) => void;
  favoritesCount: number;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<MealType[]>([]);

  const addToFavorites = (recipe: MealType) => {
    setFavorites((prev) => [...prev, recipe]);
  };

  const removeFromFavorites = (recipeId: string) => {
    setFavorites((prev) => prev.filter((recipe) => recipe.idMeal !== recipeId));
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoriteProvider");
  }
  return context;
};
