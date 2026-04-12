"use client"; // Важно: добавляем "use client", так как теперь используем обработчики событий

import Link from "next/link";
import React from "react";

export default function Footer() {
  // Функция для плавного скролла к якорю
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // -100 пикселей, чтобы шапка не перекрывала заголовок блока
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-navy text-baseWhite pt-12 md:pt-20 pb-8 md:pb-10 border-t border-gold/20 relative overflow-hidden">
      
      {/* Мягкое золотое свечение в углу для создания объема */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Колонка 1: Бренд */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="group inline-flex flex-col items-start mb-6">
              <span style={{ fontFamily: "var(--font-literature)" }} className="text-4xl md:text-5xl uppercase tracking-widest text-baseWhite group-hover:text-gold transition-colors duration-300">
                Симфония
              </span>
              <span style={{ fontFamily: "var(--font-annabelle)" }} className="text-3xl text-gold -mt-3 ml-8">
                residence
              </span>
            </Link>
            <p className="font-sans text-base text-baseWhite/70 leading-relaxed max-w-sm">
              Премиальный жилой комплекс. <br />
              Пространство, где хочется жить.
            </p>
          </div>

          {/* Колонка 2: Навигация (Добавлен onClick={handleSmoothScroll} для плавности) */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6">Навигация</h4>
            <ul className="space-y-4 text-sm text-baseWhite/80">
              <li><a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")} className="hover:text-gold transition-colors cursor-pointer">О проекте</a></li>
              <li><a href="#advantages" onClick={(e) => handleSmoothScroll(e, "#advantages")} className="hover:text-gold transition-colors cursor-pointer">Преимущества</a></li>
              <li><a href="#gallery" onClick={(e) => handleSmoothScroll(e, "#gallery")} className="hover:text-gold transition-colors cursor-pointer">Галерея</a></li>
              <li><a href="#layouts" onClick={(e) => handleSmoothScroll(e, "#layouts")} className="hover:text-gold transition-colors cursor-pointer">Планировки</a></li>
              <li><a href="#location" onClick={(e) => handleSmoothScroll(e, "#location")} className="hover:text-gold transition-colors cursor-pointer">Расположение</a></li>
            </ul>
          </div>

          {/* Колонка 3: Офис продаж */}
          <div className="md:col-span-5 lg:col-span-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6">Офис продаж</h4>
            <ul className="space-y-4 text-sm text-baseWhite/80">
              <li>ул. Фрунзе, 39</li>
              <li>Ежедневно с 09:00 до 20:00</li>
              <li className="pt-2">
                <a href="tel:+74950559625" style={{ fontFamily: "var(--font-literature)" }} className="text-2xl tracking-widest text-baseWhite hover:text-gold transition-colors">
                  +7 (495) 055-96-25
                </a>
              </li>
              <li>
                <a href="https://symphony.ru" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors font-medium">
                  symphony.ru
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Документация */}
          <div className="md:col-span-12 lg:col-span-2 mt-8 md:mt-0">
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6">Информация</h4>
            <ul className="space-y-4 text-sm text-baseWhite/80 flex flex-col">
              <li>
                <a href="#" className="hover:text-gold transition-colors underline underline-offset-4 decoration-baseWhite/20 hover:decoration-gold inline-block">
                  Проектная декларация
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors underline underline-offset-4 decoration-baseWhite/20 hover:decoration-gold inline-block">
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Копирайт */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-baseWhite/10 pt-8 text-xs text-baseWhite/40 font-sans tracking-wide">
          <p>© {new Date().getFullYear()} ЖК «Симфония». Все права защищены.</p>
          <p className="mt-2 md:mt-0">Не является публичной офертой.</p>
        </div>

      </div>
    </footer>
  );
}