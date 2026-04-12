"use client";

import React from 'react';
import Image from 'next/image';

const Masterplan: React.FC = () => {
  return (
    // Убрали py-24 md:py-32, чтобы не было пустой дыры сверху
    <section id="masterplan" className="w-full bg-baseWhite relative overflow-hidden pb-6 md:pb-12">
      
      {/* САМ ГЕНПЛАН (Full-bleed / От края до края) */}
      <div className="relative w-full border-y border-navy/10 bg-white group">
        <Image
          src="/assets/Masterplan.jpeg"
          alt="Генеральный план ЖК Симфония"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover grayscale-[10%] transition-all duration-1000 group-hover:grayscale-0"
          quality={100}
          draggable={false}
        />
        
        {/* Еле заметная внутренняя тень для объема */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.03)]"></div>
      </div>

      {/* Архитектурная сноска внизу (оставил для премиального вида) */}
      <div className="container mx-auto px-6 md:px-12 mt-4 md:mt-6 flex justify-between items-center opacity-50">
         <span className="w-6 md:w-10 h-[1px] bg-navy"></span>
         <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-navy font-bold">
           Схема расположения объектов
         </p>
      </div>

    </section>
  );
};

export default Masterplan;