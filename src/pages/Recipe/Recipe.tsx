import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import recipeService from "../../services/recipeServices";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  boxSizing: "border-box",
  overflow: "hidden",
}));

const ScrollableContent = styled(Box)(({ theme }) => ({
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

const Recipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => recipeService.getRecipeById(id || ""),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography color="error">Error loading recipe</Typography>
      </Box>
    );
  }

  const handleBack = () => {
    navigate("/");
  };

  return (
    <StyledContainer maxWidth="xl">
      <ScrollableContent>
        <div>
          <Button onClick={handleBack}>{`< Back`}</Button>
        </div>
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
                  "@media (max-width: 1024px)": {
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
                    <Link
                      href={recipe.strSource}
                      target="_blank"
                      display="block"
                    >
                      Original Source
                    </Link>
                  )}
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </StyledCard>
      </ScrollableContent>
    </StyledContainer>
  );
};

export default Recipe;
