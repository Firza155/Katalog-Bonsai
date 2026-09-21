import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; 
import App from "./App";

// Mencari elemen HTML dengan id "root".
const rootElement = document.getElementById("root");

// Memastikan elemen root memang ditemukan sebelum digunakan.
if (!rootElement) {
  // Menghentikan aplikasi jika elemen root tidak ditemukan.
  throw new Error("Root element tidak ditemukan");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
