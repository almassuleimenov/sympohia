"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  // Прямой доступ к DOM-элементу, чтобы не дергать React State при каждом пикселе
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Отключаем на тачпадах/телефонах
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Проверка на кликабельность
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    // Маслянистая анимация на 60/120 FPS через видеокарту
    const render = () => {
      if (cursorRef.current) {
        // Формула Lerp (Linear Interpolation)
        // 0.25 - это скорость следования. Делает движение быстрым, но очень плавным
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;

        // Используем translate3d для включения аппаратного ускорения (GPU)
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(render);
    };
    
    // Запускаем цикл
    rafId = requestAnimationFrame(render);

    // Очистка при размонтировании
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      // Убрали transition-all, оставили только transition для изменения размера при наведении
      className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference rounded-full flex items-center justify-center transition-[width,height,border-color,background-color] duration-300 ease-out"
      style={{
        // Динамический размер: точка -> кольцо
        width: isHovering ? "50px" : "12px",
        height: isHovering ? "50px" : "12px",
        backgroundColor: isHovering ? "transparent" : "#F8F2ED",
        border: isHovering ? "1px solid #F8F2ED" : "0px solid transparent",
        willChange: "transform", // Подсказка браузеру для максимальной оптимизации
      }}
    />
  );
}