import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import UserLayout from "./layouts/UserLayout";
import BonsaiDetail from "./pages/catalog/BonsaiDetail";
import About from "./pages/about/About";

// Membuat component utama aplikasi.
export default function App() {
  return (
    // Mengaktifkan routing browser.
    <BrowserRouter>
      {/* Mendefinisikan seluruh route. */}
      <Routes>
        {/* Semua halaman customer menggunakan UserLayout. */}
        <Route element={<UserLayout />}>
          {/* Halaman Beranda. */}
          <Route path="/" element={<Home />} />

          {/* Halaman Katalog. */}
          <Route path="/katalog" element={<Catalog />} />

          {/* Route untuk detail satu bonsai berdasarkan ID. */}
          <Route path="/katalog/:id" element={<BonsaiDetail />} />

          {/* Route untuk detail satu bonsai berdasarkan ID. */}
          <Route path="/tentang" element={<About />} />
        </Route>

        {/* Halaman Login. */}
        <Route path="/login" element={<Login />} />

        {/* URL yang belum tersedia diarahkan ke Beranda. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}