import BonsaiCard from "./BonsaiCard";
import { bonsaiData } from "../data/bonsaiData";
import { Link } from "react-router-dom";

// Membuat component FeaturedBonsai.
export default function FeaturedBonsai() {
  // Mengambil maksimal tiga produk pertama untuk ditampilkan di beranda.
  const featuredBonsai = bonsaiData.slice(0, 3);

  // Mengembalikan section produk pilihan.
  return (
    <section className="bg-cream py-20 sm:py-24">
      {/* Container utama section. */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header section. */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Area judul. */}
          <div className="max-w-2xl">
            {/* Label kecil section. */}
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
              Koleksi Pilihan
            </p>

            {/* Judul section. */}
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
              Bonsai Pilihan
            </h2>

            {/* Deskripsi section. */}
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Temukan berbagai pilihan bonsai dari bahan hingga bonsai jadi.
            </p>
          </div>

          {/* Link menuju katalog lengkap. */}
          <Link
            // Tujuan link.
            to="/katalog"
            // Styling link.
            className="text-sm font-semibold text-primary transition hover:text-primary-light"
          >
            {/* Teks link. */}
            Lihat Semua Katalog →
          </Link>
        </div>

        {/* Grid produk. */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Mengulang data bonsai. */}
          {featuredBonsai.map((bonsai) => (
            // Menampilkan setiap bonsai dengan component reusable.
            <BonsaiCard
              // Menggunakan ID database sebagai key.
              key={bonsai.id}
              // Mengirim objek Bonsai melalui props.
              bonsai={bonsai}
            />
          ))}
        </div>
      </div>
    </section>
  );
}