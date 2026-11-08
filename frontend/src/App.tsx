import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import CatalogPage from "./pages/CatalogPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalogue" element={<CatalogPage />} />
        <Route path="produits/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;