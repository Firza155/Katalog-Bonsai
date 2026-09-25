export interface BonsaiImage {
  id: number
  bonsai_id: number
  path_foto: string
}

export interface Bonsai {
  id: number
  nama: string
  deskripsi: string | null
  harga: string
  kategori: 'bahan' | 'prospek' | 'bonsai_jadi'
  status: 'tersedia' | 'pending' | 'terjual'
  images: BonsaiImage[]
}