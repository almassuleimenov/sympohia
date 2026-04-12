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
      {/* Засечки. Теперь они работают везде, включая мобильные.
        Размеры засечек строго математически привязаны к padding родителя:
        Vertical: уходит влево (на мобилке на 24px/w-6, на десктопе на 48px/w-12)
        Horizontal: уходит вниз (на мобилке на 32px/h-8, на десктопе на 64px/h-16)
      */}
      <div 
        className={`absolute bg-gold transition-all duration-500
          ${item.position === 'vertical' 
            ? 'h-[1px] w-6 md:w-12 -left-6 md:-left-12 top-5 md:top-6' 
            : 'w-[1px] h-8 md:h-16 -bottom-8 md:-bottom-16 left-4 md:left-6'
          }
        `} 
      />
      
      <div className="flex items-baseline gap-1 relative z-10">
        <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-navy font-medium tracking-tight">
          {displayValue}
        </span>
        {item.suffix && (
          <span className="text-lg sm:text-xl md:text-2xl text-gold">{item.suffix}</span>
        )}
        <span className="text-sm sm:text-lg md:text-xl text-navy font-medium ml-1 md:ml-2">
          {item.label}
        </span>
      </div>
      {item.subLabel && (
        <span className="text-xs sm:text-sm md:text-base text-navy/70 mt-1 max-w-[120px] md:max-w-[150px] leading-snug">
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
    <section 
      id="about" 
      className="w-full bg-baseWhite py-16 md:py-32 px-4 md:px-12 overflow-hidden relative z-20 -mt-12 md:-mt-20 rounded-t-[1.5rem] sm:rounded-t-[2rem] md:rounded-t-[2.5rem] lg:rounded-t-[4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start lg:items-center">
        
        {/* Левая часть: Инфографика (Жесткая система координат) */}
        <div className="lg:col-span-7 relative w-full pt-4 pr-4">
          
          {/* Контейнер координатной плоскости */}
          {/* Отступы (pl-6/pb-8 на мобилке, pl-12/pb-16 на десктопе) резервируют место для засечек */}
          <div className="relative w-full pl-6 pb-8 md:pl-12 md:pb-16">
            
            {/* Ось Y (Вертикальная линия) - Отрисовывается всегда */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gold" />
            
            {/* Ось X (Горизонтальная линия) - Отрисовывается всегда */}
            <div className="absolute left-0 bottom-0 w-[90%] md:w-full h-[1px] bg-gold" />

            {/* Изящная декоративная кривая (SVG), имитирующая скриншот */}


            <div className="flex flex-col justify-between h-full relative z-10">
              
              {/* Вертикальные элементы */}
              <div className="flex flex-col gap-10 md:gap-16 mb-12 md:mb-20 pt-4">
                {verticalStats.map((stat) => (
                  <StatDisplay key={stat.id} item={stat} />
                ))}
              </div>

              {/* Горизонтальные элементы (располагаются в ряд, над осью X) */}
              <div className="flex flex-row gap-8 md:gap-24 pl-4 md:pl-10">
                {horizontalStats.map((stat) => (
                  <StatDisplay key={stat.id} item={stat} />
                ))}
              </div>
              
            </div>
          </div>
        </div>

        {/* Правая часть: Текстовый блок */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:pl-8">
          <div className="mb-6 md:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-navy uppercase mb-0 tracking-wide">
              Симфония
            </h2>
            <p 
              style={{ fontFamily: 'var(--font-annabelle, cursive)' }} 
              className="text-3xl sm:text-4xl md:text-5xl text-gold mt-1 md:mt-2 ml-2 md:ml-4 uppercase tracking-wider"
            >
              residence
            </p>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-navy mb-4 md:mb-8 leading-relaxed max-w-md">
            Пространство, где хочется жить
          </p>

          <p className="text-base md:text-lg text-navy/80 leading-relaxed max-w-md mb-3 md:mb-4">
            ЖК «Симфония» — это современное пространство для жизни, где архитектура, комфорт и окружение создают гармоничную среду.
          </p>
          
          <p className="text-base md:text-lg text-navy/80 leading-relaxed max-w-md">
            Продуманная архитектура и благоустроенная территория формируют ощущение уюта и приватности.
          </p>
        </div>

      </div>
    </section>
  );
}