import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import SmoothScroll from "@/components/SmoothScroll"; // 1. Импортируем нашу плавную обертку

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600"],
});

const literature = localFont({
  src: "./fonts/Literature-Decor.ttf",
  variable: "--font-literature",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЖК Симфония | Новый уровень жизни у воды",
  description: "Премиальный жилой комплекс с уникальной архитектурой и видом на озеро.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${montserrat.variable} ${literature.variable} font-sans min-h-screen relative`}
      >
        {/* 2. Оборачиваем навигацию и контент в SmoothScroll */}
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}