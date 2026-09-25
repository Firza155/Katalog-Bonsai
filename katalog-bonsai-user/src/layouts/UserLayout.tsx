import { Outlet } from "react-router-dom"; // Mengambil Outlet untuk menampilkan halaman aktif dari React Router.
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 

// Membuat layout utama User.
export default function UserLayout() {
  // Mengembalikan struktur layout.
  return (
    // Wrapper utama aplikasi User.
    <div className="min-h-screen bg-cream text-dark">
      {/* Navbar selalu ditampilkan pada halaman User. */}
      <Navbar />

      {/* Main menjadi tempat halaman aktif ditampilkan. */}
      <main className="flex-1">
        {/* Outlet akan diganti dengan halaman sesuai route. */}
        <Outlet />
      </main>

      {/* Footer selalu berada di bagian bawah website. */}
      <Footer />
    </div>
  );
}