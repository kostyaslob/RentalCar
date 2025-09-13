// import css from "./App.module.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
// import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";
import Layout from "./components/Layout/Layout";

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          {/* <Route path="/catalog/:id" element={<CarDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Route>
      </Routes>
    </>
  );
}
