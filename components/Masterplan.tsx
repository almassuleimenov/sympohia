import React from 'react';
import Image from 'next/image';

const Masterplan: React.FC = () => {
  return (
    <section id="masterplan" className="w-full py-24 bg-baseWhite relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Заголовок блока */}
        <div className="mb-12 md:mb-16">
          <p 
            style={{ fontFamily: "var(--font-annabelle)" }}
            className="text-gold text-4xl md:text-5xl mb-2 drop-shadow-sm"
          >
            masterplan
          </p>
          <h2 
            style={{ fontFamily: "var(--font-literature)" }}
            className="text-navy text-4xl md:text-5xl uppercase tracking-widest"
          >
            Генеральный план
          </h2>
        </div>

        {/* 1. Убрали aspect-[...], теперь высота зависит от самой картинки.
          2. Эффект паспарту (рамки) делаем через padding (p-2 md:p-4) на САМОМ контейнере, а не на картинке.
        */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-navy/10 bg-white group p-2 md:p-4">
          
          {/* Внутренняя обертка для скругления самой картинки, если нужна */}
          <div className="relative w-full rounded-2xl overflow-hidden">
            <Image
              // Опять же, если у тебя файл называется Masterplan.jpg, поменяй расширение ниже
              src="/assets/Masterplan.jpeg"
              alt="Генеральный план ЖК Симфония"
              // Базовые пропорции (16:9). Next.js будет использовать их для сохранения соотношения сторон
              width={1920}
              height={1080}
              quality={100}
              // Убрали fill. w-full и h-auto заставляют картинку вести себя отзывчиво и занимать ровно столько места, сколько нужно
              className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
              draggable={false}
            />
          </div>
          
        </div>

      </div>

    </section>
  );
};

export default Masterplan;