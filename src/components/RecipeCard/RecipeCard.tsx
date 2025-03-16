import { MealType } from "../../types";
import { Button } from "@mui/material";
import styles from "./RecipeCard.module.css";

interface RecipeCardProps {
  recipe: MealType;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const handleRecipeClick = () => {
    console.log("Recipe details:", recipe);
  };

  return (
    <div className={styles.card} onClick={handleRecipeClick}>
      <img
        className={styles.media}
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.strMeal}</h3>
        <p className={styles.subtitle}>{recipe.strCategory}</p>
        <p className={styles.subtitle}>{recipe.strArea}</p>
      </div>
      <div className={styles.actions}>
        <Button size="small" variant="contained">
          Add to favorite
        </Button>
        <Button size="small" variant="contained">
          Read more
        </Button>
      </div>
    </div>
  );
};

export default RecipeCard;
