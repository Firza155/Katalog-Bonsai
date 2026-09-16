import { useState } from 'react'
import api from '../lib/api'
import type { GenerateQrisResponse, TransaksiQris as TransaksiQrisType } from '../types/transaksi'

const STATUS_LABEL: Record<TransaksiQrisType['status'], string> = {
  pending: 'Menunggu Pembayaran',
  settlement: 'Sudah Dibayar',
  expire: 'Kedaluwarsa',
  cancel: 'Dibatalkan',
}

const STATUS_STYLE: Record<TransaksiQrisType['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  settlement: 'bg-green-100 text-green-800',
  expire: 'bg-gray-100 text-gray-600',
  cancel: 'bg-red-100 text-red-700',
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export default function TransaksiQris() {
  const [amount, setAmount] = useState('')
  const [namaPembeli, setNamaPembeli] = useState('')
  const [itemPembelian, setItemPembelian] = useState('')
  const [qrisUrl, setQrisUrl] = useState<string | null>(null)
  const [transaksi, setTransaksi] = useState<TransaksiQrisType | null>(null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleGenerateQris() {
    setError('')
    setLoading(true)
    setCopied(false)
    try {
      const res = await api.post<GenerateQrisResponse>('/api/transaksi-qris', {
        amount: Number(amount),
        nama_pembeli: namaPembeli || undefined,
        item_pembelian: itemPembelian || undefined,
      })
      setQrisUrl(res.data.qris_url)
      setTransaksi(res.data.transaksi)
    } catch (err) {
      console.error(err)
      setError('Gagal generate QRIS, coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCekStatus() {
    if (!transaksi) return
    setChecking(true)
    try {
      const res = await api.get<TransaksiQrisType>(
        `/api/transaksi-qris/${transaksi.order_id}/cek-status`
      )
      setTransaksi(res.data)
    } catch (err) {
      console.error(err)
      setError('Gagal cek status, coba lagi.')
    } finally {
      setChecking(false)
    }
  }

  function handleReset() {
    setAmount('')
    setNamaPembeli('')
    setItemPembelian('')
    setQrisUrl(null)
    setTransaksi(null)
    setError('')
    setCopied(false)
  }

  async function handleCopy() {
    if (!qrisUrl) return
    await navigator.clipboard.writeText(qrisUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">Transaksi QRIS</h1>
        <p className="text-sm text-gray-500">Generate kode pembayaran QRIS untuk transaksi baru</p>
      </header>

      <main className="p-6 max-w-md">
        <div className="bg-white border border-gold-500/20 rounded-xl shadow-sm p-5">
          {!transaksi && (
            <>
              <label className="text-sm text-gray-600 mb-1 block">Nama Pembeli (opsional)</label>
              <input
                type="text"
                placeholder="Contoh: Budi"
                value={namaPembeli}
                onChange={(e) => setNamaPembeli(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

              <label className="text-sm text-gray-600 mb-1 block">
                Barang yang Dibeli (opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Bonsai Cemara Udang"
                value={itemPembelian}
                onChange={(e) => setItemPembelian(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

              <label className="text-sm text-gray-600 mb-1 block">Nominal (Rp)</label>
              <input
                type="number"
                placeholder="50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                onClick={handleGenerateQris}
                disabled={loading || !amount}
                className="w-full bg-maroon-700 hover:bg-maroon-800 transition text-gold-300 font-medium py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Generate QRIS'}
              </button>
            </>
          )}

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          {transaksi && qrisUrl && (
            <div className="text-center">
              <img
                src={qrisUrl}
                alt="QRIS Code"
                className="mx-auto w-48 h-48 border rounded-lg p-2"
              />

              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-500">
                  Order ID <span className="font-mono text-gray-700">{transaksi.order_id}</span>
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatRupiah(Number(transaksi.amount))}
                </p>
                <span
                  className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[transaksi.status]}`}
                >
                  {STATUS_LABEL[transaksi.status]}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="mt-4 w-full text-xs bg-gray-100 hover:bg-gray-200 transition text-gray-700 py-2 rounded-lg"
              >
                {copied ? '✓ URL Tersalin' : 'Copy QR Image URL (untuk simulator)'}
              </button>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleCekStatus}
                  disabled={checking}
                  className="flex-1 text-sm border border-gray-300 hover:bg-gray-50 transition py-2 rounded-lg disabled:opacity-50"
                >
                  {checking ? 'Mengecek...' : 'Cek Status Terbaru'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 text-sm text-gray-500 hover:text-gray-700 transition py-2 rounded-lg"
                >
                  Buat Baru
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}