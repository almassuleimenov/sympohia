"use client";

import { useState } from "react";
import Image from "next/image";

// Данные планировок (заменишь картинки на реальные чертежи)
const layoutsData = [
  { 
    id: '1k', 
    name: '1-комнатная', 
    area: '48.5', 
    rooms: 1,
    features: ['Кухня-гостиная', 'Просторная гардеробная', 'Панорамная лоджия'], 
    image: '/assets/TW_Corona003.jpg' // ЗАГЛУШКА: Замени на реальный чертеж (например, /assets/plan-1.png)
  },
  { 
    id: '2k', 
    name: '2-комнатная', 
    area: '74.2', 
    rooms: 2,
    features: ['Мастер-спальня', 'Два санузла', 'Угловое остекление'], 
    image: '/assets/TW_Corona006.jpg' 
  },
  { 
    id: '3k', 
    name: '3-комнатная', 
    area: '112.8', 
    rooms: 3,
    features: ['Кабинет', 'Вид на воду', 'Постирочная комната'], 
    image: '/assets/TW_Corona007.jpg' 
  },
  { 
    id: 'ph', 
    name: 'Пентхаус', 
    area: '185.0', 
    rooms: 4,
    features: ['Собственная терраса', 'Потолки 4.5м', 'Панорамный вид 360°'], 
    image: '/assets/TW_Corona009.jpg' 
  }
];

export default function Layouts() {
  const [activeTab, setActiveTab] = useState(layoutsData[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Плавное переключение с анимацией fade
  const handleTabChange = (layout: typeof layoutsData[0]) => {
    if (layout.id === activeTab.id) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(layout);
      setIsAnimating(false);
    }, 300); // 300ms на затухание
  };

  return (
    <section id="layouts" className="py-24 md:py-32 bg-baseWhite text-navy overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Заголовок блока */}
        <div className="mb-16 md:flex md:justify-between md:items-end">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-[1px] bg-gold"></div>
              <p style={{ fontFamily: "var(--font-annabelle)" }} className="text-gold text-3xl md:text-4xl drop-shadow-sm">
                layouts
              </p>
            </div>
            <h2 style={{ fontFamily: "var(--font-literature)" }} className="text-4xl md:text-5xl uppercase tracking-widest leading-tight">
              Выбор <br /> пространства
            </h2>
          </div>
          
          <p className="max-w-sm mt-6 md:mt-0 font-sans text-sm md:text-base text-navy/70 leading-relaxed border-l border-gold/30 pl-4">
            Продуманная эргономика, максимум естественного света и правильная геометрия комнат для вашей комфортной жизни.
          </p>
        </div>

        {/* Навигация по табам */}
        <div className="flex overflow-x-auto hide-scrollbar gap-8 md:gap-12 border-b border-navy/10 mb-12 pb-4">
          {layoutsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab)}
              className={`relative pb-4 text-xs md:text-sm font-semibold tracking-widest uppercase whitespace-nowrap transition-colors duration-300 ${
                activeTab.id === tab.id ? "text-navy" : "text-navy/40 hover:text-gold"
              }`}
            >
              {tab.name}
              {/* Подчеркивание активного таба */}
              {activeTab.id === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold"></div>
              )}
            </button>
          ))}
        </div>

        {/* Основной контент выбранной планировки */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 transition-opacity duration-300 ease-in-out ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}>
          
          {/* Левая часть: Характеристики */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            
            <div className="mb-10">
              <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
                Площадь
              </span>
              <div className="flex items-baseline gap-2">
                <span style={{ fontFamily: "var(--font-literature)" }} className="text-6xl md:text-7xl text-navy">
                  {activeTab.area}
                </span>
                <span className="text-xl md:text-2xl text-navy/60 font-medium">м²</span>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <div>
                <span className="text-navy/50 text-[10px] font-bold tracking-[0.2em] uppercase block mb-1">
                  Количество комнат
                </span>
                <span className="text-navy font-medium text-lg">{activeTab.rooms}</span>
              </div>
              
              <div className="w-full h-[1px] bg-navy/10"></div>
              
              <div>
                <span className="text-navy/50 text-[10px] font-bold tracking-[0.2em] uppercase block mb-3">
                  Особенности
                </span>
                <ul className="space-y-3">
                  {activeTab.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-navy/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Кнопка запроса цены */}
            <button className="group relative w-full sm:w-auto px-8 py-4 border border-navy text-navy text-xs font-semibold tracking-widest uppercase hover:text-baseWhite transition-all duration-500 overflow-hidden rounded-full">
              <span className="relative z-10">Узнать стоимость</span>
              <div className="absolute inset-0 h-full w-0 bg-navy transition-all duration-500 ease-out group-hover:w-full z-0"></div>
            </button>

          </div>

          {/* Правая часть: Чертеж (Изображение) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-16 flex items-center justify-center relative group shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-navy/5 min-h-[400px]">
            
            {/* Архитектурный крестик (декор) */}
            <div className="absolute top-8 right-8 text-navy/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </div>

            <div className="relative w-full h-[300px] md:h-[500px]">
              <Image
                src={activeTab.image}
                alt={`Планировка ${activeTab.name}`}
                fill
                quality={100}
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}