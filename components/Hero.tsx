import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center">
      <div className="absolute inset-0 -z-10 bg-pearl">
        <Image
          src="/assets/bird_008.jpg"
          alt="Жилой комплекс Симфония с высоты птичьего полета"
          fill
          priority
          quality={90}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-darkCharcoal/40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 mt-20">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-offWhite mb-6 tracking-wide drop-shadow-md">
          Пространство, созданное <br className="hidden md:block" /> для вашей Симфонии
        </h1>
        <p className="font-sans text-lg md:text-xl text-offWhite font-medium max-w-2xl mx-auto mb-10 drop-shadow-sm">
          Новый уровень жизни у воды. Откройте для себя архитектурный шедевр, где эстетика тихой роскоши сливается с природой.
        </p>
        <button className="bg-offWhite text-graphite px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-sageGreen hover:text-offWhite transition-colors duration-300 shadow-lg">
          Забронировать приватную экскурсию
        </button>
      </div>
    </section>
  );
}