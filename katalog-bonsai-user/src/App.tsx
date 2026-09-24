import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import UserLayout from "./layouts/UserLayout";

// Membuat component utama aplikasi.
export default function App() {
  // Mengembalikan struktur routing aplikasi.
  return (
    // BrowserRouter mengaktifkan sistem routing berbasis URL.
    <BrowserRouter>
      {/* Routes menampung semua halaman aplikasi. */}
      <Routes>
        {/* Route untuk seluruh halaman User yang menggunakan layout. */}
        <Route element={<UserLayout />}>
          {/* Route halaman Beranda. */}
          <Route path="/" element={<Home />} />
        </Route>

        {/* Route halaman Login. */}
        <Route path="/login" element={<Login />} />

        {/* Semua URL yang belum tersedia diarahkan ke Beranda. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}