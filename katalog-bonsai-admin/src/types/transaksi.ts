export interface TransaksiQris {
  id: number
  order_id: string
  bonsai_id: number | null
  nama_pembeli: string | null
  item_pembelian: string | null
  amount: string
  status: 'pending' | 'settlement' | 'expire' | 'cancel'
  created_at: string
}

export interface GenerateQrisResponse {
  transaksi: TransaksiQris
  qris_url: string | null
  qr_string: string | null
}