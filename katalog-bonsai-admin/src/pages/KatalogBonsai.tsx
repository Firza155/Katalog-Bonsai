import { useEffect, useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import api from '../lib/api'
import type { Bonsai } from '../types/bonsai'

const KATEGORI_LABEL: Record<Bonsai['kategori'], string> = {
  bahan: 'Bahan',
  prospek: 'Prospek',
  bonsai_jadi: 'Bonsai Jadi',
}

const STATUS_LABEL: Record<Bonsai['status'], string> = {
  tersedia: 'Tersedia',
  pending: 'Pending',
  terjual: 'Terjual',
}

const STATUS_STYLE: Record<Bonsai['status'], string> = {
  tersedia: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-800',
  terjual: 'bg-gray-200 text-gray-600',
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

function imageUrl(path: string) {
  return `http://localhost:8000/storage/${path}`
}

const emptyForm = {
  nama: '',
  deskripsi: '',
  harga: '',
  kategori: 'bahan' as Bonsai['kategori'],
  status: 'tersedia' as Bonsai['status'],
}

export default function KatalogBonsai() {
  const [list, setList] = useState<Bonsai[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [filterKategori, setFilterKategori] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [saving, setSaving] = useState(false)

  async function loadData() {
    setLoading(true)
    try {
      const res = await api.get<{ data: Bonsai[] }>('/api/bonsais', {
        params: {
          kategori: filterKategori || undefined,
          status: filterStatus || undefined,
        },
      })
      setList(res.data.data)
    } catch (err) {
      console.error(err)
      setError('Gagal memuat data katalog.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [filterKategori, filterStatus])

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setNewFiles([])
    setShowForm(true)
  }

  function openEdit(item: Bonsai) {
    setEditingId(item.id)
    setForm({
      nama: item.nama,
      deskripsi: item.deskripsi ?? '',
      harga: item.harga,
      kategori: item.kategori,
      status: item.status,
    })
    setNewFiles([])
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    setNewFiles([])
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const fd = new FormData()
    fd.append('nama', form.nama)
    fd.append('deskripsi', form.deskripsi)
    fd.append('harga', form.harga)
    fd.append('kategori', form.kategori)
    fd.append('status', form.status)
    newFiles.forEach((file) => fd.append('images[]', file))

    try {
      if (editingId) {
        fd.append('_method', 'PUT')
        await api.post(`/api/bonsais/${editingId}`, fd)
      } else {
        await api.post('/api/bonsais', fd)
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
    if (!confirm('Hapus bonsai ini beserta seluruh fotonya?')) return
    try {
      await api.delete(`/api/bonsais/${id}`)
      loadData()
    } catch (err) {
      console.error(err)
      setError('Gagal menghapus data.')
    }
  }

  async function handleDeleteImage(bonsaiId: number, imageId: number) {
    if (!confirm('Hapus foto ini?')) return
    try {
      await api.delete(`/api/bonsais/${bonsaiId}/images/${imageId}`)
      loadData()
    } catch (err) {
      console.error(err)
      setError('Gagal menghapus foto.')
    }
  }

  return (
    <div>
      <header className="bg-white border-b-2 border-gold-500/30 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-maroon-800">Katalog Bonsai</h1>
          <p className="text-sm text-gray-500">Kelola daftar bonsai yang dijual</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 transition text-gold-300 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Tambah Bonsai
        </button>
      </header>

      <main className="p-6">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Filter */}
        <div className="flex gap-3 mb-5">
          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
          >
            <option value="">Semua Kategori</option>
            <option value="bahan">Bahan</option>
            <option value="prospek">Prospek</option>
            <option value="bonsai_jadi">Bonsai Jadi</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
          >
            <option value="">Semua Status</option>
            <option value="tersedia">Tersedia</option>
            <option value="pending">Pending</option>
            <option value="terjual">Terjual</option>
          </select>
        </div>

        {/* Form modal sederhana (inline, bukan overlay) */}
        {showForm && (
          <div className="bg-white border border-gold-500/20 rounded-xl shadow-sm p-5 mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold text-maroon-800">
                {editingId ? 'Edit Bonsai' : 'Tambah Bonsai Baru'}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Nama Bonsai</label>
                <input
                  type="text"
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
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
                <label className="text-xs text-gray-500 mb-1 block">Kategori</label>
                <select
                  value={form.kategori}
                  onChange={(e) =>
                    setForm({ ...form, kategori: e.target.value as Bonsai['kategori'] })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
                >
                  <option value="bahan">Bahan</option>
                  <option value="prospek">Prospek</option>
                  <option value="bonsai_jadi">Bonsai Jadi</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as Bonsai['status'] })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
                >
                  <option value="tersedia">Tersedia</option>
                  <option value="pending">Pending</option>
                  <option value="terjual">Terjual</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">Deskripsi</label>
                <textarea
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  rows={2}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">
                  Tambah Foto {editingId && '(opsional, foto lama tidak akan terhapus)'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setNewFiles(Array.from(e.target.files ?? []))}
                  className="w-full text-sm border rounded-lg px-3 py-2"
                />
              </div>

              {/* Foto yang sudah ada, saat edit */}
              {editingId && (
                (() => {
                  const current = list.find((b) => b.id === editingId)
                  if (!current || current.images.length === 0) return null
                  return (
                    <div className="sm:col-span-2">
                      <p className="text-xs text-gray-500 mb-2">Foto saat ini:</p>
                      <div className="flex flex-wrap gap-2">
                        {current.images.map((img) => (
                          <div key={img.id} className="relative">
                            <img
                              src={imageUrl(img.path_foto)}
                              alt=""
                              className="w-16 h-16 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(current.id, img.id)}
                              className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })()
              )}

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

        {/* Grid katalog */}
        {loading ? (
          <p className="text-sm text-gray-500">Memuat data...</p>
        ) : list.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada bonsai di katalog.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gold-500/20 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {item.images[0] ? (
                    <img
                      src={imageUrl(item.images[0].path_foto)}
                      alt={item.nama}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-300 text-sm">Belum ada foto</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-medium text-gray-900 text-sm">{item.nama}</h3>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${STATUS_STYLE[item.status]}`}
                    >
                      {STATUS_LABEL[item.status]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {KATEGORI_LABEL[item.kategori]}
                  </p>
                  <p className="text-maroon-800 font-semibold mt-1">
                    {formatRupiah(Number(item.harga))}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => openEdit(item)}
                      className="flex-1 flex items-center justify-center gap-1 text-xs border border-gray-300 hover:bg-gray-50 transition py-1.5 rounded-lg"
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 flex items-center justify-center gap-1 text-xs text-red-600 border border-red-200 hover:bg-red-50 transition py-1.5 rounded-lg"
                    >
                      <Trash2 size={13} /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}