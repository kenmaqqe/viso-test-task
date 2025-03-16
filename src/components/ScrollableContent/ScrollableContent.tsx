import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MealType } from "../../types";
import { useFavorites } from "../../context/FavoriteContext";

const ScrollableWrapper = styled(Box)(() => ({
  flex: 1,
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
    "&:hover": {
      background: "#555",
    },
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

interface ScrollableContentProps {
  recipe: MealType;
  onBack: () => void;
}

const ScrollableContent = ({ recipe, onBack }: ScrollableContentProps) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <ScrollableWrapper>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button onClick={onBack}>{`< Back`}</Button>
        <Button
          onClick={handleFavoriteClick}
          color={isFavorite ? "error" : "primary"}
          sx={{ minWidth: "auto", px: 2 }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </Button>
      </Box>
      <StyledCard>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="800"
              image={recipe?.strMealThumb}
              alt={recipe?.strMeal}
              sx={{
                objectFit: "cover",
                borderRadius: 1,
                "@media (max-width: 1500px)": {
                  height: "1100px",
                },
                "@media (max-width: 900px)": {
                  height: "400px",
                },
                "@media (max-width: 600px)": {
                  height: "300px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h3" component="h1" gutterBottom>
                {recipe?.strMeal}
              </Typography>

              <Box mb={3}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Category & Origin
                </Typography>
                <Typography variant="body1">
                  {recipe?.strCategory} • {recipe?.strArea}
                </Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Instructions
                </Typography>
                <Typography variant="body1" paragraph>
                  {recipe?.strInstructions}
                </Typography>
              </Box>

              {recipe?.strTags && (
                <Box mb={3}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Tags
                  </Typography>
                  <Typography variant="body1">{recipe?.strTags}</Typography>
                </Box>
              )}

              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  External Links
                </Typography>
                {recipe?.strYoutube && (
                  <Link
                    href={recipe.strYoutube}
                    target="_blank"
                    display="block"
                    mb={1}
                  >
                    Watch on YouTube
                  </Link>
                )}
                {recipe?.strSource && (
                  <Link href={recipe.strSource} target="_blank" display="block">
                    Original Source
                  </Link>
                )}
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </StyledCard>
    </ScrollableWrapper>
  );
};

export default ScrollableContent;
