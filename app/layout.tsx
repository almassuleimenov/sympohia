import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import SmoothScroll from "@/components/SmoothScroll";

// 1. Основной шрифт (Gilroy) - Пути обновлены под твои файлы с суффиксом _0
const gilroy = localFont({
  src: [
    { path: "./fonts/Gilroy-Regular_0.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Gilroy-Medium_0.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Gilroy-Bold_0.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

// 2. Акцентный заголовочный шрифт (Literature Decor) - Имя совпадает
const literature = localFont({
  src: "./fonts/Literature-Decor.ttf",
  variable: "--font-literature",
  display: "swap",
});

// 3. Декоративный рукописный шрифт (Annabelle) - Путь обновлен под префикс ofont.ru_
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
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}