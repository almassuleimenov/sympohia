"use client";

export default function Location() {
  return (
    <section id="location" className="py-24 bg-baseWhite text-navy overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Декоративная надпись рукописным шрифтом */}
        <p 
          style={{ fontFamily: "var(--font-annabelle)" }}
          className="text-gold text-4xl md:text-5xl mb-2"
        >
          location
        </p>

        {/* Заголовок и список инфраструктуры */}
        <div className="mb-16 md:flex md:justify-between md:items-end relative z-10">
          <div className="md:w-1/2">
            <h2 
              style={{ fontFamily: "var(--font-literature)" }} 
              className="text-4xl md:text-5xl mb-6 leading-tight uppercase tracking-widest text-navy"
            >
              В центре событий, <br /> вдали от суеты
            </h2>
          </div>
          
          <div className="mt-8 md:mt-0 md:w-1/3 flex flex-col space-y-4 font-sans text-sm tracking-wide uppercase">
            <div className="flex justify-between border-b border-navy/20 pb-2">
              <span className="text-navy/70">Ботанический сад</span>
              <span className="font-semibold text-gold">5 мин</span>
            </div>
            <div className="flex justify-between border-b border-navy/20 pb-2">
              <span className="text-navy/70">Рестораны и бутики</span>
              <span className="font-semibold text-gold">10 мин</span>
            </div>
            <div className="flex justify-between border-b border-navy/20 pb-2">
              <span className="text-navy/70">Деловой центр</span>
              <span className="font-semibold text-gold">15 мин</span>
            </div>
          </div>
        </div>

        {/* Интерактивная карта Яндекс */}
        <div className="relative w-full h-[500px] md:h-[700px] rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-navy/10 bg-navy/5 group">
          <iframe 
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A605f2472189cfecbd9a95d299962fc62e881b0e2308684e1ee187e6c2ae7c5e6&source=constructor" 
            width="100%" 
            height="100%" 
            frameBorder="0"
            /* ВАЖНО: оставляем этот фикс, чтобы Lenis не блокировал мышку на карте */
            style={{ pointerEvents: 'auto' }}
            /* Добавили твои стили: карта серая, но при наведении становится цветной */
            className="w-full h-full grayscale-[30%] opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100"
            title="Расположение ЖК Симфония"
          ></iframe>
        </div>
        
      </div>
    </section>
  );
}