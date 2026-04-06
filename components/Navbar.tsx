"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Новое состояние для мобильного меню

  // Отслеживаем прокрутку для эффекта матового стекла
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Блокируем прокрутку страницы, когда открыто мобильное меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Главная панель навигации */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled || isMenuOpen
            ? "bg-offWhite/90 backdrop-blur-md py-4 shadow-sm text-graphite"
            : "bg-transparent py-6 text-offWhite" // Сделали текст белым на самом верху, чтобы читался на фоне неба
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          <Link href="/" className="font-serif text-2xl md:text-3xl tracking-widest uppercase relative z-50">
            Симфония
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex space-x-10 text-sm font-medium tracking-wide uppercase">
            <Link href="#about" className="hover:text-sageGreen transition-colors duration-300">О проекте</Link>
            <Link href="#gallery" className="hover:text-sageGreen transition-colors duration-300">Галерея</Link>
            <Link href="#layouts" className="hover:text-sageGreen transition-colors duration-300">Планировки</Link>
            <Link href="#location" className="hover:text-sageGreen transition-colors duration-300">Расположение</Link>
          </div>

          <button className="hidden md:block px-7 py-2.5 border border-current rounded-none hover:bg-graphite hover:text-offWhite transition-all duration-300 text-xs font-semibold tracking-wider uppercase">
            Связаться с нами
          </button>

          {/* Бургер-кнопка для мобильных */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[2px] bg-current block transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`}></span>
            <span className={`w-6 h-[2px] bg-current block transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-6 h-[2px] bg-current block transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}></span>
          </button>
        </div>
      </nav>

      {/* Полноэкранное мобильное меню (Overlay) */}
      <div 
        className={`fixed inset-0 bg-offWhite z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center space-y-8 text-graphite text-2xl font-serif tracking-widest uppercase">
          <Link href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-sageGreen transition-colors">О проекте</Link>
          <Link href="#gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-sageGreen transition-colors">Галерея</Link>
          <Link href="#layouts" onClick={() => setIsMenuOpen(false)} className="hover:text-sageGreen transition-colors">Планировки</Link>
          <Link href="#location" onClick={() => setIsMenuOpen(false)} className="hover:text-sageGreen transition-colors">Расположение</Link>
        </div>
        
        <div className="mt-16 text-center text-graphite/70 font-sans">
          <p className="text-sm uppercase tracking-widest mb-2">Офис продаж</p>
          <a href="tel:+79991234567" className="text-xl font-semibold">+7 (999) 123-45-67</a>
        </div>
      </div>
    </>
  );
}