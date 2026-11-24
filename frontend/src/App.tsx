import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import SellerLayout from "./components/seller/SellerLayout";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProducts from "./pages/seller/SellerProducts";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";

function App() {
  return (
    <Routes>
      {/* Partie publique */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* Espace vendeur */}
      <Route path="/vendeur" element={<SellerLayout />}>
        <Route index element={<SellerDashboard />} />
        <Route path="produits" element={<SellerProducts />} />
        <Route path="produits/nouveau" element={<AddProduct />} />
        <Route path="produits/:id/modifier" element={<EditProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
