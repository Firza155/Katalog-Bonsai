import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'
import { Home, QrCode, BarChart3, FileText, Trees, LogOut } from 'lucide-react'

const menuItems = [
  { to: '/', label: 'Dashboard', icon: Home, end: true },
  { to: '/katalog-bonsai', label: 'Katalog Bonsai', icon: Trees },
  { to: '/transaksi-qris', label: 'Transaksi QRIS', icon: QrCode },
  { to: '/laporan', label: 'Laporan Penjualan', icon: BarChart3 },
  { to: '/laporan-manual', label: 'Laporan Manual', icon: FileText },
]

export default function Layout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex bg-cream-50">
      <aside className="w-64 bg-gradient-to-b from-maroon-900 to-black flex flex-col">
        <div className="px-5 py-5 border-b border-white/10 flex flex-col items-center">
          <img src={logo} alt="Bonsai Gerung" className="w-20 h-20 object-contain" />
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                    isActive
                      ? 'bg-maroon-700 text-white font-medium'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.75} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition"
          >
            <LogOut size={18} strokeWidth={1.75} />
            Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-auto">
        <div className="bg-white border-b px-6 py-3 flex justify-end items-center">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}