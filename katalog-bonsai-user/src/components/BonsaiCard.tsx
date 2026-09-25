import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Bonsai } from "../types/bonsai";
import { bonsaiPlaceholderImage } from "../data/bonsaiData";

// Mendefinisikan props untuk component BonsaiCard.
type BonsaiCardProps = {
  // Component menerima satu objek Bonsai.
  bonsai: Bonsai;
};

// Membuat component card produk bonsai.
export default function BonsaiCard({ bonsai }: BonsaiCardProps) {
  // Mengambil foto pertama dari database jika tersedia.
  const imagePath = bonsai.images[0]?.path_foto;

  // Menentukan gambar yang akan ditampilkan pada card.
  const displayImage = imagePath || bonsaiPlaceholderImage;

  // Mengembalikan tampilan card.
  return (
    // Card utama produk.
    <article className="group overflow-hidden rounded-3xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      {/* Container gambar produk. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {/* Menampilkan foto bonsai. */}
        <img
          // Menggunakan foto database atau placeholder.
          src={displayImage}
          // Menggunakan nama bonsai sebagai teks alternatif.
          alt={bonsai.nama}
          // Membuat gambar mengisi container.
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Badge kategori. */}
        <div className="absolute left-4 top-4">
          {/* Menampilkan nama kategori yang sudah diformat. */}
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur">
            {formatCategory(bonsai.kategori)}
          </span>
        </div>

        {/* Badge status. */}
        <div className="absolute right-4 top-4">
          {/* Menampilkan status produk. */}
          <span
            className={[
              // Class dasar badge.
              "rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur",

              // Hijau untuk status tersedia.
              bonsai.status === "tersedia" &&
                "bg-green-50 text-green-700",

              // Kuning untuk status pending.
              bonsai.status === "pending" &&
                "bg-amber-50 text-amber-700",

              // Merah untuk status terjual.
              bonsai.status === "terjual" &&
                "bg-red-50 text-red-700",
            ]
              // Menghapus nilai false.
              .filter(Boolean)
              // Menggabungkan class menjadi satu string.
              .join(" ")}
          >
            {/* Mengubah status database menjadi teks yang ramah user. */}
            {formatStatus(bonsai.status)}
          </span>
        </div>
      </div>

      {/* Informasi produk. */}
      <div className="p-5">
        {/* Nama bonsai. */}
        <h3 className="line-clamp-2 min-h-14 text-lg font-semibold text-dark">
          {bonsai.nama}
        </h3>

        {/* Harga bonsai. */}
        <p className="mt-2 text-base font-semibold text-primary">
          {formatRupiah(bonsai.harga)}
        </p>

        {/* Deskripsi singkat jika tersedia. */}
        {bonsai.deskripsi && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {bonsai.deskripsi}
          </p>
        )}

        {/* Link menuju detail produk. */}
        <Link
          // Menggunakan ID database sebagai parameter URL.
          to={`/katalog/${bonsai.id}`}
          // Styling tombol.
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-light"
        >
          {/* Teks tombol. */}
          Lihat Detail

          {/* Icon panah. */}
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

// Mengubah nilai kategori database menjadi label yang mudah dibaca.
function formatCategory(category: Bonsai["kategori"]) {
  // Menangani kategori bahan.
  if (category === "bahan") {
    return "Bahan";
  }

  // Menangani kategori prospek.
  if (category === "prospek") {
    return "Prospek";
  }

  // Menangani kategori bonsai jadi.
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

// Mengubah harga menjadi format Rupiah.
function formatRupiah(price: Bonsai["harga"]) {
  // Mengubah nilai menjadi angka.
  const numericPrice = Number(price);

  // Mengecek apakah harga valid.
  if (!Number.isFinite(numericPrice)) {
    // Fallback jika harga tidak valid.
    return "Harga tidak tersedia";
  }

  // Mengembalikan format Rupiah Indonesia.
  return new Intl.NumberFormat("id-ID", {
    // Menggunakan mode currency.
    style: "currency",

    // Menggunakan Rupiah.
    currency: "IDR",

    // Tidak menampilkan pecahan.
    maximumFractionDigits: 0,
  }).format(numericPrice);
}