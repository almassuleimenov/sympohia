import Hero from "@/components/Hero";
import Location from "@/components/Location"; // Добавили импорт
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Masterplan from "@/components/Masterplan";
import AboutSection from "@/components/AboutSection";
import Gallery from "@/components/Gallery";
import TelegramButton from "@/components/TelegramButton";
import Layouts from "@/components/Layouts";

export default function Home() {
  return (
    <main className="relative flex flex-col">
      <Hero />
      <AboutSection />
      
      <Gallery />
      <Layouts />
      {/* Вставляем карту перед финальным призывом к действию */}
      <Location />
      
      <Masterplan />
      <Cta />
      <Footer />

      
      <WhatsAppButton />
      <TelegramButton />
    </main>
  );
}