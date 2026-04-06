import Image from "next/image";

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-pearl text-graphite">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Заголовок секции */}
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Визуальная симфония
          </h2>
          <p className="font-sans text-lg text-graphite/70 max-w-2xl mx-auto">
            Внимание к деталям на каждом уровне: от монументальных фасадов до приватных пространств, созданных для вашей семьи.
          </p>
        </div>

        {/* CSS Grid для Галереи: сложная асимметричная сетка */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Большое фото (Вечерний фасад) - занимает 8 колонок */}
          <div className="md:col-span-8 relative h-[400px] md:h-[600px] overflow-hidden group">
            <Image
              src="/assets/TW_Corona007.jpg" // Вечерний рендер
              alt="Вечерний вид ЖК Симфония"
              fill
              quality={85}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-graphite/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>

          {/* Два маленьких фото друг над другом - занимают 4 колонки */}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
            
            {/* Входная группа (коляски) */}
            <div className="relative h-[200px] md:h-[calc(300px-12px)] overflow-hidden group">
              <Image
                src="/assets/TW_Corona009.jpg" 
                alt="Входная группа ЖК Симфония"
                fill
                quality={80}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Въезд и логотип */}
            <div className="relative h-[200px] md:h-[calc(300px-12px)] overflow-hidden group">
              <Image
                src="/assets/TW_Corona006.jpg" 
                alt="Въезд на территорию ЖК Симфония"
                fill
                quality={80}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

          </div>

          {/* Широкое фото внизу (Два здания) - на всю ширину (12 колонок) */}
          <div className="md:col-span-12 relative h-[300px] md:h-[500px] overflow-hidden group mt-2 md:mt-0">
            <Image
              src="/assets/TW_Corona003.jpg" // Дневной рендер двух башен
              alt="Архитектурный ансамбль ЖК Симфония"
              fill
              quality={85}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
}