// Mengambil BrowserRouter untuk mengaktifkan routing pada aplikasi.
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Mengambil halaman login user.
import Login from "./pages/auth/Login";

// Component utama aplikasi.
export default function App() {
  // Mengembalikan seluruh routing aplikasi.
  return (
    // BrowserRouter mengaktifkan navigasi berbasis URL.
    <BrowserRouter>
      {/* Routes menampung semua daftar route aplikasi. */}
      <Routes>
        {/* Route halaman login user. */}
        <Route
          /* URL halaman login. */
          path="/login"
          /* Component yang ditampilkan pada route tersebut. */
          element={<Login />}
        />

        {/* Route sementara untuk halaman utama. */}
        <Route
          /* URL halaman utama. */
          path="/"
          /* Untuk sementara diarahkan ke login. */
          element={<Navigate to="/login" replace />}
        />

        {/* Menangani URL yang belum memiliki route. */}
        <Route
          /* Tanda * berarti semua URL lain. */
          path="*"
          /* Mengarahkan URL yang tidak dikenal ke login. */
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}