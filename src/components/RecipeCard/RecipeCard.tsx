import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MealType } from "../../types";
import { useFavorites } from "../../context/FavoriteContext/FavoriteContext";

interface RecipeCardProps {
  recipe: MealType;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isRecipeFavorite = favorites.some(
    (fav) => fav.idMeal === recipe.idMeal
  );

  const handleClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRecipeFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <Card
          sx={{
            cursor: "pointer",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            maxWidth: 345,
            "&:hover": {
              transform: "scale(1.02)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
          onClick={handleClick}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="200"
              image={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
              onClick={handleFavoriteClick}
              aria-label={
                isRecipeFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isRecipeFavorite ? (
                <img
                  src="https://www.svgrepo.com/show/41271/starfish.svg"
                  alt="favorite-icon"
                  style={{ width: "24px", height: "24px" }}
                />
              ) : (
                <img
                  src="https://www.svgrepo.com/show/16311/favorite.svg"
                  alt="favorite-icon"
                  style={{ width: "24px", height: "24px" }}
                />
              )}
            </IconButton>
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" gutterBottom noWrap>
              {recipe.strMeal}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {recipe.strCategory} • {recipe.strArea}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RecipeCard;
