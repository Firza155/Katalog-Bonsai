// Mengambil useState untuk menyimpan state input dan state UI.
import { useState } from "react";
import type { FormEvent } from "react";

// Mengambil icon dari library Lucide React.
import { Eye, EyeOff, LockKeyhole, LogIn, UserRound } from "lucide-react";

import logo from "../../assets/logo-bonsai-gerung.png";

// Mengambil gambar bonsai yang akan digunakan sebagai background.
import bonsaiBackground from "../../assets/bonsai-bg.png";

// Mendefinisikan component Login User.
export default function Login() {
  // Menyimpan nilai email yang dimasukkan user.
  const [email, setEmail] = useState("");

  // Menyimpan nilai password yang dimasukkan user.
  const [password, setPassword] = useState("");

  // Menyimpan status checkbox "ingat saya".
  const [rememberMe, setRememberMe] = useState(false);

  // Menentukan apakah password sedang ditampilkan atau disembunyikan.
  const [showPassword, setShowPassword] = useState(false);

  // Menyimpan status loading ketika tombol login ditekan.
  const [loading, setLoading] = useState(false);

  // Fungsi yang dijalankan ketika form login dikirim.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Mencegah browser melakukan reload halaman.
    event.preventDefault();

    // Mengubah status loading menjadi true.
    setLoading(true);

    try {
      // Untuk sekarang data hanya kita tampilkan di console.
      // Nanti bagian ini akan diganti dengan request ke Laravel.
      console.log({
        // Menampilkan email yang diinput user.
        email,

        // Menampilkan password yang diinput user.
        password,

        // Menampilkan status remember me.
        rememberMe,
      });

      // Simulasi proses request selama satu detik.
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      // Mengembalikan loading menjadi false setelah proses selesai.
      setLoading(false);
    }
  };

  // Mengembalikan tampilan halaman login.
  return (
    // Container utama halaman login yang memenuhi seluruh layar.
    <main className="min-h-screen bg-primary">
      {/* Membagi halaman menjadi dua kolom pada layar besar. */}
      <div className="grid min-h-screen lg:grid-cols-[45%_55%]">
        {/* Kolom kiri yang berisi branding dan background bonsai. */}
        <section className="relative hidden overflow-hidden lg:block">
          {/* Background warna hijau utama. */}
          <div className="absolute inset-0 bg-primary" />

          {/* Gambar bonsai yang digunakan sebagai dekorasi background. */}
          <img
            /* Sumber gambar berasal dari asset bonsai. */
            src={bonsaiBackground}
            /* Alt dikosongkan karena gambar hanya bersifat dekoratif. */
            alt=""
            /* Memberi tahu screen reader bahwa gambar dekoratif. */
            aria-hidden="true"
            /* Menentukan ukuran gambar dan posisi gambarnya. */
            className="absolute bottom-0 left-0 w-[110%] max-w-none opacity-40"
          />

          {/* Overlay untuk menyatukan gambar dengan warna hijau. */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/25 to-primary" />

          {/* Container konten brand di atas background. */}
          <div className="relative z-10 flex h-full flex-col justify-between p-12">
            {/* Area teks brand. */}
            <div className="max-w-md">
              {/* Label kecil nama brand. */}
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/60">
                Bonsai Gerung
              </p>

              {/* Tagline utama brand. */}
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white">
                Di bentuk oleh waktu,
                <br />
                dikuatkan dengan kesabaran.
              </h1>

              {/* Deskripsi singkat untuk halaman login user. */}
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
                Jelajahi koleksi bonsai pilihan dari Bonsai Gerung dan temukan
                bonsai yang sesuai dengan karakter Anda.
              </p>
            </div>

            {/* Copyright bagian bawah. */}
            <p className="text-xs text-white/45">
              © 2026 Bonsai Gerung. All rights reserved.
            </p>
          </div>
        </section>

        {/* Kolom kanan yang berisi form login. */}
        <section className="flex min-h-screen items-center justify-center bg-cream px-5 py-10 sm:px-8">
          {/* Wrapper agar lebar form tidak terlalu besar. */}
          <div className="w-full max-w-md">
            {/* Card utama login. */}
            <div className="rounded-3xl border border-border bg-white p-7 shadow-xl shadow-primary/5 sm:p-9">
              {/* Area logo brand. */}
              <div className="mb-8 flex justify-center">
                {/* Menampilkan logo Bonsai Gerung. */}
                <img
                  /* Sumber logo. */
                  src={logo}
                  /* Memberikan alternatif teks untuk accessibility. */
                  alt="Bonsai Gerung"
                  /* Mengatur ukuran maksimal logo. */
                  className="h-auto w-[260px] object-contain"
                />
              </div>

              {/* Heading halaman login. */}
              <div className="mb-7">
                {/* Judul utama. */}
                <h2 className="text-2xl font-semibold text-dark">
                  Selamat Datang
                </h2>

                {/* Deskripsi halaman login. */}
                <p className="mt-2 text-sm leading-6 text-muted">
                  Login untuk melanjutkan ke akun Bonsai Gerung.
                </p>
              </div>

              {/* Form login. */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Field email. */}
                <div>
                  {/* Label untuk input email. */}
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-dark"
                  >
                    Email
                  </label>

                  {/* Wrapper input email dan icon. */}
                  <div className="relative">
                    {/* Icon user di sebelah kiri input. */}
                    <UserRound
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    />

                    {/* Input email. */}
                    <input
                      /* ID input untuk label. */
                      id="email"
                      /* Nama field untuk proses form. */
                      name="email"
                      /* Menentukan tipe input email. */
                      type="email"
                      /* Membantu browser melakukan autocomplete. */
                      autoComplete="email"
                      /* Menghubungkan input dengan state email. */
                      value={email}
                      /* Mengupdate state ketika user mengetik. */
                      onChange={(event) => setEmail(event.target.value)}
                      /* Placeholder input. */
                      placeholder="Masukkan email"
                      /* Membuat field wajib diisi. */
                      required
                      /* Styling input. */
                      className="w-full rounded-xl border border-border bg-white py-3.5 pl-11 pr-4 text-sm text-dark outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </div>
                </div>

                {/* Field password. */}
                <div>
                  {/* Label password. */}
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-dark"
                  >
                    Password
                  </label>

                  {/* Wrapper input password dan icon. */}
                  <div className="relative">
                    {/* Icon lock di sebelah kiri input. */}
                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    />

                    {/* Input password. */}
                    <input
                      /* ID input password. */
                      id="password"
                      /* Nama field password. */
                      name="password"
                      /* Mengubah tipe berdasarkan state showPassword. */
                      type={showPassword ? "text" : "password"}
                      /* Membantu browser autocomplete password. */
                      autoComplete="current-password"
                      /* Menghubungkan input dengan state password. */
                      value={password}
                      /* Mengupdate password ketika user mengetik. */
                      onChange={(event) => setPassword(event.target.value)}
                      /* Placeholder input. */
                      placeholder="Masukkan password"
                      /* Membuat field password wajib diisi. */
                      required
                      /* Styling input password. */
                      className="w-full rounded-xl border border-border bg-white py-3.5 pl-11 pr-12 text-sm text-dark outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />

                    {/* Tombol untuk menampilkan atau menyembunyikan password. */}
                    <button
                      /* Mencegah button mengirimkan form. */
                      type="button"
                      /* Mengubah state visibility password. */
                      onClick={() => setShowPassword((value) => !value)}
                      /* Styling tombol icon. */
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-primary"
                      /* Accessibility label. */
                      aria-label={
                        showPassword
                          ? "Sembunyikan password"
                          : "Tampilkan password"
                      }
                    >
                      {/* Menampilkan icon sesuai state password. */}
                      {showPassword ? (
                        /* Icon ketika password sedang terlihat. */
                        <EyeOff size={19} />
                      ) : (
                        /* Icon ketika password sedang tersembunyi. */
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Area remember me dan lupa password. */}
                <div className="flex items-center justify-between gap-4">
                  {/* Label checkbox. */}
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                    {/* Checkbox remember me. */}
                    <input
                      /* Menentukan checkbox. */
                      type="checkbox"
                      /* Menghubungkan dengan state rememberMe. */
                      checked={rememberMe}
                      /* Mengubah state ketika checkbox diklik. */
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                      /* Menggunakan warna primary untuk checkbox. */
                      className="h-4 w-4 rounded border-gray-300 accent-primary"
                    />

                    {/* Teks checkbox. */}
                    Ingat saya
                  </label>

                  {/* Tombol lupa password. */}
                  <button
                    /* Button tidak melakukan submit. */
                    type="button"
                    /* Styling link. */
                    className="text-sm font-medium text-primary transition hover:text-primary-light"
                  >
                    {/* Teks link. */}
                    Lupa password?
                  </button>
                </div>

                {/* Tombol login utama. */}
                <button
                  /* Menentukan button sebagai submit form. */
                  type="submit"
                  /* Menonaktifkan button ketika loading. */
                  disabled={loading}
                  /* Styling tombol utama. */
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {/* Icon login. */}
                  <LogIn size={18} />

                  {/* Mengubah teks berdasarkan status loading. */}
                  {loading ? "Memproses..." : "Masuk"}
                </button>
              </form>

              {/* Garis pemisah sebelum footer. */}
              <div className="my-7 h-px bg-border" />

              {/* Copyright aplikasi. */}
              <p className="text-center text-xs leading-5 text-gray-400">
                © 2026 Bonsai Gerung. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}