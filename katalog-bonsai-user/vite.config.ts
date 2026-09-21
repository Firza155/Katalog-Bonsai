import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";

// Mengekspor konfigurasi Vite.
export default defineConfig({
  // Mendaftarkan semua plugin yang digunakan project.
  plugins: [
    // Mengaktifkan dukungan React + TypeScript/JSX.
    react(),

    // Mengaktifkan Tailwind CSS v4.
    tailwindcss(),
  ],
});
