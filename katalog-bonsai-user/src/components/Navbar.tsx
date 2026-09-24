import { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import { Menu, UserRound, X } from "lucide-react";
import logoFull from "../assets/logo-bonsai-gerung.png";
import logoIcon from "../assets/logo-bonsai-icon.png";

// Membuat component Navbar untuk seluruh halaman User.
export default function Navbar() {
  // Menyimpan status apakah menu mobile sedang terbuka.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mendefinisikan daftar menu navigasi.
  const navigation = [
    // Menu untuk halaman Beranda.
    { label: "Beranda", path: "/" },

    // Menu untuk halaman Katalog.
    { label: "Katalog", path: "/katalog" },

    // Menu untuk halaman Tentang Kami.
    { label: "Tentang Kami", path: "/tentang" },

    // Menu untuk halaman Kontak.
    { label: "Kontak", path: "/kontak" },
  ];

  // Fungsi untuk menutup menu mobile setelah user memilih halaman.
  const closeMobileMenu = () => {
    // Mengubah status menu menjadi tertutup.
    setIsMenuOpen(false);
  };

  // Mengembalikan tampilan Navbar.
  return (
    // Header dibuat sticky agar tetap terlihat saat user melakukan scroll.
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 shadow-md backdrop-blur">
      {/* Container utama Navbar. */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Area logo. */}
        <Link
          // Tujuan logo adalah halaman Beranda.
          to="/"
          // Menutup menu mobile jika logo diklik.
          onClick={closeMobileMenu}
          // Memberikan aksesibilitas untuk logo.
          aria-label="Bonsai Gerung - Beranda"
          // Mengatur tampilan area logo.
          className="flex items-center"
        >
          {/* Logo lengkap untuk desktop. */}
          <img
            // Menggunakan logo lengkap.
            src={logoFull}
            // Memberikan teks alternatif.
            alt="Bonsai Gerung"
            // Menampilkan logo hanya pada layar medium ke atas.
            className="hidden h-12 w-auto object-contain sm:block"
          />

          {/* Logo emblem untuk layar kecil. */}
          <img
            // Menggunakan logo emblem.
            src={logoIcon}
            // Memberikan teks alternatif.
            alt="Bonsai Gerung"
            // Menampilkan logo emblem hanya pada layar kecil.
            className="block h-12 w-12 object-contain sm:hidden"
          />
        </Link>

        {/* Navigasi desktop. */}
        <nav
          // Memberikan label accessibility pada navigasi.
          aria-label="Navigasi utama"
          // Menyembunyikan navigasi pada ukuran mobile.
          className="hidden items-center gap-8 md:flex"
        >
          {/* Melakukan perulangan pada daftar navigasi. */}
          {navigation.map((item) => (
            // Menggunakan NavLink agar menu aktif dapat diketahui otomatis.
            <NavLink
              // Menggunakan path sebagai key React.
              key={item.path}
              // Menentukan tujuan navigasi.
              to={item.path}
              // Mengatur style berdasarkan status aktif.
              className={({ isActive }) =>
                [
                  // Style dasar semua menu.
                  "relative py-2 text-sm font-medium transition-colors",

                  // Warna menu ketika tidak aktif.
                  isActive ? "text-primary" : "text-slate-600",

                  // Warna menu ketika mouse diarahkan.
                  "hover:text-primary",

                  // Menambahkan pseudo-element melalui utility Tailwind.
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all",

                  // Menentukan lebar garis bawah berdasarkan status aktif.
                  isActive ? "after:w-full" : "after:w-0",
                ].join(" ")
              }
            >
              {/* Menampilkan label navigasi. */}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Area kanan Navbar desktop. */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Tombol login User. */}
          <Link
            // Mengarahkan user ke halaman login.
            to="/login"
            // Mengatur tampilan tombol login.
            className="flex items-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            {/* Icon user. */}
            <UserRound size={17} />

            {/* Label tombol. */}
            Login
          </Link>
        </div>

        {/* Tombol menu mobile. */}
        <button
          // Button tidak boleh melakukan submit form.
          type="button"
          // Mengubah status menu mobile.
          onClick={() => setIsMenuOpen((value) => !value)}
          // Memberikan aksesibilitas.
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          // Memberikan tooltip browser.
          title={isMenuOpen ? "Tutup menu" : "Buka menu"}
          // Styling tombol.
          className="flex h-10 w-10 items-center justify-center rounded-xl text-primary transition hover:bg-primary/10 md:hidden"
        >
          {/* Menampilkan icon berdasarkan status menu. */}
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Menu mobile. */}
      {isMenuOpen && (
        // Container menu mobile.
        <div className="border-t border-border bg-white shadow-md md:hidden">
          {/* Isi menu mobile. */}
          <div className="mx-auto max-w-7xl px-5 py-5">
            {/* Daftar menu mobile. */}
            <nav
              // Label accessibility navigasi.
              aria-label="Navigasi mobile"
              // Mengatur daftar menu menjadi vertikal.
              className="flex flex-col gap-1"
            >
              {/* Mengulang semua menu navigasi. */}
              {navigation.map((item) => (
                // NavLink digunakan agar menu aktif tetap terlihat.
                <NavLink
                  // Menggunakan path sebagai key.
                  key={item.path}
                  // Menentukan tujuan navigasi.
                  to={item.path}
                  // Menutup menu setelah user memilih halaman.
                  onClick={closeMobileMenu}
                  // Mengatur tampilan berdasarkan status aktif.
                  className={({ isActive }) =>
                    [
                      // Styling dasar item menu mobile.
                      "rounded-xl px-4 py-3 text-sm font-medium transition",

                      // Memberikan warna berbeda untuk menu aktif.
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-700 hover:bg-primary/10 hover:text-primary",
                    ].join(" ")
                  }
                >
                  {/* Menampilkan label menu. */}
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Tombol login pada menu mobile. */}
            <Link
              // Mengarahkan ke halaman login.
              to="/login"
              // Menutup menu ketika tombol dipilih.
              onClick={closeMobileMenu}
              // Styling tombol login mobile.
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-light"
            >
              {/* Icon user. */}
              <UserRound size={17} />

              {/* Teks tombol login. */}
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
