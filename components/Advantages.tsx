"use client";

import React, { useEffect, useRef, useState } from "react";

// Выносим данные в отдельный массив для удобного масштабирования
const advantagesData = [
  {
    id: "01",
    title: "Авторская архитектура",
    description: "Строгая геометрия фасадов, премиальные материалы отделки и панорамное остекление, создающие неповторимый облик здания.",
  },
  {
    id: "02",
    title: "Приватный двор-парк",
    description: "Закрытая охраняемая территория без машин. Ландшафтный дизайн, зоны для тихого отдыха и современные игровые пространства.",
  },
  {
    id: "03",
    title: "Консьерж-сервис 24/7",
    description: "Лобби премиум-класса с высококлассным сервисом. Решение бытовых вопросов, встреча гостей и прием курьеров в любое время.",
  },
  {
    id: "04",
    title: "Умные планировки",
    description: "Эргономичные пространства, спроектированные с учетом сценариев жизни. Высокие потолки, мастер-спальни и просторные гардеробные.",
  }
];

export default function Advantages() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.15 } // Триггер сработает, когда 15% секции появится на экране
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="advantages" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-baseWhite text-navy overflow-hidden relative"
    >
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Шапка блока */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div 
            className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-[1px] bg-gold"></div>
              <p 
                style={{ fontFamily: "var(--font-annabelle)" }} 
                className="text-gold text-3xl md:text-4xl uppercase tracking-wider"
              >
                privilege
              </p>
            </div>
            <h2 
              style={{ fontFamily: "var(--font-literature)" }} 
              className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest leading-tight"
            >
              Философия <br /> комфорта
            </h2>
          </div>
          
          <div 
            className={`max-w-md border-l border-navy/20 pl-6 transition-all duration-1000 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <p className="font-sans text-sm md:text-base text-navy/70 leading-relaxed">
              Мы продумали каждую деталь, чтобы создать идеальное пространство для жизни. Симфония объединяет эстетику, современные технологии и безупречный сервис.
            </p>
          </div>
        </div>

        {/* Сетка преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-6">
          {advantagesData.map((item, index) => (
            <div 
              key={item.id}
              // Каскадная анимация: каждая следующая карточка задерживается на 150ms
              className={`group flex flex-col relative pt-8 border-t border-navy/10 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: isVisible ? `${400 + index * 150}ms` : "0ms" }}
            >
              {/* Анимированная линия при наведении */}
              <div className="absolute top-[-1px] left-0 h-[2px] w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full"></div>
              
              {/* Крупный типографический номер */}
              <span 
                style={{ fontFamily: "var(--font-literature)" }} 
                className="text-6xl md:text-7xl text-gold/30 mb-6 transition-colors duration-500 group-hover:text-gold"
              >
                {item.id}
              </span>
              
              <h3 className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-navy group-hover:text-navy transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm md:text-base text-navy/70 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}