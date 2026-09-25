import { ArrowRight, MapPin, MessageCircle, Package, Phone} from "lucide-react";
import { Link } from "react-router-dom";
import { contactData } from "../../data/contactData";

// Membuat halaman Kontak User.
export default function Contact() {
  // Membuat URL WhatsApp menggunakan pesan default.
  const whatsappUrl = contactData.getWhatsappUrl();

  // Mengembalikan tampilan halaman Kontak.
  return (
    // Wrapper utama halaman.
    <main className="bg-cream">
      {/* Section hero dengan background cream seperti halaman lainnya. */}
      <section className="bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* Container utama hero. */}
        <div className="mx-auto max-w-7xl">
          {/* Grid hero menjadi dua kolom pada desktop. */}
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Kolom kiri berisi teks utama. */}
            <div className="max-w-2xl">
              {/* Label kecil halaman. */}
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
                Hubungi Kami
              </p>

              {/* Judul utama halaman. */}
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Mari Berkenalan dengan Bonsai Gerung
              </h1>

              {/* Deskripsi hero berdasarkan alur bisnis project. */}
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Temukan bonsai yang Anda minati, kemudian hubungi kami melalui
                WhatsApp untuk mendapatkan informasi lebih lanjut mengenai
                produk dan melanjutkan proses negosiasi.
              </p>

              {/* Area tombol hero. */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {/* Tombol utama menuju WhatsApp. */}
                <a
                  // Menggunakan URL WhatsApp yang sudah dibuat.
                  href={whatsappUrl}
                  // Membuka WhatsApp pada tab baru.
                  target="_blank"
                  // Mengamankan tab baru dari halaman asal.
                  rel="noopener noreferrer"
                  // Memberikan styling tombol utama.
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/10 transition hover:-translate-y-0.5 hover:bg-accent/90"
                >
                  {/* Menampilkan icon WhatsApp. */}
                  <MessageCircle size={19} />

                  {/* Teks tombol. */}
                  Chat via WhatsApp
                </a>

                {/* Tombol kedua menuju katalog. */}
                <Link
                  // Mengarahkan user menuju katalog.
                  to="/katalog"
                  // Memberikan styling tombol sekunder.
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-6 py-3.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                >
                  {/* Teks tombol. */}
                  Lihat Katalog

                  {/* Icon panah. */}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Kolom kanan berisi card informasi kontak. */}
            <div className="flex justify-center lg:justify-end">
              {/* Card utama informasi. */}
              <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl shadow-primary/5 ring-1 ring-black/5 sm:p-8">
                {/* Heading card. */}
                <h2 className="text-2xl font-semibold text-primary">
                  Informasi Kontak
                </h2>

                {/* Garis pemisah. */}
                <div className="my-6 h-px bg-border" />

                {/* Informasi lokasi. */}
                <div className="flex gap-4">
                  {/* Container icon lokasi. */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {/* Icon lokasi. */}
                    <MapPin size={20} />
                  </div>

                  {/* Isi informasi lokasi. */}
                  <div>
                    {/* Label informasi. */}
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      Lokasi
                    </p>

                    {/* Nilai lokasi. */}
                    <p className="mt-1 text-sm font-semibold text-dark">
                      {contactData.location}
                    </p>
                  </div>
                </div>

                {/* Informasi WhatsApp. */}
                <div className="mt-6 flex gap-4">
                  {/* Container icon WhatsApp. */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    {/* Icon telepon. */}
                    <Phone size={20} />
                  </div>

                  {/* Isi informasi WhatsApp. */}
                  <div>
                    {/* Label informasi. */}
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      WhatsApp
                    </p>

                    {/* Link WhatsApp. */}
                    <a
                      // Membuka URL WhatsApp.
                      href={whatsappUrl}
                      // Membuka link pada tab baru.
                      target="_blank"
                      // Mengamankan tab baru.
                      rel="noopener noreferrer"
                      // Memberikan styling link.
                      className="mt-1 inline-block text-sm font-semibold text-primary transition hover:text-accent"
                    >
                      {/* Teks link. */}
                      Hubungi melalui WhatsApp
                    </a>
                  </div>
                </div>

                {/* Informasi usaha. */}
                <div className="mt-6 flex gap-4">
                  {/* Container icon usaha. */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-primary">
                    {/* Menggunakan icon package untuk menggambarkan produk. */}
                    <Package size={20} />
                  </div>

                  {/* Isi informasi usaha. */}
                  <div>
                    {/* Label informasi. */}
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      Koleksi
                    </p>

                    {/* Informasi kategori. */}
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      Bahan, Prospek, dan Bonsai Jadi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section alur pemesanan. */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        {/* Container utama. */}
        <div className="mx-auto max-w-7xl">
          {/* Heading section. */}
          <div className="mx-auto max-w-2xl text-center">
            {/* Label kecil. */}
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
              Cara Pemesanan
            </p>

            {/* Judul section. */}
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
              Bagaimana Prosesnya?
            </h2>

            {/* Deskripsi section. */}
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Website membantu Anda menemukan informasi produk dan memulai
              komunikasi dengan Bonsai Gerung.
            </p>
          </div>

          {/* Grid tiga langkah. */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Langkah pertama. */}
            <article className="rounded-3xl border border-border bg-cream p-7">
              {/* Nomor langkah. */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
                {/* Nomor satu. */}
                1
              </div>

              {/* Judul langkah pertama. */}
              <h3 className="mt-6 text-xl font-semibold text-primary">
                Pilih Bonsai
              </h3>

              {/* Deskripsi langkah pertama. */}
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Jelajahi katalog dan pilih produk bonsai berdasarkan kategori,
                harga, deskripsi, dan ketersediaannya.
              </p>
            </article>

            {/* Langkah kedua. */}
            <article className="rounded-3xl border border-border bg-cream p-7">
              {/* Nomor langkah. */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
                {/* Nomor dua. */}
                2
              </div>

              {/* Judul langkah kedua. */}
              <h3 className="mt-6 text-xl font-semibold text-primary">
                Hubungi Penjual
              </h3>

              {/* Deskripsi langkah kedua. */}
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Setelah menemukan bonsai yang diminati, lanjutkan komunikasi
                dengan Mas Fajar melalui WhatsApp.
              </p>
            </article>

            {/* Langkah ketiga. */}
            <article className="rounded-3xl border border-border bg-cream p-7">
              {/* Nomor langkah. */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
                {/* Nomor tiga. */}
                3
              </div>

              {/* Judul langkah ketiga. */}
              <h3 className="mt-6 text-xl font-semibold text-primary">
                Negosiasi & Kesepakatan
              </h3>

              {/* Deskripsi langkah ketiga. */}
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Diskusikan kondisi produk dan harga secara langsung hingga
                tercapai kesepakatan antara pelanggan dan penjual.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Section informasi pengiriman. */}
      <section className="bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        {/* Container pengiriman. */}
        <div className="mx-auto max-w-5xl">
          {/* Card pengiriman. */}
          <div className="rounded-3xl border border-border bg-white p-7 sm:p-10">
            {/* Label section. */}
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
              Informasi Pengiriman
            </p>

            {/* Heading pengiriman. */}
            <h2 className="mt-3 text-2xl font-semibold text-dark sm:text-3xl">
              Pengiriman Produk
            </h2>

            {/* Deskripsi pengiriman berdasarkan proposal. */}
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Pengiriman dilakukan secara manual oleh Bonsai Gerung menggunakan
              jasa ekspedisi J&T Cargo. Biaya pengiriman ditanggung oleh
              pelanggan.
            </p>

            {/* Catatan mengenai proses pengiriman. */}
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Detail pengiriman dapat dibicarakan langsung setelah produk dan
              harga disepakati.
            </p>
          </div>
        </div>
      </section>

      {/* Section CTA terakhir. */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        {/* Container CTA. */}
        <div className="mx-auto max-w-5xl">
          {/* Card CTA menggunakan warna primary. */}
          <div className="overflow-hidden rounded-3xl bg-primary px-7 py-12 text-center shadow-xl shadow-primary/10 sm:px-12 sm:py-14">
            {/* Judul CTA. */}
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Sudah Menemukan Bonsai yang Anda Suka?
            </h2>

            {/* Deskripsi CTA. */}
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Hubungi Bonsai Gerung melalui WhatsApp untuk mendapatkan informasi
              lebih lanjut dan melanjutkan pembicaraan mengenai produk.
            </p>

            {/* Tombol CTA WhatsApp. */}
            <a
              // Menggunakan URL WhatsApp.
              href={whatsappUrl}
              // Membuka WhatsApp di tab baru.
              target="_blank"
              // Mengamankan tab baru.
              rel="noopener noreferrer"
              // Styling tombol CTA.
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              {/* Icon WhatsApp. */}
              <MessageCircle size={19} />

              {/* Teks tombol. */}
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}