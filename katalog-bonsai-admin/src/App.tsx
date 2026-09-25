import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TransaksiQris from './pages/TransaksiQris'
import Laporan from './pages/Laporan'
import LaporanManual from './pages/LaporanManual'
import KatalogBonsai from './pages/KatalogBonsai'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/transaksi-qris" element={<TransaksiQris />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/laporan-manual" element={<LaporanManual />} />
            <Route path="/katalog-bonsai" element={<KatalogBonsai />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
