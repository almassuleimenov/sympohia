"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Query from "./query";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Новое состояние для активации анимации "уголка"
  const [isQueryCornerActive, setIsQueryCornerActive] = useState(false);

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
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
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Обработчик клика по кнопке связи
  const handleContactClick = () => {
    setIsQueryCornerActive(true);
    // Если кликнули в мобильном меню, закрываем само меню, чтобы показать уголок
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
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
              ? "bg-offWhite text-graphite py-4 px-6 md:px-12 rounded-none"
              : isScrolled
              ? "max-w-6xl bg-offWhite/65 backdrop-blur-xl text-graphite py-3 px-6 md:px-10 rounded-full shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-white/30"
              : "max-w-full bg-transparent text-offWhite py-6 px-6 md:px-12 rounded-b-3xl"
          }`}
        >
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl tracking-widest uppercase relative z-50"
          >
            Симфония
          </Link>

          <div className="hidden md:flex space-x-10 text-sm font-medium tracking-wide uppercase">
            <a 
              href="#about" 
              onClick={(e) => handleSmoothScroll(e, "#about")}
              className="hover:text-sageGreen transition-colors duration-300 cursor-pointer"
            >
              Проект
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => handleSmoothScroll(e, "#gallery")}
              className="hover:text-sageGreen transition-colors duration-300 cursor-pointer"
            >
              Галерея
            </a>
            <a 
              href="#layouts" 
              onClick={(e) => handleSmoothScroll(e, "#layouts")}
              className="hover:text-sageGreen transition-colors duration-300 cursor-pointer"
            >
              Планировки
            </a>
            <a 
              href="#location" 
              onClick={(e) => handleSmoothScroll(e, "#location")}
              className="hover:text-sageGreen transition-colors duration-300 cursor-pointer"
            >
              Расположение
            </a>
          </div>

          <button
            onClick={handleContactClick}
            className={`hidden md:block px-7 py-2.5 border transition-all duration-300 text-xs font-semibold tracking-wider uppercase ${
              isScrolled
                ? "border-graphite/40 text-graphite hover:bg-graphite hover:text-offWhite hover:border-graphite rounded-full"
                : "border-offWhite hover:bg-graphite/15 hover:backdrop-blur-sm hover:text-offWhite rounded-xl"
            }`}
          >
            Связаться с нами
          </button>

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

      <div
        className={`fixed inset-0 bg-offWhite z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center space-y-8 text-graphite text-2xl font-serif tracking-widest uppercase">
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")} className="hover:text-sageGreen transition-colors cursor-pointer">Проект</a>
          <a href="#gallery" onClick={(e) => handleSmoothScroll(e, "#gallery")} className="hover:text-sageGreen transition-colors cursor-pointer">Галерея</a>
          <a href="#layouts" onClick={(e) => handleSmoothScroll(e, "#layouts")} className="hover:text-sageGreen transition-colors cursor-pointer">Планировки</a>
          <a href="#location" onClick={(e) => handleSmoothScroll(e, "#location")} className="hover:text-sageGreen transition-colors cursor-pointer">Расположение</a>
        </div>

        <div className="mt-16 text-center text-graphite/70 font-sans">
          <button 
            onClick={handleContactClick}
            className="px-8 py-3 mb-6 bg-graphite text-offWhite uppercase tracking-widest text-sm hover:bg-sageGreen transition-colors"
          >
            Оставить заявку
          </button>
          <p className="text-sm uppercase tracking-widest mb-2">Офис продаж</p>
          <a href="tel:+79991234567" className="text-xl font-semibold">+7 (999) 123-45-67</a>
        </div>
      </div>

      <Query 
        isActive={isQueryCornerActive} 
        onClose={() => setIsQueryCornerActive(false)} 
      />
    </>
  );
}