import HeroSection from "../../components/HeroSection";
import CategorySection from "../../components/CategorySection";
import FeaturedBonsai from "../../components/FeaturedBonsai";
import AboutSection from "../../components/AboutSection";

// Membuat halaman Beranda User.
export default function Home() {
  // Mengembalikan seluruh bagian halaman Beranda.
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedBonsai />
      <AboutSection />
    </>
  );
}