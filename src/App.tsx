import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main, Recipe, Favorites } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
