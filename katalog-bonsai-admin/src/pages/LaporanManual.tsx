import { useEffect, useState, type FormEvent } from 'react'
import api from '../lib/api'
import type { LaporanManual as LaporanManualType } from '../types/laporan'

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

const emptyForm = {
  nama_pembeli: '',
  item: '',
  harga: '',
  tanggal: '',
  catatan: '',
}

export default function LaporanManual() {
  const [list, setList] = useState<LaporanManualType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function loadData() {
    setLoading(true)
    try {
      const res = await api.get<{ data: LaporanManualType[] }>('/api/laporan-manual')
      setList(res.data.data)
    } catch (err) {
      console.error(err)
      setError('Gagal memuat data laporan manual.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(item: LaporanManualType) {
    setEditingId(item.id)
    setForm({
      nama_pembeli: item.nama_pembeli,
      item: item.item,
      harga: item.harga,
      tanggal: item.tanggal,
      catatan: item.catatan ?? '',
    })
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = {
        nama_pembeli: form.nama_pembeli,
        item: form.item,
        harga: Number(form.harga),
        tanggal: form.tanggal,
        catatan: form.catatan || null,
      }

      if (editingId) {
        await api.put(`/api/laporan-manual/${editingId}`, payload)
      } else {
        await api.post('/api/laporan-manual', payload)
      }

      closeForm()
      loadData()
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan data. Cek kembali isian form.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Hapus data laporan ini?')) return
    try {
      await api.delete(`/api/laporan-manual/${id}`)
      loadData()
    } catch (err) {
      console.error(err)
      setError('Gagal menghapus data.')
    }
  }

  return (
    <div>
      <header className="bg-white border-b-2 border-gold-500/30 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-maroon-800">Laporan Manual</h1>
          <p className="text-sm text-gray-500">Catat pesanan offline / di luar QRIS</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-maroon-700 hover:bg-maroon-800 transition text-gold-300 px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Tambah Laporan
        </button>
      </header>

      <main className="p-6 max-w-4xl">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {showForm && (
          <div className="bg-white border border-gold-500/20 rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-sm font-semibold text-maroon-800 mb-3">
              {editingId ? 'Edit Laporan' : 'Tambah Laporan Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Nama Pembeli</label>
                <input
                  type="text"
                  required
                  value={form.nama_pembeli}
                  onChange={(e) => setForm({ ...form, nama_pembeli: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Item</label>
                <input
                  type="text"
                  required
                  value={form.item}
                  onChange={(e) => setForm({ ...form, item: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.harga}
                  onChange={(e) => setForm({ ...form, harga: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Tanggal</label>
                <input
                  type="date"
                  required
                  value={form.tanggal}
                  onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">Catatan (opsional)</label>
                <textarea
                  value={form.catatan}
                  onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
                  rows={2}
                />
              </div>

              <div className="sm:col-span-2 flex gap-2 mt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-maroon-700 hover:bg-maroon-800 transition text-gold-300 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  {saving ? 'Menyimpan...' : editingId ? 'Update' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="text-sm text-gray-500 hover:text-gray-700 transition px-4 py-2"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white border border-gold-500/20 rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-6 text-center text-gray-500 text-sm">Memuat data...</p>
          ) : list.length === 0 ? (
            <p className="p-6 text-center text-gray-500 text-sm">Belum ada laporan manual.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-maroon-800 text-gold-300 text-left">
                <tr>
                  <th className="px-5 py-3 font-medium">Tanggal</th>
                  <th className="px-5 py-3 font-medium">Pembeli</th>
                  <th className="px-5 py-3 font-medium">Item</th>
                  <th className="px-5 py-3 font-medium">Harga</th>
                  <th className="px-5 py-3 font-medium">Catatan</th>
                  <th className="px-5 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id} className="border-t border-gold-500/10 hover:bg-cream-50 transition">
                    <td className="px-5 py-3 text-gray-600">{item.tanggal}</td>
                    <td className="px-5 py-3 text-gray-800">{item.nama_pembeli}</td>
                    <td className="px-5 py-3 text-gray-800">{item.item}</td>
                    <td className="px-5 py-3 text-gray-900 font-medium">
                      {formatRupiah(Number(item.harga))}
                    </td>
                    <td className="px-5 py-3 text-gray-500">{item.catatan || '-'}</td>
                    <td className="px-5 py-3 text-right space-x-3">
                      <button
                        onClick={() => openEdit(item)}
                        className="text-maroon-700 hover:underline text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:underline text-xs font-medium"
                      >
                        Hapus
                      </button>
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