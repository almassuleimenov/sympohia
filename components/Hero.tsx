"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      
      {/* Более элегантная анимация появления для премиум-сегмента */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          0% {
            transform: translateY(40px);
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
            filter: blur(0px);
          }
        }
        .animate-fade-up {
          animation: fadeUp 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
        /* Небольшое дыхание фона для живости */
        @keyframes subtleZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-bg-zoom {
          animation: subtleZoom 20s ease-in-out infinite alternate;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}} />

      {/* Фоновое изображение */}
      <div className="absolute inset-0 -z-10 bg-navy">
        <Image
          src="/assets/bird_008.jpg"
          alt="Жилой комплекс Симфония с высоты птичьего полета"
          fill
          priority
          quality={100}
          className="object-cover animate-bg-zoom" 
        />
        {/* Градиент теперь использует наш фирменный navy вместо простого черного для цельности бренда */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/30 to-navy/90 backdrop-blur-[1px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 mt-20 flex flex-col items-center">
        
        {/* Декоративная деталь рукописным шрифтом */}
        <p 
          style={{ fontFamily: "var(--font-annabelle)" }}
          className="animate-fade-up delay-100 text-4xl md:text-5xl text-gold mb-4 drop-shadow-lg"
        >
          premium
        </p>

        {/* Заголовок (взял фразу из брошюры) */}
        <h1 
          style={{ 
            fontFamily: "var(--font-literature)",
            textShadow: "0 10px 30px rgba(0,0,0,0.3)" 
          }} 
          className="animate-fade-up delay-300 text-6xl md:text-7xl lg:text-8xl text-baseWhite mb-6 tracking-wide uppercase"
        >
          Жизнь <br className="hidden md:block" /> в Симфонии
        </h1>
        
        {/* Подзаголовок (также адаптировал из брошюры) */}
        <p 
          className="animate-fade-up delay-500 font-sans text-lg md:text-xl text-baseWhite/80 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ textShadow: "0 4px 15px rgba(0,0,0,0.5)" }}
        >
          Современное пространство для жизни, где архитектура, комфорт и окружение создают гармоничную среду.
        </p>
        
        {/* Кнопка: при наведении красиво заливается золотым */}
        <button className="animate-fade-up delay-500 group relative px-8 py-4 bg-transparent border border-gold text-baseWhite text-sm font-semibold tracking-widest uppercase hover:text-navy transition-all duration-500 overflow-hidden rounded-full">
          <span className="relative z-10">Забронировать приватную экскурсию</span>
          <div className="absolute inset-0 h-full w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full z-0"></div>
        </button>
        
      </div>
    </section>
  );
}