import type { Bonsai } from "../types/bonsai";
import bonsaiPlaceholder from "../assets/bonsai-bg.png";

// Menyimpan data bonsai lokal yang mengikuti data seeder database.
export const bonsaiData: Bonsai[] = [
  {
    // ID produk pertama dari database.
    id: 1,

    // Nama produk dari kolom "nama".
    nama: "Bonsai Beringin Prospek",

    // Deskripsi produk dari kolom "deskripsi".
    deskripsi:
      "Bonsai beringin dengan batang unik, siap dibentuk lebih lanjut.",

    // Harga produk dari kolom "harga".
    harga: 750000,

    // Kategori mengikuti enum database.
    kategori: "prospek",

    // Status mengikuti enum database.
    status: "tersedia",

    // Database saat ini belum memiliki record pada bonsai_images.
    // Karena itu array ini tetap kosong agar merepresentasikan kondisi database.
    images: [],

    // Waktu pembuatan mengikuti data seeder.
    created_at: "2026-09-04 02:52:47",

    // Waktu pembaruan mengikuti data seeder.
    updated_at: "2026-09-04 02:52:47",
  },

  {
    // ID produk kedua dari database.
    id: 2,

    // Nama produk dari database.
    nama: "Bahan Bonsai Serut",

    // Deskripsi produk dari database.
    deskripsi:
      "Bahan bonsai serut, cocok untuk pemula belajar membentuk.",

    // Harga produk dari database.
    harga: 250000,

    // Kategori produk.
    kategori: "bahan",

    // Status produk.
    status: "tersedia",

    // Belum ada foto pada database.
    images: [],

    // Waktu pembuatan data.
    created_at: "2026-09-04 02:52:47",

    // Waktu pembaruan data.
    updated_at: "2026-09-04 02:52:47",
  },

  {
    // ID produk ketiga dari database.
    id: 3,

    // Nama produk dari database.
    nama: "Bonsai Cemara Udang Jadi",

    // Deskripsi produk dari database.
    deskripsi:
      "Bonsai cemara udang sudah jadi, siap pajang.",

    // Harga produk dari database.
    harga: 3500000,

    // Kategori produk.
    kategori: "bonsai_jadi",

    // Status produk.
    status: "tersedia",

    // Belum ada foto pada database.
    images: [],

    // Waktu pembuatan data.
    created_at: "2026-09-04 02:52:47",

    // Waktu pembaruan data.
    updated_at: "2026-09-04 02:52:47",
  },
];

// Membuat data gambar placeholder secara terpisah.
// Data ini tidak dianggap sebagai data database.
export const bonsaiPlaceholderImage = bonsaiPlaceholder;