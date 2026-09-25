import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Sprout, ShoppingCart, Banknote, QrCode, ArrowRight, Calendar } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../lib/api'
import type { DashboardStats } from '../types/dashboard'

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

function formatTanggalPendek(dateStr: string) {
  const [, month, day] = dateStr.split('-')
  const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  return `${day} ${bulan[Number(month) - 1]}`
}

function formatWaktu(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

function imageUrl(path: string) {
  return `http://localhost:8000/storage/${path}`
}

function PctBadge({ value }: { value: number }) {
  const positif = value >= 0
  return (
    <p className={`text-xs mt-1 ${positif ? 'text-green-600' : 'text-red-500'}`}>
      {positif ? '↑' : '↓'} {Math.abs(value)}% dari bulan lalu
    </p>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [periode, setPeriode] = useState(7)

  useEffect(() => {
    setLoading(true)
    api
      .get<DashboardStats>('/api/dashboard/stats', { params: { days: periode } })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [periode])

  const chartData = stats?.grafik_penjualan.map((d) => ({
    tanggal: formatTanggalPendek(d.tanggal),
    jumlah: d.jumlah,
  }))

  const today = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <main className="p-6">
      {loading || !stats ? (
        <p className="text-sm text-gray-500">Memuat data...</p>
      ) : (
        <>
          {/* Welcome banner */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-500">Selamat Datang,</p>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-sm text-gray-500 mt-1">
                Kelola katalog, penjualan, dan laporan dengan mudah dan efisien.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border rounded-lg px-3 py-2">
              <Calendar size={16} /> {today}
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border rounded-xl shadow-sm p-5">
              <div className="w-10 h-10 rounded-full bg-maroon-700 text-white flex items-center justify-center mb-3">
                <Sprout size={18} strokeWidth={1.75} />
              </div>
              <p className="text-xs text-gray-500">Total Bonsai</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total_bonsai}</p>
              <PctBadge value={stats.total_bonsai_pct} />
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-5">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mb-3">
                <ShoppingCart size={18} strokeWidth={1.75} />
              </div>
              <p className="text-xs text-gray-500">Total Penjualan</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total_penjualan}</p>
              <PctBadge value={stats.total_penjualan_pct} />
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-5">
              <div className="w-10 h-10 rounded-full bg-gold-500 text-white flex items-center justify-center mb-3">
                <Banknote size={18} strokeWidth={1.75} />
              </div>
              <p className="text-xs text-gray-500">Total Pendapatan</p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {formatRupiah(stats.total_pendapatan)}
              </p>
              <PctBadge value={stats.total_pendapatan_pct} />
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-5">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-3">
                <QrCode size={18} strokeWidth={1.75} />
              </div>
              <p className="text-xs text-gray-500">Transaksi QRIS</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total_qris}</p>
              <PctBadge value={stats.total_qris_pct} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Grafik Penjualan</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Data penjualan {periode} hari terakhir
                  </p>
                </div>
                <select
                  value={periode}
                  onChange={(e) => setPeriode(Number(e.target.value))}
                  className="border rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-maroon-600"
                >
                  <option value={7}>7 Hari Terakhir</option>
                  <option value={14}>14 Hari Terakhir</option>
                  <option value={30}>30 Hari Terakhir</option>
                  <option value={90}>90 Hari Terakhir</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPenjualan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#15532c" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#15532c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="tanggal" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="jumlah"
                    stroke="#15532c"
                    strokeWidth={2}
                    fill="url(#colorPenjualan)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Penjualan terbaru */}
            <div className="bg-white border rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold text-gray-900">Penjualan Terbaru</h2>
                <Link to="/laporan" className="text-xs text-maroon-700 hover:underline">
                  Lihat Semua →
                </Link>
              </div>
              <div className="space-y-3">
                {stats.penjualan_terbaru.length === 0 && (
                  <p className="text-xs text-gray-400">Belum ada transaksi.</p>
                )}
                {stats.penjualan_terbaru.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-maroon-50 flex items-center justify-center shrink-0 overflow-hidden">
                      {item.foto ? (
                        <img
                          src={imageUrl(item.foto)}
                          alt={item.nama}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Sprout size={18} className="text-maroon-700" strokeWidth={1.75} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.nama}</p>
                      <p className="text-xs text-gray-400">{formatWaktu(item.waktu)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium text-gray-900">
                        {formatRupiah(item.harga)}
                      </p>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          item.metode === 'QRIS'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.metode}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Link
              to="/transaksi-qris"
              className="bg-white border rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition group"
            >
              <div>
                <h2 className="font-semibold text-gray-900">QRIS Dinamis</h2>
                <p className="text-sm text-gray-500 mt-1">Generate QRIS Midtrans</p>
              </div>
              <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition" />
            </Link>

            <Link
              to="/laporan"
              className="bg-white border rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition group"
            >
              <div>
                <h2 className="font-semibold text-gray-900">Laporan Penjualan</h2>
                <p className="text-sm text-gray-500 mt-1">Lihat & export laporan</p>
              </div>
              <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition" />
            </Link>

            <Link
              to="/laporan-manual"
              className="bg-white border rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition group"
            >
              <div>
                <h2 className="font-semibold text-gray-900">Laporan Manual</h2>
                <p className="text-sm text-gray-500 mt-1">Catat pesanan offline</p>
              </div>
              <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <footer className="text-center text-xs text-gray-400 pt-4 border-t">
            © {new Date().getFullYear()} Bonsai Gerung. All rights reserved.
          </footer>
        </>
      )}
    </main>
  )
}