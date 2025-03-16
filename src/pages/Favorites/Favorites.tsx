import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  IconButton,
  Grid,
} from "@mui/material";
import { useFavorites } from "../../context/FavoriteContext";
import { MealType } from "../../types";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const combinedIngredients = favorites.reduce((acc, recipe: MealType) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`] || "1";
      if (ingredient) {
        const key = ingredient.toLowerCase();
        if (!acc[key]) {
          acc[key] = { ingredient, measure: 0 };
        }
        const measureValue = parseFloat(measure);
        acc[key].measure += isNaN(measureValue) ? 1 : measureValue;
      }
    }
    return acc;
  }, {} as Record<string, { ingredient: string; measure: number }>);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Favorite Recipes
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <List sx={{ mb: 4 }}>
            {favorites.map((recipe) => (
              <ListItem
                key={recipe.idMeal}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #ddd",
                  py: 1,
                }}
              >
                <Typography variant="h6">{recipe.strMeal}</Typography>
                <IconButton
                  onClick={() => removeFromFavorites(recipe.idMeal)}
                  aria-label="Remove from favorites"
                >
                  🗑️
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom>
            Total Ingredients
          </Typography>
          <List
            sx={{
              maxHeight: 300,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: 1,
            }}
          >
            {Object.values(combinedIngredients).map((item, index) => (
              <ListItem
                key={index}
                sx={{ borderBottom: "1px solid #ddd", py: 1 }}
              >
                <Typography variant="body1">
                  {item.measure} {item.ingredient}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Favorites;
