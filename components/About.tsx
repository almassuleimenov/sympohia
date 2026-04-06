import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-offWhite text-graphite">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          
          <div className="md:col-span-5 md:pr-10">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              Архитектура <br /> теплого модерна
            </h2>
            <p className="font-sans text-lg mb-6 leading-relaxed text-graphite/80">
              «Симфония» отказывается от резкого минимализма в пользу среды, вызывающей ощущение тепла и утонченного комфорта. Вертикальная текстура фасадов плавно переходит в волнообразную линию карниза, создавая органическую динамику.
            </p>
            <p className="font-sans text-lg mb-10 leading-relaxed text-graphite/80">
              Каждая деталь, от просторных светлых лобби до биофильного дизайна территории, спроектирована с глубоким вниманием к семейным ценностям и вашей приватности.
            </p>
            <button className="border-b border-graphite pb-1 text-sm font-semibold uppercase tracking-wider hover:text-sageGreen hover:border-sageGreen transition-colors duration-300">
              Узнать больше о проекте
            </button>
          </div>

          <div className="md:col-span-7 relative h-[500px] md:h-[700px] w-full shadow-2xl">
            <Image
              src="/assets/TW_Corona002.jpg" 
              alt="Архитектура ЖК Симфония"
              fill
              quality={90}
              className="object-cover"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}