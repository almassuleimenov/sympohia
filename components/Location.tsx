"use client";

import dynamic from "next/dynamic";

// Динамический импорт карты (Отключаем Server-Side Rendering специально для Leaflet)
const DynamicMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-pearl animate-pulse flex items-center justify-center text-graphite/50 font-sans tracking-widest uppercase text-sm">
      Загрузка карты...
    </div>
  ),
});

export default function Location() {
  return (
    <section id="location" className="py-24 bg-pearl text-graphite">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Заголовок секции */}
        <div className="mb-16 md:flex md:justify-between md:items-end">
          <div className="md:w-1/2">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              Идеальное <br /> расположение
            </h2>
            <p className="font-sans text-lg text-graphite/80 leading-relaxed">
              Комплекс интегрирован в богатую природную среду. Обширные водные глади и зеленые массивы создают приватный оазис всего в 15 минутах от делового центра.
            </p>
          </div>
          
          <div className="mt-8 md:mt-0 md:w-1/3 space-y-4 font-sans text-sm tracking-wide uppercase">
            <div className="flex justify-between border-b border-graphite/20 pb-2">
              <span className="text-graphite/60">Водоем / Парк</span>
              <span className="font-semibold">3 мин пешком</span>
            </div>
            <div className="flex justify-between border-b border-graphite/20 pb-2">
              <span className="text-graphite/60">Школа и Сад</span>
              <span className="font-semibold">5 мин пешком</span>
            </div>
            <div className="flex justify-between border-b border-graphite/20 pb-2">
              <span className="text-graphite/60">Центр города</span>
              <span className="font-semibold">15 мин на авто</span>
            </div>
          </div>
        </div>

        {/* Контейнер для карты */}
        <div className="w-full h-[400px] md:h-[600px] border border-graphite/10 shadow-xl overflow-hidden">
          <DynamicMap />
        </div>

      </div>
    </section>
  );
}