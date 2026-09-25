import { ArrowRight, Sprout, TreeDeciduous, Trees } from "lucide-react"; // Mengambil icon yang akan digunakan pada masing-masing kategori.
import { Link } from "react-router-dom";

// Mendefinisikan tipe data untuk setiap kategori bonsai.
type Category = {
  name: string; // Nama kategori bonsai.
  development: string;   // Tingkat perkembangan tanaman.
  priceRange: string;   // Kisaran harga produk.
  description: string; // Deskripsi singkat kategori.
  icon: typeof Sprout;  // Icon yang digunakan untuk kategori.
};

// Menyimpan data kategori 
const categories: Category[] = [
  {
    name: "Bahan", // Kategori pertama.
    development: "0–30%",     // Tingkat perkembangan kategori Bahan.
    priceRange: "Rp100.000 – Rp500.000",  // Kisaran harga kategori Bahan.
    description: // Deskripsi kategori yang mengikuti konsep project.
      "Tanaman pada tahap awal perkembangan yang dapat dikembangkan menjadi bonsai sesuai proses dan perawatan.",
    icon: Sprout, // Menggunakan icon tunas untuk menggambarkan tahap awal.
  },

    {
    name: "Prospek", // Kategori kedua.
    development: "30–70%",   // Tingkat perkembangan kategori Prospek.
    priceRange: "Rp1.000.000 – Rp5.000.000",   // Kisaran harga kategori Prospek.
    description:     // Deskripsi kategori prospek.
      "Tanaman yang sudah memiliki perkembangan lebih lanjut dan memiliki potensi untuk dikembangkan menjadi bonsai.",
    icon: TreeDeciduous,   // Menggunakan icon pohon sebagai visual kategori.
  },

   {
    name: "Bonsai Jadi", // Kategori ketiga.
    development: "70–100%", // Tingkat perkembangan kategori Bonsai Jadi.
    priceRange: "Rp5.000.000 – Rp10.000.000",   // Kisaran harga kategori Bonsai Jadi.
    description:    // Deskripsi kategori bonsai jadi.
      "Bonsai dengan tingkat perkembangan tinggi yang sudah mencapai tahap akhir sesuai karakter tanaman.",
    icon: Trees,  // Menggunakan icon beberapa pohon untuk kategori tingkat lanjut.
  },
];

// Membuat component CategorySection.
export default function CategorySection() {
  // Mengembalikan tampilan section kategori.
  return (
    // Section kategori dengan background putih agar berbeda dari hero.
    <section className="bg-white py-20 sm:py-24">
      {/* Container utama section. */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Bagian heading section. */}
        <div className="mx-auto max-w-2xl text-center">
          {/* Label kecil section. */}
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Koleksi Bonsai
          </p>

          {/* Judul utama section. */}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
            Temukan Bonsai Sesuai Pilihan Anda
          </h2>

          {/* Penjelasan section. */}
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Jelajahi koleksi Bonsai Gerung berdasarkan tingkat perkembangan
            tanaman, mulai dari bahan, prospek, hingga bonsai jadi.
          </p>
        </div>

        {/* Grid untuk menampilkan tiga kategori. */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {/* Melakukan perulangan terhadap data kategori. */}
          {categories.map((category) => {
            // Menyimpan component icon dari data kategori.
            const Icon = category.icon;

            // Mengembalikan card kategori.
            return (
              // Card kategori menggunakan nama sebagai key.
              <article
                key={category.name}
                className="group rounded-3xl border border-border bg-cream p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Header card kategori. */}
                <div className="flex items-start justify-between gap-4">
                  {/* Container icon. */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {/* Menampilkan icon kategori. */}
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  {/* Label tingkat perkembangan. */}
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
                    {category.development}
                  </span>
                </div>

                {/* Nama kategori. */}
                <h3 className="mt-7 text-xl font-semibold text-dark">
                  {category.name}
                </h3>

                {/* Deskripsi kategori. */}
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>

                {/* Informasi harga. */}
                <div className="mt-6 rounded-2xl border border-border bg-white p-4">
                  {/* Label kisaran harga. */}
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    Kisaran Harga
                  </p>

                  {/* Nilai kisaran harga. */}
                  <p className="mt-1 text-base font-semibold text-primary">
                    {category.priceRange}
                  </p>

                  {/* Keterangan mengenai harga. */}
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Harga dapat dinegosiasikan sesuai kondisi dan kesepakatan.
                  </p>
                </div>

                {/* Tombol menuju katalog berdasarkan kategori. */}
                <Link
                  // Mengarahkan user ke katalog dengan filter kategori.
                  to={`/katalog?category=${category.name
                    .toLowerCase()
                    .replace(" ", "_")}`}
                  // Styling link.
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:text-primary-light"
                >
                  {/* Teks link. */}
                  Lihat Koleksi

                  {/* Icon panah. */}
                  <ArrowRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}