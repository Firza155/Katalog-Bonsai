import { useEffect, useState } from 'react'
import api from '../lib/api'
import type { TransaksiQris } from '../types/transaksi'
import type { LaporanManual, LaporanRow } from '../types/laporan'

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export default function Laporan() {
  const [rows, setRows] = useState<LaporanRow[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState('')

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [format, setFormat] = useState<'xlsx' | 'csv'>('xlsx')

  async function loadData() {
    setLoading(true)
    setError('')
    try {
      const [qrisRes, manualRes] = await Promise.all([
        api.get<{ data: TransaksiQris[] }>('/api/transaksi-qris', {
          params: { status: 'settlement' },
        }),
        api.get<{ data: LaporanManual[] }>('/api/laporan-manual'),
      ])

      const qrisRows: LaporanRow[] = qrisRes.data.data.map((t) => ({
        tanggal: t.created_at.slice(0, 10),
        nama_pembeli: t.nama_pembeli || '-',
        item: t.item_pembelian || `Order ${t.order_id}`,
        harga: Number(t.amount),
        metode: 'QRIS',
        catatan: t.order_id,
      }))

      const manualRows: LaporanRow[] = manualRes.data.data.map((l) => ({
        tanggal: l.tanggal,
        nama_pembeli: l.nama_pembeli,
        item: l.item,
        harga: Number(l.harga),
        metode: 'Manual/Offline',
        catatan: l.catatan,
      }))

      const merged = [...qrisRows, ...manualRows].sort((a, b) =>
        a.tanggal < b.tanggal ? 1 : -1
      )

      setRows(merged)
    } catch (err) {
      console.error(err)
      setError('Gagal memuat data laporan.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  async function handleExport() {
    setExporting(true)
    setError('')
    try {
      const res = await api.get('/api/laporan/export', {
        params: { from: from || undefined, to: to || undefined, format },
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.download = `laporan-penjualan-${new Date().toISOString().slice(0, 10)}.${format}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      setError('Gagal export laporan.')
    } finally {
      setExporting(false)
    }
  }

  const totalOmzet = rows.reduce((sum, r) => sum + r.harga, 0)

  return (
    <div>
      <header className="bg-white border-b-2 border-gold-500/30 px-6 py-4">
        <h1 className="text-lg font-semibold text-maroon-800">Laporan Penjualan</h1>
        <p className="text-sm text-gray-500">Gabungan transaksi QRIS &amp; manual</p>
      </header>

      <main className="p-6 max-w-4xl">
        <div className="bg-white border border-gold-500/20 rounded-xl shadow-sm p-5 mb-6">
          <h2 className="text-sm font-semibold text-maroon-800 mb-3">Export Laporan</h2>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Dari Tanggal</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Sampai Tanggal</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'xlsx' | 'csv')}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
              >
                <option value="xlsx">Excel (.xlsx)</option>
                <option value="csv">CSV (.csv)</option>
              </select>
            </div>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="bg-maroon-700 hover:bg-maroon-800 transition text-gold-300 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {exporting ? 'Menyiapkan file...' : '⬇ Export Laporan'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        <div className="bg-white border border-gold-500/20 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gold-500/20 bg-maroon-50/50 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {rows.length} transaksi ditampilkan
            </span>
            <span className="text-sm font-semibold text-maroon-800">
              Total: {formatRupiah(totalOmzet)}
            </span>
          </div>

          {loading ? (
            <p className="p-6 text-center text-gray-500 text-sm">Memuat data...</p>
          ) : rows.length === 0 ? (
            <p className="p-6 text-center text-gray-500 text-sm">Belum ada transaksi.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-maroon-800 text-gold-300 text-left">
                <tr>
                  <th className="px-5 py-3 font-medium">Tanggal</th>
                  <th className="px-5 py-3 font-medium">Pembeli</th>
                  <th className="px-5 py-3 font-medium">Item</th>
                  <th className="px-5 py-3 font-medium">Harga</th>
                  <th className="px-5 py-3 font-medium">Metode</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-gold-500/10 hover:bg-cream-50 transition"
                  >
                    <td className="px-5 py-3 text-gray-600">{row.tanggal}</td>
                    <td className="px-5 py-3 text-gray-800">{row.nama_pembeli}</td>
                    <td className="px-5 py-3 text-gray-800">{row.item}</td>
                    <td className="px-5 py-3 text-gray-900 font-medium">
                      {formatRupiah(row.harga)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          row.metode === 'QRIS'
                            ? 'bg-maroon-100 text-maroon-700'
                            : 'bg-gold-500/20 text-gold-600'
                        }`}
                      >
                        {row.metode}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}