// Mendefinisikan kategori bonsai yang diperbolehkan oleh database.
export type BonsaiCategory =
  | "bahan"
  | "prospek"
  | "bonsai_jadi";

// Mendefinisikan status bonsai sesuai enum pada database.
export type BonsaiStatus =
  | "tersedia"
  | "pending"
  | "terjual";

// Mendefinisikan struktur satu gambar bonsai.
export interface BonsaiImage {
  id: number;
  bonsai_id: number;
  path_foto: string;
  created_at?: string | null;
  updated_at?: string | null;
}

// Mendefinisikan struktur data bonsai yang berasal dari database/API.
export interface Bonsai {
  id: number;
  nama: string;
  deskripsi: string | null;
  harga: number | string;
  kategori: BonsaiCategory;
  status: BonsaiStatus;
  images: BonsaiImage[];
  created_at?: string | null;
  updated_at?: string | null;
}