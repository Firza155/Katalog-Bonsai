import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../lib/api'
import type { GenerateQrisResponse, TransaksiQris } from '../types/transaksi'
import { Link } from 'react-router-dom'

const STATUS_LABEL: Record<TransaksiQris['status'], string> = {
  pending: 'Menunggu Pembayaran',
  settlement: 'Sudah Dibayar',
  expire: 'Kedaluwarsa',
  cancel: 'Dibatalkan',
}

const STATUS_STYLE: Record<TransaksiQris['status'], string> = {
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

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [amount, setAmount] = useState('')
  const [qrisUrl, setQrisUrl] = useState<string | null>(null)
  const [qrString, setQrString] = useState<string | null>(null)
  const [transaksi, setTransaksi] = useState<TransaksiQris | null>(null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<'qr_string' | 'qris_url' | null>(null)
  const [namaPembeli, setNamaPembeli] = useState('')
  const [itemPembelian, setItemPembelian] = useState('')

  async function handleGenerateQris() {
  setError('')
  setLoading(true)
  setCopied(null)
  try {
    const res = await api.post<GenerateQrisResponse>('/api/transaksi-qris', {
      amount: Number(amount),
      nama_pembeli: namaPembeli || undefined,
      item_pembelian: itemPembelian || undefined,
    })
    setQrisUrl(res.data.qris_url)
    setQrString(res.data.qr_string)
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
      const res = await api.get<TransaksiQris>(
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
  setQrString(null)
  setTransaksi(null)
  setError('')
  setCopied(null)
}

  async function handleCopy(text: string, type: 'qr_string' | 'qris_url') {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard Admin</h1>
          <p className="text-sm text-gray-500">Halo, {user?.name} 👋</p>
        </div>
        <button
          onClick={logout}
          className="text-sm text-gray-500 hover:text-red-600 transition"
        >
          Logout
        </button>
        <Link to="/laporan" className="text-sm text-blue-600 hover:underline mr-4">
            Lihat Laporan
        </Link>
      </header>

      <main className="p-6 max-w-md mx-auto">
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-1">Generate QRIS</h2>
          <p className="text-sm text-gray-500 mb-4">
            Buat kode pembayaran QRIS untuk transaksi baru.
          </p>

          {!transaksi && (
            <>
              <label className="text-sm text-gray-600 mb-1 block">Nominal (Rp)</label>
              <input
                type="number"
                placeholder="50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <label className="text-sm text-gray-600 mb-1 block">Nama Pembeli (opsional)</label>
<input
  type="text"
  placeholder="Contoh: Budi"
  value={namaPembeli}
  onChange={(e) => setNamaPembeli(e.target.value)}
  className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
/>

<label className="text-sm text-gray-600 mb-1 block">Barang yang Dibeli (opsional)</label>
<input
  type="text"
  placeholder="Contoh: Bonsai Cemara Udang"
  value={itemPembelian}
  onChange={(e) => setItemPembelian(e.target.value)}
  className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
/>
              <button
                onClick={handleGenerateQris}
                disabled={loading || !amount}
                className="w-full bg-green-700 hover:bg-green-800 transition text-white py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                  Order ID{' '}
                  <span className="font-mono text-gray-700">{transaksi.order_id}</span>
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

              {qrString && (
                <div className="mt-4 text-left">
                  <p className="text-xs text-gray-500 mb-1">Untuk simulator Midtrans:</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(qrisUrl, 'qris_url')}
                      className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 transition text-gray-700 py-2 rounded-lg"
                    >
                      {copied === 'qris_url' ? '✓ URL Tersalin' : 'Copy QR Image URL'}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
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