import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Sprout, TreeDeciduous, Trees } from "lucide-react";
import logo from "../../assets/logo-bonsai-gerung.png";

// Membuat halaman Tentang Kami.
export default function About() {
  // Mendefinisikan informasi kategori produk.
  const categories = [
    {
      // Nama kategori pertama.
      name: "Bahan",

      // Tingkat perkembangan berdasarkan proposal.
      development: "0–30%",

      // Penjelasan kategori.
      description:
        "Tanaman pada tahap awal perkembangan yang masih dapat dikembangkan dan dibentuk lebih lanjut.",

      // Icon kategori.
      icon: Sprout,
    },

    {
      // Nama kategori kedua.
      name: "Prospek",

      // Tingkat perkembangan berdasarkan proposal.
      development: "30–70%",

      // Penjelasan kategori.
      description:
        "Tanaman dengan perkembangan yang lebih lanjut dan memiliki potensi untuk dikembangkan menjadi bonsai.",

      // Icon kategori.
      icon: TreeDeciduous,
    },

    {
      // Nama kategori ketiga.
      name: "Bonsai Jadi",

      // Tingkat perkembangan berdasarkan proposal.
      development: "70–100%",

      // Penjelasan kategori.
      description:
        "Bonsai dengan tingkat perkembangan tinggi yang sudah mencapai tahap akhir sesuai karakter tanamannya.",

      // Icon kategori.
      icon: Trees,
    },
  ];

  // Mengembalikan tampilan halaman Tentang Kami.
  return (
    <main className="bg-cream">
      {/* Hero halaman Tentang Kami. */}
      <section className="relative overflow-hidden bg-primary">
        {/* Dekorasi background untuk memberikan kedalaman visual. */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5" />

        {/* Container hero. */}
        <div className="relative mx-auto grid min-h-[420px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10">
          {/* Area teks hero. */}
          <div>
            {/* Label kecil halaman. */}
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              Tentang Kami
            </p>

            {/* Judul utama. */}
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Mengenal Bonsai Gerung
            </h1>

            {/* Deskripsi singkat. */}
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Mengenal lebih dekat usaha Bonsai Gerung dan koleksi bonsai yang
              tersedia untuk pelanggan.
            </p>
          </div>

          {/* Area logo. */}
          <div className="flex justify-center lg:justify-end">
            {/* Card logo. */}
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white/95 p-8 shadow-2xl sm:h-72 sm:w-72">
              {/* Logo Bonsai Gerung. */}
              <img
                // Menggunakan logo lengkap.
                src={logo}
                // Alternative text untuk accessibility.
                alt="Bonsai Gerung"
                // Mengatur ukuran logo.
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bagian profil usaha. */}
      <section className="bg-white py-20 sm:py-24">
        {/* Container profil. */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Grid konten. */}
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* Judul sisi kiri. */}
            <div>
              {/* Label kecil. */}
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
                Profil Usaha
              </p>

              {/* Judul profil. */}
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
                Bonsai Gerung
              </h2>

              {/* Lokasi usaha. */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-cream p-4">
                {/* Icon lokasi. */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={19} />
                </div>

                {/* Detail lokasi. */}
                <div>
                  {/* Label lokasi. */}
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    Lokasi
                  </p>

                  {/* Nama lokasi. */}
                  <p className="mt-1 text-sm font-semibold text-dark">
                    Dusun Gerung, Desa Pehserut, Kecamatan Sukomoro, Kabupaten Nganjuk 
                  </p>
                </div>
              </div>
            </div>

            {/* Isi profil. */}
            <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
              {/* Paragraf pertama profil. */}
              <p>
                Bonsai Gerung merupakan usaha yang bergerak di bidang penjualan
                tanaman bonsai dan berlokasi di Kecamatan Sukomoro, Kabupaten
                Nganjuk.
              </p>

              {/* Paragraf kedua profil. */}
              <p>
                Produk yang ditawarkan memiliki beberapa tingkat perkembangan
                tanaman, mulai dari bahan, prospek, hingga bonsai jadi.
              </p>

              {/* Paragraf ketiga profil. */}
              <p>
                Proses komunikasi dan negosiasi dengan pelanggan tetap menjadi
                bagian penting dalam proses penjualan dan dilakukan melalui
                WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian kategori produk. */}
      <section className="bg-cream py-20 sm:py-24">
        {/* Container kategori. */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Heading kategori. */}
          <div className="mx-auto max-w-2xl text-center">
            {/* Label kecil. */}
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
              Koleksi
            </p>

            {/* Judul kategori. */}
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
              Tiga Tahap Koleksi Bonsai
            </h2>

            {/* Deskripsi kategori. */}
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Koleksi Bonsai Gerung dikelompokkan berdasarkan tingkat
              perkembangan tanaman.
            </p>
          </div>

          {/* Grid kategori. */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Melakukan perulangan kategori. */}
            {categories.map((category) => {
              // Menyimpan component icon ke variable.
              const Icon = category.icon;

              // Mengembalikan card kategori.
              return (
                <article
                  // Menggunakan nama kategori sebagai key.
                  key={category.name}
                  // Styling card.
                  className="rounded-3xl border border-border bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Icon kategori. */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {/* Menampilkan icon kategori. */}
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  {/* Nama kategori. */}
                  <h3 className="mt-6 text-xl font-semibold text-dark">
                    {category.name}
                  </h3>

                  {/* Tingkat perkembangan. */}
                  <p className="mt-2 text-sm font-semibold text-primary">
                    Tingkat perkembangan {category.development}
                  </p>

                  {/* Deskripsi kategori. */}
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA menuju katalog. */}
      <section className="bg-white py-20">
        {/* Container CTA. */}
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          {/* Card CTA. */}
          <div className="rounded-3xl bg-primary px-7 py-12 text-center shadow-xl shadow-primary/10 sm:px-12">
            {/* Judul CTA. */}
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Temukan Koleksi Bonsai Anda
            </h2>

            {/* Deskripsi CTA. */}
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Jelajahi katalog Bonsai Gerung dan lihat koleksi berdasarkan
              kategori yang tersedia.
            </p>

            {/* Link ke katalog. */}
            <Link
              // Tujuan link.
              to="/katalog"
              // Styling tombol.
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary transition hover:bg-cream"
            >
              {/* Teks tombol. */}
              Lihat Katalog

              {/* Icon panah. */}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}