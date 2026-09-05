export interface Bonsai {
  id: number
  nama: string
  deskripsi: string | null
  harga: number
  kategori: 'bahan' | 'prospek' | 'bonsai_jadi'
  status: 'tersedia' | 'pending' | 'terjual'
  images: BonsaiImage[]
}

export interface BonsaiImage {
  id: number
  bonsai_id: number
  path_foto: string
}