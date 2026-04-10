"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        // 1. Линейная интерполяция: 0.07 дает идеальный баланс между отзывчивостью и плавностью
        lerp: 0.07, 
        
        // 2. "Вес" сайта. 0.9 делает скролл чуть более тугим и дорогим, убирая дешевую легкость
        wheelMultiplier: 0.9, 
        
        // 3. Кинематографичная функция затухания (Exponential ease-out)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        
        // 4. Плавность для мыши и тачпадов
        smoothWheel: true, 
        syncTouch: true,
        touchMultiplier: 2, // На мобилках оставляем скролл чуть быстрее, чтобы не раздражать
      }}
    >
      {/* @ts-expect-error: Конфликт типов старого Lenis и React 19 из-за bigint */}
      {children}
    </ReactLenis>
  );
}