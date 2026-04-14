"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const galleryImages = [
  { id: 1, src: "/assets/TW_Corona007.jpg", alt: "Вечерний вид ЖК Симфония" },
  { id: 2, src: "/assets/TW_Corona009.jpg", alt: "Входная группа: Премиальная отделка" },
  { id: 3, src: "/assets/TW_Corona006.jpg", alt: "Въезд на территорию: Контроль доступа" },
  { id: 4, src: "/assets/TW_Corona003.jpg", alt: "Архитектурный ансамбль: Изысканность" },
];

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const dragState = useRef({
    startX: 0,
    startScrollLeft: 0,
    maxScrollLeft: 0,
    maxThumbOffset: 0,
  });

  // Наблюдатель за появлением секции
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Высокопроизводительная логика скроллбара (Прямые мутации DOM)
  const updateScrollbar = useCallback(() => {
    const container = scrollRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;

    if (!container || !track || !thumb) return;

    const contentWidth = container.scrollWidth;
    const visibleWidth = container.clientWidth;
    const maxScrollLeft = contentWidth - visibleWidth;

    if (maxScrollLeft <= 0) {
      thumb.style.width = "0px";
      return;
    }

    const trackWidth = track.clientWidth;
    const computedWidth = Math.max(40, (visibleWidth / contentWidth) * trackWidth);
    const maxThumbOffset = trackWidth - computedWidth;
    const scrollRatio = container.scrollLeft / maxScrollLeft;
    
    // Прямая мутация DOM (без ререндера React)
    thumb.style.width = `${computedWidth}px`;
    thumb.style.transform = `translateX(${scrollRatio * maxThumbOffset}px)`;

    // Оптимизированное обновление состояния слайда
    const slideWidth = contentWidth / galleryImages.length;
    const currentIndex = Math.min(
      galleryImages.length - 1,
      Math.round(container.scrollLeft / slideWidth)
    );

    setActiveSlideIndex((prev) => (prev !== currentIndex ? currentIndex : prev));
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollbar();
    
    container.addEventListener("scroll", updateScrollbar, { passive: true });
    window.addEventListener("resize", updateScrollbar);

    return () => {
      container.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
    };
  }, [updateScrollbar]);

  // Оптимизированная логика перетаскивания (Drag)
  const onThumbDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = scrollRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;

    if (!container || !track || !thumb) return;

    setIsDragging(true);
    document.body.style.cursor = "grabbing";

    dragState.current = {
      startX: e.clientX,
      startScrollLeft: container.scrollLeft,
      maxScrollLeft: container.scrollWidth - container.clientWidth,
      maxThumbOffset: track.clientWidth - thumb.clientWidth,
    };
  };

  const onThumbMove = useCallback((e: MouseEvent) => {
    if (!scrollRef.current) return;
    
    const { startX, startScrollLeft, maxScrollLeft, maxThumbOffset } = dragState.current;
    const deltaX = e.clientX - startX;
    
    // Вычисляем, насколько нужно проскроллить контейнер на основе сдвига мыши
    const scrollDelta = (deltaX / maxThumbOffset) * maxScrollLeft;
    scrollRef.current.scrollLeft = startScrollLeft + scrollDelta;
  }, []);

  const onThumbUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = "";
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onThumbMove);
      window.addEventListener("mouseup", onThumbUp);
    } else {
      window.removeEventListener("mousemove", onThumbMove);
      window.removeEventListener("mouseup", onThumbUp);
    }
    return () => {
      window.removeEventListener("mousemove", onThumbMove);
      window.removeEventListener("mouseup", onThumbUp);
    };
  }, [isDragging, onThumbMove, onThumbUp]);

  // Навигация по кнопкам
  const scrollDelta = (direction: 1 | -1) => {
    const container = scrollRef.current;
    if (!container) return;
    const slideWidth = container.scrollWidth / galleryImages.length;
    container.scrollBy({ left: direction * slideWidth, behavior: "smooth" });
  };

  // Колесико мыши
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current && e.deltaY !== 0) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  // Клик по дорожке скроллбара
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === thumbRef.current || !scrollRef.current || !trackRef.current) return;
    
    const container = scrollRef.current;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const scrollRatio = clickX / rect.width;
    
    container.scrollTo({ 
      left: scrollRatio * (container.scrollWidth - container.clientWidth), 
      behavior: "smooth" 
    });
  };

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-navy text-baseWhite overflow-hidden relative"
    >
      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <div 
          className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p 
                style={{ fontFamily: "var(--font-annabelle)" }}
                className="text-gold text-4xl md:text-5xl mb-2"
              >
                Gallery
              </p>
              <h2 
                style={{ fontFamily: "var(--font-literature)" }}
                className="text-4xl md:text-6xl tracking-widest uppercase mb-4"
              >
                Визуальная симфония
              </h2>
            </div>
            <p className="text-sm md:text-base text-baseWhite/70 max-w-xl leading-relaxed font-light md:mb-1">
              Внимание к деталям на каждом уровне. Полноценные рендеры комплекса — сдвиньте в сторону или используйте ползунок ниже.
            </p>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex h-[70vh] overflow-x-auto snap-x snap-mandatory gap-6 md:gap-10 px-6 md:px-12 pb-16 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {galleryImages.map((img, index) => (
          <div 
            key={img.id}
            className={`relative shrink-0 h-full aspect-[4/5] md:aspect-[3/2] snap-center rounded-3xl overflow-hidden group transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
          >
            <Image
              src={img.src} 
              alt={img.alt}
              fill
              quality={100}
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              draggable={false}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy/60 to-transparent pointer-events-none"></div>
          </div>
        ))}
        <div className="shrink-0 w-[5vw] md:w-[12vw]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 -mt-10 mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-gold"></div>
          <p className="text-baseWhite font-normal tracking-widest uppercase text-xs md:text-sm drop-shadow-md">
            {galleryImages[activeSlideIndex]?.alt || ""}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 absolute inset-x-0 bottom-12 z-20">
        <div className="flex items-center gap-6 md:gap-8 justify-center md:justify-end">
          <button 
            onClick={() => scrollDelta(-1)}
            className="group disabled:opacity-30 disabled:pointer-events-none"
            disabled={activeSlideIndex === 0}
            aria-label="Предыдущее фото"
          >
            <svg 
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" 
              className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:stroke-gold group-hover:-translate-x-1"
            >
              <path d="M19 12H5" /><path d="M12 19L5 12L12 5" />
            </svg>
          </button>

          <div 
            ref={trackRef}
            className="relative w-[30vw] md:w-[200px] h-[3px] bg-baseWhite/10 rounded-full cursor-pointer"
            onClick={handleTrackClick}
          >
            <div 
              ref={thumbRef}
              className={`absolute top-0 h-full bg-gold rounded-full cursor-grab origin-left ${isDragging ? "grabbing" : ""}`}
              style={{ 
                left: 0, // Устанавливаем в 0, смещение контролируется через transform
                transition: isDragging ? "none" : "transform 0.1s linear, width 0.1s linear",
              }}
              onMouseDown={onThumbDown}
            ></div>
          </div>

          <button 
            onClick={() => scrollDelta(1)}
            className="group disabled:opacity-30 disabled:pointer-events-none"
            disabled={activeSlideIndex === galleryImages.length - 1}
            aria-label="Следующее фото"
          >
            <svg 
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" 
              className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:stroke-gold group-hover:translate-x-1"
            >
              <path d="M5 12H19" /><path d="M12 5L19 12L12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}