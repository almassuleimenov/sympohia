'use client';

import React, { useEffect, useState, useRef } from 'react';

// --- Types ---
interface StatItem {
  id: string;
  value: number;
  label: string;
  subLabel?: string;
  suffix?: string;
  position: 'vertical' | 'horizontal';
  decimals?: number;
}

// --- Data ---
const STATS: StatItem[] = [
  { id: 'floors', value: 16, label: 'этажей', position: 'vertical' },
  { id: 'apartments', value: 192, label: 'квартиры', position: 'vertical' },
  { id: 'parking', value: 110, label: 'мест', subLabel: 'в подземном паркинге', position: 'vertical' },
  { id: 'territory', value: 1.6, label: 'га', subLabel: 'благоустроенной территории', position: 'horizontal', decimals: 1 },
  { id: 'distance', value: 32, label: 'м', subLabel: 'расстояние между домами', position: 'horizontal' },
];

// --- Custom Hook для плавной анимации ---
const useCountUp = (endValue: number, durationMs: number = 2000) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / durationMs, 1);
            
            const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            setCount(easeOutProgress * endValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [endValue, durationMs]);

  return { count, elementRef };
};

// --- Sub-Component: Stat Item ---
const StatDisplay: React.FC<{ item: StatItem }> = ({ item }) => {
  const { count, elementRef } = useCountUp(item.value, 2000);

  const displayValue = item.decimals !== undefined
    ? count.toFixed(item.decimals).replace('.', ',')
    : Math.floor(count).toString();

  return (
    <div ref={elementRef} className="flex flex-col relative group">
      {/* Декоративная засечка стала золотой (gold) */}
      <div className={`hidden md:block absolute bg-gold 
        ${item.position === 'vertical' ? 'w-4 h-[2px] -left-[18px] top-4' : 'h-4 w-[2px] -bottom-[18px] left-4'}
      `} />
      
      <div className="flex items-baseline gap-1">
        <span className="text-4xl md:text-5xl font-serif text-navy font-medium tracking-tight">
          {displayValue}
        </span>
        {item.suffix && (
          <span className="text-xl md:text-2xl text-gold">{item.suffix}</span>
        )}
        <span className="text-lg md:text-xl text-navy font-medium ml-2">
          {item.label}
        </span>
      </div>
      {item.subLabel && (
        <span className="text-sm md:text-base text-navy/70 mt-1 max-w-[150px] leading-snug">
          {item.subLabel}
        </span>
      )}
    </div>
  );
};

// --- Main Component ---
export default function AboutSection() {
  const verticalStats = STATS.filter((s) => s.position === 'vertical');
  const horizontalStats = STATS.filter((s) => s.position === 'horizontal');

  return (
    // Фон секции делаем теплым белым (baseWhite) для контраста с шапкой
    <section 
      id="about" 
      className="w-full bg-baseWhite py-16 md:py-32 px-4 md:px-12 overflow-hidden relative z-20 -mt-12 md:-mt-20 rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
        
        {/* Левая часть: Инфографика (Ось L-формы на десктопе) */}
        <div className="md:col-span-7 relative">
          {/* L-образная золотая линия (видна только на md и выше) */}
          <div className="hidden md:block absolute left-0 top-0 bottom-10 w-[2px] bg-gold" />
          <div className="hidden md:block absolute left-0 bottom-10 h-[2px] w-full max-w-[500px] bg-gold" />

          <div className="pl-0 md:pl-8 flex flex-col justify-between h-full min-h-[400px]">
            {/* Вертикальные элементы */}
            <div className="flex flex-col gap-10 md:gap-16 mb-10 md:mb-0">
              {verticalStats.map((stat) => (
                <StatDisplay key={stat.id} item={stat} />
              ))}
            </div>

            {/* Горизонтальные элементы */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-24 md:pl-20 md:pb-16 pt-10 md:pt-0">
              {horizontalStats.map((stat) => (
                <StatDisplay key={stat.id} item={stat} />
              ))}
            </div>
          </div>
        </div>

        {/* Правая часть: Текстовый блок */}
        <div className="md:col-span-5 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-serif text-navy uppercase mb-0 tracking-wide">
              Симфония
            </h2>
            {/* Вот тут мы применяем наш красивый рукописный шрифт Annabelle */}
            <p 
              style={{ fontFamily: 'var(--font-annabelle)' }} 
              className="text-4xl md:text-5xl text-gold -mt-2 ml-4"
            >
              residence
            </p>
          </div>

          <p className="text-xl md:text-2xl font-medium text-navy mb-8 leading-relaxed max-w-md">
            Пространство, где хочется жить.
          </p>

          <p className="text-base text-navy/80 leading-relaxed max-w-md mb-4">
            ЖК «Симфония» — это современное пространство для жизни, где архитектура, комфорт и окружение создают гармоничную среду.
          </p>
          
          <p className="text-base text-navy/80 leading-relaxed max-w-md">
            Продуманная архитектура и благоустроенная территория формируют ощущение уюта и приватности.
          </p>
        </div>

      </div>
    </section>
  );
}