"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [stage, setStage] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Блокируем скролл на время работы прелоадера
    document.body.style.overflow = "hidden";

    // Фаза 1: Вырастает элегантная золотая линия
    const t1 = setTimeout(() => setStage(1), 200);
    
    // Фаза 2: Выезжает главное название
    const t2 = setTimeout(() => setStage(2), 900);
    
    // Фаза 3: Проявляется декоративная приписка с легким блюром
    const t3 = setTimeout(() => setStage(3), 1600);
    
    // Фаза 4: Экран плавно уезжает вверх (эффект занавеса)
    const t4 = setTimeout(() => setStage(4), 2800);
    
    // Фаза 5: Разблокируем скролл и полностью удаляем компонент из DOM
    const t5 = setTimeout(() => {
      setIsMounted(false);
      document.body.style.overflow = "unset";
    }, 4000); // Даем 1.2 секунды на завершение анимации "занавеса"

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      // Используем кастомный cubic-bezier для дорогого, кинематографичного движения вверх
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-navy text-baseWhite transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        stage === 4 ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center">
        
        {/* Анимация линии: меняем высоту от 0 до h-24 */}
        <div 
          className={`w-[1px] bg-gold mb-8 transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            stage >= 1 ? "h-24 opacity-100" : "h-0 opacity-0"
          }`}
        />

        {/* Маска для заголовка: overflow-hidden скрывает текст, пока он находится внизу */}
        <div className="overflow-hidden pb-2">
          <h1 
            style={{ fontFamily: "var(--font-literature)" }} 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.2em] uppercase text-baseWhite drop-shadow-md transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            Симфония
          </h1>
        </div>
        
        {/* Анимация рукописного текста: из размытия в четкость */}
        <p 
          style={{ fontFamily: "var(--font-annabelle)" }}
          className={`text-2xl sm:text-3xl md:text-4xl text-gold mt-2 ml-16 sm:ml-20 md:ml-24 lg:ml-32 transition-all duration-1000 ease-out ${
            stage >= 3 ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-sm translate-y-4"
          }`}
        >
          residence
        </p>

      </div>
    </div>
  );
}