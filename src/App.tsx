import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Main, Recipe, Favorites } from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteProvider } from "./context/FavoriteContext";
import { AppBar, Toolbar, Typography, Badge } from "@mui/material";
import { useFavorites } from "./context/FavoriteContext";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const NavigationBar = () => {
  const { favoritesCount } = useFavorites();

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "white",
            flexGrow: 1,
            "&:hover": {
              color: "rgba(255, 255, 255, 0.8)",
            },
          }}
        >
          Recipe App
        </Typography>
        <Link
          to="/favorites"
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: "24px",
          }}
        >
          <Badge badgeContent={favoritesCount} color="error">
            ❤️
          </Badge>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteProvider>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </FavoriteProvider>
    </QueryClientProvider>
  );
};

export default App;
