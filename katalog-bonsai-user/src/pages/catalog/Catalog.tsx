import { useMemo, useState } from "react";
import type { BonsaiCategory } from "../../types/bonsai";
import BonsaiCard from "../../components/BonsaiCard";
import { bonsaiData } from "../../data/bonsaiData";

// Mendefinisikan pilihan filter kategori.
type CategoryFilter = "semua" | BonsaiCategory;

// Membuat halaman Katalog User.
export default function Catalog() {
  // Menyimpan kategori yang sedang dipilih.
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("semua");

  // Menyaring data sesuai kategori.
  const filteredBonsai = useMemo(() => {
    // Jika semua dipilih, tampilkan seluruh produk.
    if (selectedCategory === "semua") {
      return bonsaiData;
    }

    // Jika kategori dipilih, hanya tampilkan produk dengan kategori tersebut.
    return bonsaiData.filter(
      (bonsai) => bonsai.kategori === selectedCategory,
    );
  }, [selectedCategory]);

  // Daftar tombol kategori.
  const categories: {
    // Nilai kategori yang digunakan aplikasi.
    value: CategoryFilter;

    // Label yang ditampilkan user.
    label: string;
  }[] = [
    {
      // Menampilkan semua produk.
      value: "semua",

      // Label tombol.
      label: "Semua",
    },
    {
      // Kategori bahan sesuai database.
      value: "bahan",

      // Label UI.
      label: "Bahan",
    },
    {
      // Kategori prospek sesuai database.
      value: "prospek",

      // Label UI.
      label: "Prospek",
    },
    {
      // Kategori bonsai jadi sesuai database.
      value: "bonsai_jadi",

      // Label UI.
      label: "Bonsai Jadi",
    },
  ];

  // Mengembalikan halaman katalog.
  return (
    <main className="bg-cream">
      {/* Header katalog. */}
      <section className="border-b border-border bg-white">
        {/* Container header. */}
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          {/* Label section. */}
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Katalog Bonsai
          </p>

          {/* Judul utama. */}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            Temukan Koleksi Bonsai Gerung
          </h1>

          {/* Deskripsi katalog. */}
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Jelajahi koleksi bonsai berdasarkan kategori bahan, prospek, dan
            bonsai jadi.
          </p>
        </div>
      </section>

      {/* Area katalog. */}
      <section className="py-12 sm:py-16">
        {/* Container produk. */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Filter kategori. */}
          <div className="flex flex-wrap gap-3">
            {/* Melakukan perulangan untuk tombol filter. */}
            {categories.map((category) => {
              // Menentukan apakah kategori sedang aktif.
              const isActive = selectedCategory === category.value;

              // Mengembalikan tombol kategori.
              return (
                <button
                  // Menentukan jenis tombol.
                  type="button"
                  // Menggunakan value sebagai key React.
                  key={category.value}
                  // Mengubah filter ketika tombol diklik.
                  onClick={() => setSelectedCategory(category.value)}
                  // Styling berdasarkan status aktif.
                  className={[
                    // Styling dasar tombol.
                    "rounded-full border px-5 py-2.5 text-sm font-semibold transition",

                    // Styling tombol aktif.
                    isActive
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-slate-600 hover:border-primary/30 hover:text-primary",
                  ].join(" ")}
                >
                  {/* Label kategori. */}
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Ringkasan jumlah produk. */}
          <div className="mt-8 flex items-center justify-between">
            {/* Jumlah produk yang ditemukan. */}
            <p className="text-sm text-slate-500">
              Menampilkan{" "}
              <span className="font-semibold text-dark">
                {filteredBonsai.length}
              </span>{" "}
              produk
            </p>
          </div>

          {/* Grid katalog. */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Menampilkan produk hasil filter. */}
            {filteredBonsai.map((bonsai) => (
              // Menggunakan BonsaiCard yang sama dengan Beranda.
              <BonsaiCard
                // Menggunakan ID database sebagai key.
                key={bonsai.id}
                // Mengirim data bonsai melalui props.
                bonsai={bonsai}
              />
            ))}
          </div>

          {/* Empty state jika tidak ada data. */}
          {filteredBonsai.length === 0 && (
            <div className="mt-12 rounded-3xl border border-dashed border-border bg-white px-6 py-16 text-center">
              {/* Judul empty state. */}
              <h2 className="text-xl font-semibold text-dark">
                Belum ada produk
              </h2>

              {/* Penjelasan empty state. */}
              <p className="mt-2 text-sm text-slate-500">
                Belum ada bonsai pada kategori yang dipilih.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}