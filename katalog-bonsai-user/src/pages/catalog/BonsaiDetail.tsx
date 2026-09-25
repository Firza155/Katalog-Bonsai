import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, PackageCheck, Tag } from "lucide-react";
import { bonsaiData, bonsaiPlaceholderImage } from "../../data/bonsaiData";
import type { Bonsai } from "../../types/bonsai";

// Membuat halaman detail bonsai.
export default function BonsaiDetail() {
  // Mengambil parameter "id" dari URL.
  const { id } = useParams();

  // Mencari produk berdasarkan ID dari URL.
  const bonsai = bonsaiData.find((item) => item.id === Number(id));

  // Jika produk tidak ditemukan, arahkan kembali ke katalog.
  if (!bonsai) {
    return <Navigate to="/katalog" replace />;
  }

  // Mengambil gambar pertama sebagai gambar utama jika tersedia.
  const firstImage = bonsai.images[0]?.path_foto;

  // Menentukan gambar awal yang ditampilkan.
  const initialImage = firstImage || bonsaiPlaceholderImage;

  // Menyimpan gambar utama yang sedang dipilih user.
  const [selectedImage, setSelectedImage] = useState(initialImage);

  // Mengambil seluruh gambar produk.
  const images =
    bonsai.images.length > 0
      ? bonsai.images.map((image) => image.path_foto)
      : [bonsaiPlaceholderImage];

  // Mengembalikan halaman detail.
  return (
    <main className="bg-cream">
      {/* Header kecil untuk navigasi kembali. */}
      <section className="border-b border-border bg-white">
        {/* Container header. */}
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
          {/* Link kembali ke halaman katalog. */}
          <Link
            // Mengarahkan user kembali ke katalog.
            to="/katalog"
            // Styling link.
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-primary"
          >
            {/* Icon panah kiri. */}
            <ArrowLeft size={18} />

            {/* Label navigasi. */}
            Kembali ke Katalog
          </Link>
        </div>
      </section>

      {/* Bagian utama detail produk. */}
      <section className="py-10 sm:py-14 lg:py-20">
        {/* Container utama halaman. */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Grid utama gambar dan informasi. */}
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Kolom gambar. */}
            <div>
              {/* Gambar utama. */}
              <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
                {/* Menampilkan gambar yang sedang dipilih. */}
                <img
                  // Menggunakan state selectedImage.
                  src={selectedImage}
                  // Menggunakan nama bonsai sebagai alt.
                  alt={bonsai.nama}
                  // Styling gambar utama.
                  className="aspect-square w-full object-cover"
                />
              </div>

              {/* Thumbnail gambar. */}
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {/* Melakukan perulangan seluruh gambar. */}
                {images.map((image, index) => (
                  <button
                    // Menentukan button tidak mengirim form.
                    type="button"
                    // Menggunakan index sebagai key karena gambar sementara bersifat lokal.
                    key={`${image}-${index}`}
                    // Mengubah gambar utama ketika thumbnail diklik.
                    onClick={() => setSelectedImage(image)}
                    // Memberikan label accessibility.
                    aria-label={`Pilih foto ${index + 1}`}
                    // Menentukan border berdasarkan gambar yang aktif.
                    className={[
                      // Ukuran dan bentuk thumbnail.
                      "h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-white transition",

                      // Border hijau jika thumbnail sedang aktif.
                      selectedImage === image
                        ? "border-primary"
                        : "border-transparent hover:border-primary/30",
                    ].join(" ")}
                  >
                    {/* Menampilkan thumbnail. */}
                    <img
                      // Menggunakan path gambar.
                      src={image}
                      // Alt gambar.
                      alt={`${bonsai.nama} ${index + 1}`}
                      // Membuat gambar memenuhi thumbnail.
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Kolom informasi produk. */}
            <div className="flex flex-col justify-center">
              {/* Badge kategori. */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary">
                  {/* Icon kategori. */}
                  <Tag size={15} />

                  {/* Nama kategori. */}
                  {formatCategory(bonsai.kategori)}
                </span>
              </div>

              {/* Nama bonsai. */}
              <h1 className="mt-5 text-3xl font-semibold leading-tight text-dark sm:text-4xl lg:text-5xl">
                {bonsai.nama}
              </h1>

              {/* Harga bonsai. */}
              <p className="mt-5 text-2xl font-semibold text-primary sm:text-3xl">
                {formatRupiah(bonsai.harga)}
              </p>

              {/* Status produk. */}
              <div className="mt-5 flex items-center gap-2">
                {/* Icon status. */}
                <PackageCheck
                  size={19}
                  className={getStatusColor(bonsai.status)}
                />

                {/* Teks status. */}
                <span
                  className={[
                    // Styling teks status.
                    "text-sm font-semibold",

                    // Warna status.
                    getStatusColor(bonsai.status),
                  ].join(" ")}
                >
                  {formatStatus(bonsai.status)}
                </span>
              </div>

              {/* Divider. */}
              <div className="my-7 h-px bg-border" />

              {/* Judul deskripsi. */}
              <h2 className="text-base font-semibold text-dark">
                Tentang Bonsai
              </h2>

              {/* Deskripsi produk. */}
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                {bonsai.deskripsi || "Deskripsi produk belum tersedia."}
              </p>

              {/* Informasi tambahan. */}
              <div className="mt-7 rounded-2xl border border-border bg-white p-5">
                {/* Judul informasi. */}
                <p className="text-sm font-semibold text-dark">
                  Informasi Produk
                </p>

                {/* Detail kategori. */}
                <div className="mt-4 flex items-center justify-between gap-4 border-b border-border pb-3">
                  {/* Label kategori. */}
                  <span className="text-sm text-slate-500">
                    Kategori
                  </span>

                  {/* Nilai kategori. */}
                  <span className="text-sm font-semibold text-dark">
                    {formatCategory(bonsai.kategori)}
                  </span>
                </div>

                {/* Detail status. */}
                <div className="flex items-center justify-between gap-4 pt-3">
                  {/* Label status. */}
                  <span className="text-sm text-slate-500">
                    Ketersediaan
                  </span>

                  {/* Nilai status. */}
                  <span className="text-sm font-semibold text-dark">
                    {formatStatus(bonsai.status)}
                  </span>
                </div>
              </div>

              {/* Area CTA. */}
              <div className="mt-7">
                {/* Tombol WhatsApp sementara. */}
                <a
                  // Placeholder sementara karena nomor WhatsApp resmi belum kita masukkan.
                  href="#whatsapp"
                  // Styling tombol.
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary-light"
                >
                  {/* Icon WhatsApp. */}
                  <MessageCircle size={19} />

                  {/* Teks tombol. */}
                  Hubungi Penjual via WhatsApp
                </a>

                {/* Penjelasan proses bisnis. */}
                <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                  Hubungi penjual untuk mengetahui detail produk dan
                  melanjutkan proses negosiasi harga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Mengubah kategori database menjadi label yang mudah dibaca.
function formatCategory(category: Bonsai["kategori"]) {
  // Jika kategori adalah bahan.
  if (category === "bahan") {
    return "Bahan";
  }

  // Jika kategori adalah prospek.
  if (category === "prospek") {
    return "Prospek";
  }

  // Selain dua kondisi di atas berarti bonsai jadi.
  return "Bonsai Jadi";
}

// Mengubah status database menjadi label UI.
function formatStatus(status: Bonsai["status"]) {
  // Status tersedia.
  if (status === "tersedia") {
    return "Tersedia";
  }

  // Status pending.
  if (status === "pending") {
    return "Sedang Diproses";
  }

  // Status terjual.
  return "Terjual";
}

// Mengambil warna teks berdasarkan status.
function getStatusColor(status: Bonsai["status"]) {
  // Warna hijau untuk tersedia.
  if (status === "tersedia") {
    return "text-green-700";
  }

  // Warna kuning untuk pending.
  if (status === "pending") {
    return "text-amber-700";
  }

  // Warna merah untuk terjual.
  return "text-red-700";
}

// Mengubah harga menjadi format Rupiah.
function formatRupiah(price: Bonsai["harga"]) {
  // Mengubah nilai harga menjadi number.
  const numericPrice = Number(price);

  // Mengecek apakah harga valid.
  if (!Number.isFinite(numericPrice)) {
    // Mengembalikan fallback jika harga tidak valid.
    return "Harga tidak tersedia";
  }

  // Memformat angka menjadi mata uang Indonesia.
  return new Intl.NumberFormat("id-ID", {
    // Menggunakan mode currency.
    style: "currency",

    // Menggunakan mata uang Rupiah.
    currency: "IDR",

    // Menghilangkan angka desimal.
    maximumFractionDigits: 0,
  }).format(numericPrice);
}