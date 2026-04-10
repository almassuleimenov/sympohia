import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import SmoothScroll from "@/components/SmoothScroll";
import Noise from "@/components/Noise";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

// 1. Основной шрифт (Gilroy)
const gilroy = localFont({
  src: [
    { path: "./fonts/Gilroy-Regular_0.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Gilroy-Medium_0.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Gilroy-Bold_0.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

// 2. Акцентный заголовочный шрифт (Literature Decor)
const literature = localFont({
  src: "./fonts/Literature-Decor.ttf",
  variable: "--font-literature",
  display: "swap",
});

// 3. Декоративный рукописный шрифт (Annabelle)
const annabelle = localFont({
  src: "./fonts/ofont.ru_Annabelle.ttf", 
  variable: "--font-annabelle",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЖК Симфония | Элитные резиденции",
  description: "Премиальный жилой комплекс с уникальной архитектурой.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${gilroy.variable} ${literature.variable} ${annabelle.variable} font-sans min-h-screen relative`}
      >
        {/* ПРЕЛОАДЕР */}
        <Preloader />
        {/* Добавляем наши новые фишки */}
        <Noise />
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}