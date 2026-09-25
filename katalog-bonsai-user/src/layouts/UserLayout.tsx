import { Outlet } from "react-router-dom"; // Mengambil Outlet untuk menampilkan halaman aktif dari React Router.
import Navbar from "../components/Navbar";

// Membuat layout utama User.
export default function UserLayout() {
  // Mengembalikan struktur layout.
  return (
    // Wrapper utama aplikasi User.
    <div className="min-h-screen bg-cream text-dark">
      {/* Navbar selalu ditampilkan pada halaman User. */}
      <Navbar />

      {/* Main menjadi tempat halaman aktif ditampilkan. */}
      <main>
        {/* Outlet akan diganti dengan halaman sesuai route. */}
        <Outlet />
      </main>
    </div>
  );
}