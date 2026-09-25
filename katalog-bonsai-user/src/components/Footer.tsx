import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { contactData } from "../data/contactData";
import logoBonsaiGerung from "../assets/logo-bonsai-gerung.png";

// Membuat komponen Footer.
export default function Footer() {
  // Menghasilkan tahun saat ini secara otomatis.
  // Dengan cara ini kita tidak perlu mengubah tahun secara manual setiap tahun.
  const currentYear = new Date().getFullYear();

  // Mengembalikan tampilan Footer.
  return (
    // Elemen footer utama.
    // Warna dibuat hijau gelap agar menjadi penutup visual dari halaman.
    <footer className="bg-primary text-white">
      {/* Container utama untuk membatasi lebar konten. */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Grid utama Footer.
            Pada mobile menjadi satu kolom,
            kemudian menjadi beberapa kolom pada layar yang lebih besar. */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          <div>
            {/* Menampilkan logo utama Bonsai Gerung. */}
            <img
              src={logoBonsaiGerung}
              alt="Bonsai Gerung"
              className="mb-5 h-auto w-52"
            />

            {/* Deskripsi singkat usaha. */}
            <p className="max-w-sm text-sm leading-6 text-white/80">
              Koleksi bonsai dari Bonsai Gerung dengan berbagai tahap
              perkembangan, mulai dari bahan, prospek, hingga bonsai jadi.
            </p>
          </div>

          <div>
            {/* Judul kolom navigasi. */}
            <h2 className="mb-4 text-lg font-semibold">
              Navigasi
            </h2>

            {/* Menyimpan daftar navigasi website. */}
            <nav className="flex flex-col gap-3 text-sm">

              {/* Link menuju halaman Beranda. */}
              <Link
                to="/"
                className="text-white/80 transition hover:text-white"
              >
                Beranda
              </Link>

              {/* Link menuju halaman Katalog. */}
              <Link
                to="/katalog"
                className="text-white/80 transition hover:text-white"
              >
                Katalog
              </Link>

              {/* Link menuju halaman Tentang Kami. */}
              <Link
                to="/tentang"
                className="text-white/80 transition hover:text-white"
              >
                Tentang Kami
              </Link>

              {/* Link menuju halaman Kontak. */}
              <Link
                to="/kontak"
                className="text-white/80 transition hover:text-white"
              >
                Kontak
              </Link>

              {/* Link menuju halaman Login. */}
              <Link
                to="/login"
                className="text-white/80 transition hover:text-white"
              >
                Login
              </Link>
            </nav>
          </div>

          <div>
            {/* Judul kolom kontak. */}
            <h2 className="mb-4 text-lg font-semibold">
              Kontak
            </h2>

            {/* Kumpulan informasi kontak. */}
            <div className="space-y-4 text-sm">

              {/* Informasi lokasi. */}
              <div className="flex items-start gap-3">
                {/* Icon lokasi. */}
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                {/* Teks lokasi. */}
                <span className="text-white/80">
                  {contactData.location}
                </span>
              </div>

              {/* Informasi WhatsApp. */}
              <div className="flex items-start gap-3">
                {/* Icon WhatsApp/chat. */}
                <MessageCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                {/* Teks nomor WhatsApp. */}
                <span className="text-white/80">
                  WhatsApp Bonsai Gerung
                </span>
              </div>

              {/* Informasi komunikasi tambahan. */}
              <div className="flex items-start gap-3">
                {/* Icon telepon. */}
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                {/* Keterangan komunikasi. */}
                <span className="text-white/80">
                  Hubungi penjual untuk informasi bonsai
                </span>
              </div>
            </div>

            {/* Tombol WhatsApp. */}
            <a
              // Menggunakan fungsi yang sudah dibuat di contactData.
              href={contactData.getWhatsappUrl()}

              // Membuka WhatsApp di tab baru.
              target="_blank"

              // Menambahkan atribut keamanan untuk tab baru.
              rel="noopener noreferrer"

              // Style tombol WhatsApp.
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
            >
              {/* Icon chat. */}
              <MessageCircle size={18} />

              {/* Teks tombol. */}
              Hubungi via WhatsApp
            </a>
          </div>

          <div>
            {/* Judul kolom. */}
            <h2 className="mb-4 text-lg font-semibold">
              Bonsai Gerung
            </h2>

            {/* Penjelasan singkat fungsi website. */}
            <p className="text-sm leading-6 text-white/80">
              Temukan koleksi bonsai sesuai tahap perkembangannya dan
              hubungi penjual melalui WhatsApp untuk mendapatkan informasi
              lebih lanjut mengenai produk.
            </p>

            {/* Link menuju katalog. */}
            <Link
              to="/katalog"
              className="mt-5 inline-flex items-center rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Lihat Katalog
            </Link>
          </div>
        </div>

        {/* Garis pemisah sebelum bagian copyright. */}
        <div className="my-10 border-t border-white/15" />

        {/* Bagian paling bawah Footer. */}
        <div className="flex flex-col gap-3 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright otomatis mengikuti tahun sekarang. */}
          <p>
            © {currentYear} Bonsai Gerung. Semua hak dilindungi.
          </p>

          {/* Keterangan singkat website. */}
          <p>
            Katalog Bonsai Gerung
          </p>
        </div>
      </div>
    </footer>
  );
}