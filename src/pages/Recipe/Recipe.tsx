import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import recipeService from "../../services/recipeServices";
import { ScrollableContent } from "../../components";

const StyledContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  boxSizing: "border-box",
  overflow: "hidden",
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

  const handleBack = () => {
    navigate("/");
  };

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

  return (
    <StyledContainer maxWidth="xl">
      <ScrollableContent recipe={recipe} onBack={handleBack} />
    </StyledContainer>
  );
};

export default Recipe;
