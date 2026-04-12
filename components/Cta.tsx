"use client";

import Image from "next/image";

export default function Cta() {
  return (
    <section className="relative py-24 md:py-40 bg-navy text-baseWhite overflow-hidden">
      
      {/* Еле заметный фоновый рисунок для глубины (используем твое фото с эффектом наложения) */}
      <div className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none">
        <Image 
          src="/assets/TW_Corona007.jpg" 
          alt="Texture" 
          fill 
          className="object-cover blur-sm"
        />
      </div>

      {/* Золотое свечение на фоне для атмосферы */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        
        {/* Декоративная надпись */}
        <p 
          style={{ fontFamily: "var(--font-annabelle)" }}
          className="text-gold text-2xl md:text-4xl lg:text-5xl mb-4 drop-shadow-md"
        >
          next chapter
        </p>

        <h2 
          style={{ fontFamily: "var(--font-literature)" }} 
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 tracking-wide uppercase leading-tight px-4"
        >
          Готовы услышать <br className="hidden sm:block" /> свою Симфонию?
        </h2>
        
        <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-baseWhite/80 mb-8 md:mb-12 font-light leading-relaxed max-w-2xl mx-auto px-4">
          Оставьте заявку на получение закрытой презентации с актуальными планировками и ценами, или запишитесь на приватную экскурсию.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          
          {/* Главная кнопка (Залитая золотым) */}
          <button className="group relative w-full sm:w-auto px-8 py-4 bg-gold text-navy text-sm font-semibold tracking-widest uppercase hover:bg-baseWhite transition-all duration-500 overflow-hidden rounded-full shadow-[0_10px_30px_rgba(203,159,125,0.2)] hover:shadow-[0_15px_40px_rgba(248,242,237,0.3)]">
            Скачать презентацию
          </button>
          
          {/* Второстепенная кнопка (Прозрачная с золотой рамкой) */}
          <button className="group relative w-full sm:w-auto px-8 py-4 border border-gold text-baseWhite text-sm font-semibold tracking-widest uppercase hover:text-navy transition-all duration-500 overflow-hidden rounded-full">
            <span className="relative z-10">Заказать звонок</span>
            <div className="absolute inset-0 h-full w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full z-0"></div>
          </button>

        </div>

      </div>
    </section>
  );
}