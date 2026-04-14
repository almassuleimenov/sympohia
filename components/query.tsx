"use client";

import { useState, useEffect, FormEvent } from "react";

interface QueryProps {
  isActive: boolean;
  onClose: () => void;
}

export default function Query({ isActive, onClose }: QueryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  useEffect(() => {
    if (isActive) {
      // ИЗМЕНЕНИЕ ЗДЕСЬ: Увеличили задержку до 800ms. 
      // Конверт выезжает 700ms -> ждет 100ms -> красиво раскрывается.
      const timer = setTimeout(() => setIsExpanded(true), 800);
      return () => clearTimeout(timer);
    } else {
      setIsExpanded(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (isExpanded && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Данные готовы к отправке:", formData);
    
    setFormData({ name: "", phone: "" });
    setIsExpanded(false);
    setTimeout(() => onClose(), 500); 
  };

  const handleCloseAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    setTimeout(() => onClose(), 500);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-navy/40 backdrop-blur-sm z-[55] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleCloseAll}
      ></div>

      <div 
        className={`fixed top-0 right-0 z-[60] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isActive ? "translate-x-0 translate-y-0" : "translate-x-full -translate-y-full"
        }`}
      >
        <div 
          className={`relative overflow-hidden bg-navy/95 backdrop-blur-xl border-b border-l border-gold/30 shadow-[-10px_10px_40px_rgba(0,0,0,0.3)] transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isExpanded 
              ? "w-[100vw] h-[100vh] sm:w-[450px] sm:h-[600px] rounded-none sm:rounded-bl-[3rem]" 
              : "w-[80px] h-[80px] rounded-bl-[2.5rem] cursor-pointer hover:bg-navy"
          }`}
          onClick={() => {
            if (!isExpanded) setIsExpanded(true);
          }}
        >
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              isExpanded ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100 delay-300"
            }`}
          >
            <svg className="w-8 h-8 text-gold ml-1 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <div 
            className={`absolute inset-0 p-8 sm:p-12 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isExpanded ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-12 pointer-events-none"
            }`}
          >
            <div className="flex justify-between items-start mb-10">
              <div>
                <p style={{ fontFamily: "var(--font-annabelle)" }} className="text-gold text-3xl mb-1">
                  Contact
                </p>
                <h3 style={{ fontFamily: "var(--font-literature)" }} className="text-3xl sm:text-4xl text-baseWhite tracking-widest uppercase">
                  Ждем вас
                </h3>
              </div>
              
              <button 
                onClick={handleCloseAll} 
                className="group w-10 h-10 flex items-center justify-center rounded-full border border-baseWhite/10 text-baseWhite/50 hover:text-gold hover:border-gold transition-all duration-300 mt-2"
                aria-label="Закрыть форму"
              >
                <svg className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="flex flex-col flex-grow space-y-8" onSubmit={handleSubmit}>
              
              <div className="relative pt-4">
                <input 
                  id="name"
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="peer w-full bg-transparent border-b border-baseWhite/20 py-2 text-baseWhite text-lg focus:outline-none focus:border-gold transition-colors placeholder-transparent" 
                  placeholder="Иван Иванов" 
                  required 
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 text-baseWhite/50 text-xs uppercase tracking-[0.2em] transition-all duration-300 pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-gold"
                >
                  Ваше имя
                </label>
              </div>

              <div className="relative pt-4">
                <input 
                  id="phone"
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="peer w-full bg-transparent border-b border-baseWhite/20 py-2 text-baseWhite text-lg focus:outline-none focus:border-gold transition-colors placeholder-transparent" 
                  placeholder="+7 (___) ___-__-__" 
                  required 
                />
                <label 
                  htmlFor="phone" 
                  className="absolute left-0 text-baseWhite/50 text-xs uppercase tracking-[0.2em] transition-all duration-300 pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-gold"
                >
                  Номер телефона
                </label>
              </div>

              <div className="mt-auto pt-10">
                <button 
                  type="submit" 
                  className="relative w-full py-5 bg-gold text-navy rounded-full uppercase tracking-widest text-xs font-bold overflow-hidden shadow-[0_10px_20px_rgba(203,159,125,0.2)] hover:shadow-[0_15px_30px_rgba(203,159,125,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                  Отправить заявку
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}