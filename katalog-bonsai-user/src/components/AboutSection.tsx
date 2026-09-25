// Mengambil Link agar user dapat diarahkan ke halaman katalog.
import { Link } from "react-router-dom";

// Mengambil icon lokasi untuk informasi lokasi usaha.
import { MapPin } from "lucide-react";

// Mengambil logo lengkap Bonsai Gerung.
import logo from "../assets/logo-bonsai-gerung.png";

// Membuat component AboutSection.
export default function AboutSection() {
  // Mengembalikan section Tentang Bonsai Gerung.
  return (
    // Section utama menggunakan background putih agar berbeda dari section sebelumnya.
    <section id="tentang" className="bg-white py-20 sm:py-24">
      {/* Container utama section. */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Membagi section menjadi dua kolom pada desktop. */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Kolom kiri untuk logo dan elemen visual. */}
          <div className="relative">
            {/* Background dekoratif berbentuk bidang hijau transparan. */}
            <div className="absolute -left-4 -top-4 h-32 w-32 rounded-3xl bg-primary/5" />

            {/* Card logo. */}
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl bg-cream p-8 sm:min-h-[420px]">
              {/* Decorative circle di belakang logo. */}
              <div className="absolute h-64 w-64 rounded-full bg-primary/5" />

              {/* Logo Bonsai Gerung. */}
              <img
                // Menggunakan asset logo lengkap.
                src={logo}
                // Memberikan alternative text.
                alt="Bonsai Gerung"
                // Mengatur ukuran logo.
                className="relative z-10 w-full max-w-sm object-contain"
              />
            </div>
          </div>

          {/* Kolom kanan berisi informasi usaha. */}
          <div>
            {/* Label kecil section. */}
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
              Tentang Bonsai Gerung
            </p>

            {/* Judul section. */}
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
              Mengenal Lebih Dekat Bonsai Gerung
            </h2>

            {/* Paragraf pengenalan berdasarkan proposal. */}
            <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
              Bonsai Gerung merupakan usaha yang bergerak di bidang penjualan
              tanaman bonsai dan dikelola di Kecamatan Sukomoro, Kabupaten
              Nganjuk.
            </p>

            {/* Paragraf mengenai koleksi produk. */}
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Koleksi bonsai tersedia dalam beberapa tahap perkembangan,
              mulai dari bahan, prospek, hingga bonsai jadi. Setiap kategori
              memiliki karakter dan tingkat perkembangan yang berbeda.
            </p>

            {/* Informasi lokasi usaha. */}
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-border bg-cream p-4">
              {/* Icon lokasi. */}
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin size={19} />
              </div>

              {/* Teks lokasi. */}
              <div>
                {/* Label informasi. */}
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Lokasi
                </p>

                {/* Nilai lokasi. */}
                <p className="mt-1 text-sm font-semibold text-dark">
                  Dusun Gerung, Desa Pehserut, Kecamatan Sukomoro, Kabupaten Nganjuk 
                </p>
              </div>
            </div>

            {/* Area tombol. */}
            <div className="mt-7">
              {/* Link menuju katalog. */}
              <Link
                // Tujuan link.
                to="/katalog"
                // Styling tombol.
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-light"
              >
                {/* Teks tombol. */}
                Jelajahi Koleksi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}