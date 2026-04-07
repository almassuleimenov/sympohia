import Image from "next/image";

export default function Location() {
  return (
    <section id="location" className="py-24 bg-offWhite text-graphite overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Заголовок в стиле нашей журнальной верстки */}
        <div className="mb-16 md:flex md:justify-between md:items-end relative z-10">
          <div className="md:w-1/2">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              В центре событий, <br /> вдали от суеты
            </h2>
          </div>
          
          <div className="mt-8 md:mt-0 md:w-1/3 flex flex-col space-y-4 font-sans text-sm tracking-wide uppercase">
            <div className="flex justify-between border-b border-graphite/20 pb-2">
              <span className="text-graphite/60">Ботанический сад</span>
              <span className="font-semibold text-sageGreen">5 мин</span>
            </div>
            <div className="flex justify-between border-b border-graphite/20 pb-2">
              <span className="text-graphite/60">Рестораны и бутики</span>
              <span className="font-semibold text-sageGreen">10 мин</span>
            </div>
            <div className="flex justify-between border-b border-graphite/20 pb-2">
              <span className="text-graphite/60">Деловой центр</span>
              <span className="font-semibold text-sageGreen">15 мин</span>
            </div>
          </div>
        </div>

        {/* Карта в стиле Monterosa (Отрисованная картинка + точки) */}
        <div className="relative w-full h-[500px] md:h-[700px] bg-[#EBEAE8] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Сюда позже дизайнер даст красивую отрисованную карту, 
              пока ставим заглушку-фон или один из дневных рендеров */}
          <div className="absolute inset-0 opacity-40 mix-blend-multiply">
            <Image 
              src="/assets/TW_Corona003.jpg" 
              alt="Фон карты" 
              fill 
              className="object-cover"
            />
          </div>

          {/* Концентрические круги как на референсе Monterosa */}
          <div className="absolute w-[300px] h-[300px] border border-sageGreen/30 rounded-full"></div>
          <div className="absolute w-[600px] h-[600px] border border-sageGreen/20 rounded-full"></div>
          <div className="absolute w-[900px] h-[900px] border border-sageGreen/10 rounded-full"></div>

          {/* Центральный маркер (Наш ЖК) */}
          <div className="absolute z-20 flex flex-col items-center animate-bounce">
            <div className="w-12 h-12 bg-graphite rounded-full border-4 border-offWhite flex items-center justify-center shadow-2xl">
              <span className="text-offWhite font-serif text-xl">С</span>
            </div>
            <div className="mt-2 bg-offWhite/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
              ЖК Симфония
            </div>
          </div>

          {/* Маркер инфраструктуры (Пример 1) */}
          <div className="absolute z-10 top-1/4 left-1/4 flex flex-col items-center group cursor-pointer">
             <div className="w-6 h-6 bg-sageGreen rounded-full border-2 border-offWhite shadow-md transition-transform group-hover:scale-125"></div>
             <div className="mt-2 text-[10px] uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-offWhite px-2 py-1 rounded">Школа</div>
          </div>

          {/* Маркер инфраструктуры (Пример 2) */}
          <div className="absolute z-10 bottom-1/3 right-1/4 flex flex-col items-center group cursor-pointer">
             <div className="w-6 h-6 bg-sageGreen rounded-full border-2 border-offWhite shadow-md transition-transform group-hover:scale-125"></div>
             <div className="mt-2 text-[10px] uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-offWhite px-2 py-1 rounded">Парк</div>
          </div>

        </div>
      </div>
    </section>
  );
}