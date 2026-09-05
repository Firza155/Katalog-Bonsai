export interface LaporanManual {
  id: number
  nama_pembeli: string
  item: string
  harga: string
  tanggal: string
  catatan: string | null
}

export interface LaporanRow {
  tanggal: string
  nama_pembeli: string
  item: string
  harga: number
  metode: 'QRIS' | 'Manual/Offline'
  catatan: string | null
}