import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location"; // Добавили импорт
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="relative flex flex-col">
      <Hero />
      <About />
      <Gallery />
      
      {/* Вставляем карту перед финальным призывом к действию */}
      <Location />
      
      <Cta />
      <Footer />
      
      <WhatsAppButton />
    </main>
  );
}