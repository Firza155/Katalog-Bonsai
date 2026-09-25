export const contactData = {
  businessName: "Bonsai Gerung",
  location: "Dusun Gerung, Desa Pehserut, Kecamatan Sukomoro, Kabupaten Nganjuk",

  // Menyimpan nomor WhatsApp usaha.
  whatsappNumber: "6281249809744",

  // Menyimpan pesan WhatsApp default.
  // Pesan ini digunakan ketika user menghubungi dari halaman Kontak.
  defaultWhatsappMessage:
    "Halo Bonsai Gerung, saya ingin mendapatkan informasi mengenai koleksi bonsai yang tersedia.",

  // Membuat fungsi untuk menghasilkan URL WhatsApp.
  getWhatsappUrl: (message?: string) => {
    // Menggunakan pesan khusus jika dikirim oleh component.
    // Jika tidak ada pesan khusus, gunakan pesan default.
    const finalMessage =
      message ?? contactData.defaultWhatsappMessage;

    // Mengubah pesan agar aman digunakan di dalam URL.
    const encodedMessage = encodeURIComponent(finalMessage);

    // Menghasilkan URL WhatsApp dengan pesan otomatis.
    return `https://wa.me/${contactData.whatsappNumber}?text=${encodedMessage}`;
  },

   // Menyimpan alamat yang akan dicari oleh Google Maps.
  googleMapsUrl:
    "https://maps.app.goo.gl/G1EHyfZFsinMhPR19?g_st=iw",
};