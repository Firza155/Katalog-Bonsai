import { Link } from "react-router-dom"; // Mengambil komponen Link untuk berpindah ke halaman katalog.
import { ArrowRight } from "lucide-react"; // icon ArrowRight dari Lucide React.
import bonsaiBackground from "../assets/bonsai-bg.png";
import { contactData } from "../data/contactData";

// Membuat component Hero Section.
export default function HeroSection() {
  // Mengembalikan tampilan hero.
  return (
    // Section utama hero.
    <section className="relative overflow-hidden bg-cream">
      {/* Container utama dengan batas lebar agar konten tetap nyaman dibaca. */}
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-20">
        {/* Kolom teks hero. */}
        <div className="relative z-10 max-w-2xl">
          {/* Label kecil identitas brand. */}
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary-light">
            Bonsai Gerung
          </p>

          {/* Judul utama hero. */}
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-dark sm:text-5xl lg:text-6xl">
            Temukan Bonsai
            <span className="block text-primary">Pilihan Anda.</span>
          </h1>

          {/* Deskripsi hero. */}
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Temukan koleksi bonsai Bonsai Gerung mulai dari bahan, prospek,
            hingga bonsai jadi yang siap menjadi bagian dari koleksi Anda.
          </p>

          {/* Area tombol CTA. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/* Tombol utama menuju katalog. */}
            <Link
              // Menentukan tujuan tombol ke halaman katalog.
              to="/katalog"
              // Styling tombol utama.
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-light"
            >
              {/* Teks tombol utama. */}
              Jelajahi Katalog

              {/* Icon panah untuk menunjukkan navigasi. */}
              <ArrowRight size={18} />
            </Link>

            {/* Tombol kedua untuk menghubungi penjual. */}
            <a
              // Membuat URL WhatsApp menggunakan pesan default.
              href={contactData.getWhatsappUrl()}

              // Membuka WhatsApp pada tab baru.
              target="_blank"

              // Menambahkan keamanan saat membuka tab baru.
              rel="noopener noreferrer"
              
              // Menentukan link tidak membuka tab baru.
              className="inline-flex items-center justify-center rounded-xl border border-primary px-6 py-3.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              {/* Teks tombol WhatsApp. */}
              Hubungi Kami
            </a>
          </div>

          {/* Informasi singkat kategori. */}
          <div className="mt-10 flex flex-wrap gap-3">
            {/* Badge kategori pertama. */}
            <span className="rounded-full border border-primary/15 bg-white px-4 py-2 text-xs font-medium text-primary shadow-sm">
              Bahan
            </span>

            {/* Badge kategori kedua. */}
            <span className="rounded-full border border-primary/15 bg-white px-4 py-2 text-xs font-medium text-primary shadow-sm">
              Prospek
            </span>

            {/* Badge kategori ketiga. */}
            <span className="rounded-full border border-primary/15 bg-white px-4 py-2 text-xs font-medium text-primary shadow-sm">
              Bonsai Jadi
            </span>
          </div>
        </div>

        {/* Kolom visual hero. */}
        <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[500px]">
          {/* Lingkaran dekoratif di belakang gambar bonsai. */}
          <div className="absolute right-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-primary/8 blur-2xl sm:h-[420px] sm:w-[420px]" />

          {/* Gambar bonsai utama. */}
          <img
            // Sumber gambar berasal dari assets.
            src={bonsaiBackground}
            // Alt deskriptif untuk accessibility.
            alt="Ilustrasi bonsai"
            // Membatasi ukuran gambar agar tidak mendominasi halaman.
            className="relative z-10 w-full max-w-xl object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}