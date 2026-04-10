"use client";

import { useEffect, useState } from "react";

export default function TelegramButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://t.me/tvoi_username" 
      target="_blank"
      rel="noopener noreferrer"
      /* ИЗМЕНИЛИ: bottom-24 (чтобы была над WhatsApp) и добавили delay-150 для каскадного появления */
      className={`fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#2AABEE] text-white rounded-full shadow-[0_10px_20px_rgba(42,171,238,0.3)] transition-all duration-500 hover:scale-110 hover:shadow-[0_15px_30px_rgba(42,171,238,0.4)] hover:bg-[#229ED9] ${
        isVisible ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Написать в Telegram"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7 mr-1 mt-0.5"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.31-.353-.111l-6.4 4.024-2.76-.86c-.6-.185-.613-.604.125-.89l10.736-4.138c.498-.225.965.104.832.82z" />
      </svg>
    </a>
  );
}