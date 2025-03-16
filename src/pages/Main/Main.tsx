import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import recipeService from "../../services/recipeServices";
import {
  Pagination,
  CircularProgress,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { RecipeCard, Filter } from "../../components";
import { MealType } from "../../types";
import styles from "./Main.module.css";

const ITEMS_PER_PAGE = 15;

interface Filters {
  search: string;
  category: string;
  area: string;
}

const Main = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    area: "",
  });
  const isMobile = useMediaQuery("(max-width:600px)");

  const {
    data: recipes = [] as MealType[],
    isLoading,
    error,
  } = useQuery<MealType[]>({
    queryKey: ["recipes"],
    queryFn: () => recipeService.getRecipe(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  useEffect(() => {
    setPage(1);
  }, [filters, isMobile]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.strMeal
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCategory =
        !filters.category || recipe.strCategory === filters.category;
      const matchesArea = !filters.area || recipe.strArea === filters.area;

      return matchesSearch && matchesCategory && matchesArea;
    });
  }, [recipes, filters]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p>Error loading recipes</p>
      </div>
    );
  }

  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const renderContent = () => {
    if (filteredRecipes.length === 0) {
      return (
        <Box className={styles.noResults}>
          <Typography variant="h6" component="p">
            No recipes found for the selected filters:
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {filters.search && `Search: "${filters.search}"`}
            {filters.category &&
              `${filters.search ? " • " : ""}Category: "${filters.category}"`}
            {filters.area &&
              `${filters.search || filters.category ? " • " : ""}Area: "${
                filters.area
              }"`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your filters or search criteria
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <div className={styles.recipesGrid}>
          {paginatedRecipes.map((recipe: MealType) => (
            <div key={recipe.idMeal} className={styles.recipeItem}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            color="primary"
            shape="rounded"
            size={isMobile ? "small" : "medium"}
            siblingCount={isMobile ? 0 : 2}
            boundaryCount={isMobile ? 0 : 1}
          />
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <Filter onFilterChange={setFilters} />
      {renderContent()}
    </div>
  );
};

export default Main;
