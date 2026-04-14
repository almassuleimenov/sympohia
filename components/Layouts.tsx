"use client";

import { useState } from "react";
import Image from "next/image";

// Реальные данные планировок из твоих чертежей
const layoutsData = [
  { 
    id: '1a', 
    name: '1-комн. (38.9 м²)', 
    area: '38.9', 
    rooms: 1,
    features: ['Кухня-гостиная 15.8 м²', 'Изолированная спальня', 'Уютная лоджия'], 
    image: '/assets/plans/1a.jpg' // Убедись, что переименовал файлы на английские буквы!
  },
  { 
    id: '1v', 
    name: '1-комн. (42.9 м²)', 
    area: '42.9', 
    rooms: 1,
    features: ['Просторная кухня-гостиная', 'Раздельная прихожая', 'Вместительный балкон'], 
    image: '/assets/plans/1v.jpg' 
  },
  { 
    id: '2a', 
    name: '2-комн. (62.5 м²)', 
    area: '62.5', 
    rooms: 2,
    features: ['Две спальни', 'Раздельный санузел', 'Зона для гардероба'], 
    image: '/assets/plans/2a.jpg' 
  },
  { 
    id: '2v', 
    name: '2-комн. (64.6 м²)', 
    area: '64.6', 
    rooms: 2,
    features: ['Кухня-гостиная 19.2 м²', 'Мастер-спальня', 'Два санузла'], 
    image: '/assets/plans/2v.jpg' 
  },
  { 
    id: '3a', 
    name: '3-комн. (84.2 м²)', 
    area: '84.2', 
    rooms: 3,
    features: ['Три спальни', 'Кухня-гостиная 21.4 м²', 'Два просторных санузла'], 
    image: '/assets/plans/3a.jpg' 
  },
  { 
    id: '3b', 
    name: '3-комн. (90.6 м²)', 
    area: '90.6', 
    rooms: 3,
    features: ['Мастер-спальня с санузлом', 'Две детские комнаты', 'Огромная лоджия'], 
    image: '/assets/plans/3b.jpg' 
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
                Layouts
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
        <div className="flex overflow-x-auto hide-scrollbar gap-6 md:gap-10 border-b border-navy/10 mb-12 pb-4">
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

            {/* Заменили h-[300px] на h-[400px] md:h-[600px], чтобы чертежи были крупными и читаемыми */}
            <div className="relative w-full h-[400px] md:h-[600px]">
              <Image
                src={activeTab.image}
                alt={`Планировка ${activeTab.name}`}
                fill
                quality={100}
                className="object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}