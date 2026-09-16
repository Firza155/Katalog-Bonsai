export interface PenjualanTerbaru {
  nama: string
  waktu: string
  harga: number
  metode: 'QRIS' | 'Manual'
}

export interface DashboardStats {
  total_bonsai: number
  total_bonsai_pct: number
  total_penjualan: number
  total_penjualan_pct: number
  total_pendapatan: number
  total_pendapatan_pct: number
  total_qris: number
  total_qris_pct: number
  grafik_penjualan: { tanggal: string; jumlah: number }[]
  penjualan_terbaru: PenjualanTerbaru[]
}