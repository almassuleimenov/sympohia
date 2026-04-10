"use client";

import React from 'react';
import Image from 'next/image';

const Masterplan: React.FC = () => {
  return (
    <section id="masterplan" className="w-full py-24 md:py-32 bg-baseWhite relative overflow-hidden">
      
      {/* Шапка блока (остается в контейнере для выравнивания с остальным сайтом) */}
      <div className="container mx-auto px-6 md:px-12 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          {/* Декоративная линия и рукописный текст */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-gold"></div>
            <p 
              style={{ fontFamily: "var(--font-annabelle)" }}
              className="text-gold text-3xl md:text-4xl drop-shadow-sm"
            >
              masterplan
            </p>
          </div>
          
          <h2 
            style={{ fontFamily: "var(--font-literature)" }}
            className="text-navy text-5xl md:text-6xl uppercase tracking-widest leading-tight"
          >
            Генеральный <br /> план
          </h2>
        </div>

        {/* Описание генплана (текст из брошюры) */}
        <div className="max-w-md border-l border-gold/30 pl-6">
          <p className="font-sans text-navy/80 text-sm md:text-base leading-relaxed">
            Продуманная архитектура и благоустроенная территория формируют ощущение уюта и приватности. Расположение объектов создано для вашего идеального комфорта.
          </p>
        </div>
      </div>

      {/* САМ ГЕНПЛАН (Full-bleed / От края до края)
        Никаких контейнеров, никаких скруглений. Только строгие линии (border-y).
      */}
      <div className="relative w-full border-y border-navy/10 bg-white group">
        <Image
          src="/assets/Masterplan.jpeg"
          alt="Генеральный план ЖК Симфония"
          width={1920}
          height={1080}
          // h-auto позволяет картинке сохранить свои естественные пропорции, 
          // а w-full растягивает её на весь экран
          className="w-full h-auto object-cover grayscale-[10%] transition-all duration-1000 group-hover:grayscale-0"
          quality={100}
          draggable={false}
        />
        
        {/* Еле заметная внутренняя тень для объема */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.03)]"></div>
      </div>

      {/* Архитектурная сноска внизу */}
      <div className="container mx-auto px-6 md:px-12 mt-6 flex justify-between items-center opacity-50">
         <span className="w-10 h-[1px] bg-navy"></span>
         <p className="text-[10px] uppercase tracking-[0.2em] text-navy font-bold">
           Схема расположения объектов
         </p>
      </div>

    </section>
  );
};

export default Masterplan;