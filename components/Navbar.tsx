"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Query from "./query";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQueryCornerActive, setIsQueryCornerActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
    
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsQueryCornerActive(true);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled && !isMenuOpen ? "pt-4 px-4 md:px-8" : "pt-0 px-0"
        }`}
      >
        <nav
          className={`mx-auto w-full transition-all duration-500 ease-in-out flex justify-between items-center ${
            isMenuOpen
              ? "bg-baseWhite text-navy py-4 px-6 md:px-12 rounded-none"
              : isScrolled
              ? "max-w-6xl bg-baseWhite/75 backdrop-blur-xl text-navy py-3 px-6 md:px-10 rounded-full shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-white/30"
              : "max-w-full bg-transparent text-baseWhite py-6 px-6 md:px-12 rounded-b-3xl"
          }`}
        >
          {/* ЛОГОТИП: Жесткая привязка кастомного шрифта через переменную */}
          <Link
            href="/"
            style={{ fontFamily: "var(--font-literature), serif" }}
            className="text-2xl md:text-3xl tracking-widest uppercase relative z-50 font-normal"
          >
            СИМФОНИЯ
          </Link>

          {/* МЕНЮ: Использует стандартный Montserrat из layout */}
          <div className="hidden md:flex space-x-10 text-sm font-sans font-medium tracking-wide uppercase">
            <a 
              href="#about" 
              onClick={(e) => handleSmoothScroll(e, "#about")}
              className="hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              Проект
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => handleSmoothScroll(e, "#gallery")}
              className="hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              Галерея
            </a>
            <a 
              href="#layouts" 
              onClick={(e) => handleSmoothScroll(e, "#layouts")}
              className="hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              Планировки
            </a>
            <a 
              href="#location" 
              onClick={(e) => handleSmoothScroll(e, "#location")}
              className="hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              Расположение
            </a>
          </div>

          {/* КНОПКА: Плавная заливка цветом (без теней) */}
          <button
            onClick={handleContactClick}
            className={`hidden md:block px-7 py-2.5 font-sans border transition-colors duration-300 ease-out text-xs font-semibold tracking-wider uppercase ${
              isScrolled
                ? "border-navy text-navy hover:bg-navy hover:text-baseWhite rounded-full"
                : "border-baseWhite text-baseWhite hover:bg-baseWhite hover:text-navy rounded-full"
            }`}
          >
            Связаться с нами
          </button>

          {/* Бургер-меню для мобилок */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[2px] bg-current block transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`}></span>
            <span className={`w-6 h-[2px] bg-current block transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-6 h-[2px] bg-current block transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}></span>
          </button>
        </nav>
      </header>

      {/* Мобильное меню */}
      <div
        className={`fixed inset-0 bg-baseWhite z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center space-y-6 text-navy text-xl font-sans tracking-widest uppercase">
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")} className="hover:text-gold transition-colors cursor-pointer">Проект</a>
          <a href="#gallery" onClick={(e) => handleSmoothScroll(e, "#gallery")} className="hover:text-gold transition-colors cursor-pointer">Галерея</a>
          <a href="#layouts" onClick={(e) => handleSmoothScroll(e, "#layouts")} className="hover:text-gold transition-colors cursor-pointer">Планировки</a>
          <a href="#location" onClick={(e) => handleSmoothScroll(e, "#location")} className="hover:text-gold transition-colors cursor-pointer">Расположение</a>
        </div>

        <div className="mt-16 text-center text-navy/70 font-sans">
          <button 
            onClick={handleContactClick}
            className="px-8 py-3 mb-6 border border-navy text-navy uppercase tracking-widest text-sm hover:bg-navy hover:text-baseWhite transition-colors duration-300 ease-out rounded-full"
          >
            Оставить заявку
          </button>
          <p className="text-sm uppercase tracking-widest mb-2">Офис продаж</p>
          <a href="tel:+79991234567" className="text-xl font-semibold hover:text-gold transition-colors text-navy">+7 (999) 123-45-67</a>
        </div>
      </div>

      <Query 
        isActive={isQueryCornerActive} 
        onClose={() => setIsQueryCornerActive(false)} 
      />
    </>
  );
}