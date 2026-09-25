import { useState, useEffect, useRef } from 'react'
import api from '../lib/api'
import type { GenerateQrisResponse, TransaksiQris as TransaksiQrisType } from '../types/transaksi'
import type { Bonsai } from '../types/bonsai'

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
  const [selectedBonsai, setSelectedBonsai] = useState<Bonsai | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [qrisUrl, setQrisUrl] = useState<string | null>(null)
  const [transaksi, setTransaksi] = useState<TransaksiQrisType | null>(null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const [daftarBonsai, setDaftarBonsai] = useState<Bonsai[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    api
      .get<{ data: Bonsai[] }>('/api/bonsais')
      .then((res) => setDaftarBonsai(res.data.data))
      .catch((err) => console.error(err))
  }, [])

  // Tutup daftar saran saat klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto-polling status transaksi selama masih pending
  useEffect(() => {
    if (!transaksi || transaksi.status !== 'pending') return

    const interval = setInterval(async () => {
      try {
        const res = await api.get<TransaksiQrisType>(
          `/api/transaksi-qris/${transaksi.order_id}/cek-status`
        )
        setTransaksi(res.data)

        if (res.data.status === 'settlement') {
          const bonsaiRes = await api.get<{ data: Bonsai[] }>('/api/bonsais')
          setDaftarBonsai(bonsaiRes.data.data)
        }
      } catch (err) {
        console.error('Polling error:', err)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [transaksi])

  const filteredBonsai =
    searchQuery.trim() === ''
      ? daftarBonsai
      : daftarBonsai.filter((b) =>
          b.nama.toLowerCase().includes(searchQuery.toLowerCase())
        )

  function handleSelectBonsai(b: Bonsai) {
    setSelectedBonsai(b)
    setSearchQuery(b.nama)
    setShowSuggestions(false)
  }

  function handleClearBonsai() {
    setSelectedBonsai(null)
    setSearchQuery('')
  }

  async function handleGenerateQris() {
    setError('')
    setLoading(true)
    setCopied(false)
    try {
      const res = await api.post<GenerateQrisResponse>('/api/transaksi-qris', {
        amount: Number(amount),
        nama_pembeli: namaPembeli || undefined,
        bonsai_id: selectedBonsai?.id || undefined,
        item_pembelian: selectedBonsai?.nama || searchQuery || undefined,
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
      if (res.data.status === 'settlement') {
        const bonsaiRes = await api.get<{ data: Bonsai[] }>('/api/bonsais')
        setDaftarBonsai(bonsaiRes.data.data)
      }
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
    setSelectedBonsai(null)
    setSearchQuery('')
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
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-maroon-600"
              />

              <label className="text-sm text-gray-600 mb-1 block">
                Barang yang Dibeli (opsional)
              </label>
              <div ref={wrapperRef} className="relative mb-3">
                <input
                  type="text"
                  placeholder="Ketik nama bonsai untuk mencari..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setSelectedBonsai(null)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-maroon-600"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearBonsai}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    ✕
                  </button>
                )}

                {showSuggestions && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-56 overflow-y-auto">
                    {filteredBonsai.length === 0 ? (
                      <p className="text-sm text-gray-400 px-3 py-2">
                        Tidak ada bonsai yang cocok.
                      </p>
                    ) : (
                      filteredBonsai.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          disabled={b.status !== 'tersedia'}
                          onClick={() => handleSelectBonsai(b)}
                          className={`w-full text-left px-3 py-2 text-sm flex justify-between items-center transition ${
                            b.status !== 'tersedia'
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-700 hover:bg-cream-50'
                          }`}
                        >
                          <span>{b.nama}</span>
                          {b.status !== 'tersedia' && (
                            <span className="text-[10px] text-gray-400">
                              {b.status === 'terjual' ? 'Terjual' : 'Pending'}
                            </span>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              <label className="text-sm text-gray-600 mb-1 block">Nominal (Rp)</label>
              <input
                type="number"
                placeholder="50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-maroon-600"
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
                {transaksi.status === 'pending' && (
                  <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Memantau pembayaran otomatis...
                  </p>
                )}
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