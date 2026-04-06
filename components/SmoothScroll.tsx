"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, // Возвращаем стандартную мягкость
        duration: 1.5, // Длительность инерции
        smoothWheel: true, 
        syncTouch: true 
      }}
    >
      {/* @ts-expect-error: Конфликт типов старого Lenis и React 19 из-за bigint */}
      {children}
    </ReactLenis>
  );
}