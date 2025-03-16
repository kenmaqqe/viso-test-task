import { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import recipeService from "../../services/recipeServices";
import styles from "./Filter.module.css";

interface FilterProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    area: string;
  }) => void;
}

const Filter = ({ onFilterChange }: FilterProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => recipeService.getCategories(),
  });

  const { data: areas = [] } = useQuery({
    queryKey: ["areas"],
    queryFn: () => recipeService.getAreas(),
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({ search, category, area });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, category, area, onFilterChange]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleAreaChange = (event: SelectChangeEvent) => {
    setArea(event.target.value);
  };

  return (
    <Box className={styles.filter}>
      <TextField
        label="Search recipes"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        className={styles.searchField}
      />
      <FormControl className={styles.select}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={styles.select}>
        <InputLabel>Area</InputLabel>
        <Select value={area} label="Area" onChange={handleAreaChange}>
          <MenuItem value="">All</MenuItem>
          {areas.map((ar) => (
            <MenuItem key={ar} value={ar}>
              {ar}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
