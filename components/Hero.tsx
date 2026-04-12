"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      
      {/* Элегантная анимация появления для премиум-сегмента */}
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
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}} />

      {/* Видео фон */}
      <div className="absolute inset-0 -z-10 bg-navy overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          // ДОБАВЛЕНО: scale-[1.15] для зума (обрезает вшитые черные полосы)
          // ДОБАВЛЕНО: blur-[2px] для сглаживания артефактов плохого качества
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-[1.15] blur-[2px]"
        >
          <source src="/assets/Drone_Shot_Of_Residential_Towers.mp4" type="video/mp4" />
        </video>
        {/* Градиент оверлей: усилили backdrop-blur до 3px для большей мягкости и скрытия пикселей видео */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/90 backdrop-blur-[3px] z-10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20 mt-20 pb-24 md:pb-32 flex flex-col items-center">
        
        {/* Декоративная деталь рукописным шрифтом */}
        <p 
          style={{ fontFamily: "var(--font-annabelle)" }}
          className="animate-fade-up delay-100 text-2xl md:text-4xl lg:text-5xl text-gold mb-4 drop-shadow-lg"
        >
          Signature
        </p>

        {/* Заголовок */}
        <h1 
          style={{ 
            fontFamily: "var(--font-literature)",
            textShadow: "0 10px 30px rgba(0,0,0,0.3)" 
          }} 
          className="animate-fade-up delay-300 text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-baseWhite mb-6 tracking-wide uppercase leading-tight"
        >
          Жизнь <br className="hidden md:block" /> в Симфонии
        </h1>
        
        {/* Подзаголовок */}
        <p 
          className="animate-fade-up delay-500 font-sans text-sm sm:text-base md:text-lg lg:text-xl text-baseWhite/80 font-medium max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4"
          style={{ textShadow: "0 4px 15px rgba(0,0,0,0.5)" }}
        >
          Современное пространство для жизни, где архитектура, комфорт и окружение создают гармоничную среду.
        </p>
        
        {/* Кнопка */}
        <button className="animate-fade-up delay-500 group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-gold text-baseWhite text-xs sm:text-sm font-semibold tracking-widest uppercase hover:text-navy transition-all duration-500 overflow-hidden rounded-full">
          <span className="relative z-10">Забронировать экскурсию</span>
          <div className="absolute inset-0 h-full w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full z-0"></div>
        </button>
        
      </div>
      
    </section>
  );
}