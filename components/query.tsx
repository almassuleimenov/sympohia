"use client";

import { useState, useEffect, FormEvent } from "react";

interface QueryProps {
  isActive: boolean;
  onClose: () => void;
}

export default function Query({ isActive, onClose }: QueryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  // Если внешнее состояние закрылось (например, мы добавим кнопку закрытия снаружи), 
  // сворачиваем и саму форму
  useEffect(() => {
    if (!isActive) {
      setIsExpanded(false);
    }
  }, [isActive]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Здесь позже будет логика отправки на сервер (FastAPI/Postgres)
    console.log("Данные готовы к отправке:", formData);
    
    // Очищаем форму и закрываем всё до исходного состояния сайта
    setFormData({ name: "", phone: "" });
    onClose(); 
    setIsExpanded(false);
  };

  // Закрываем форму полностью при нажатии на крестик
  const handleCloseAll = (e: React.MouseEvent) => {
    e.stopPropagation(); // Останавливаем всплытие, чтобы не триггерился onClick контейнера
    setIsExpanded(false);
    onClose();
  };

  return (
    // Главный враппер: фиксируется в правом верхнем углу.
    // Когда !isActive, он плавно улетает за пределы видимости
    <div 
      className={`fixed top-0 right-0 z-[60] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isActive ? "translate-x-0 translate-y-0" : "translate-x-full -translate-y-full"
      }`}
    >
      {/* Контейнер формы. Анимирует ширину, высоту и радиус.
        В свернутом виде (80x80) работает как кнопка, в развернутом - как модалка.
      */}
      <div 
        className={`relative overflow-hidden bg-offWhite/80 backdrop-blur-xl border-b border-l border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isExpanded 
            ? "w-[100vw] h-[100vh] sm:w-[400px] sm:h-[480px] rounded-none sm:rounded-bl-[2.5rem]" 
            : "w-[80px] h-[80px] rounded-bl-[2.5rem] cursor-pointer hover:bg-offWhite/95"
        }`}
        onClick={() => {
          if (!isExpanded) setIsExpanded(true);
        }}
      >
        {/* =========================================
            Визуальный эффект "загнутого уголка" 
            ========================================= */}
        <div className={`absolute top-0 right-0 z-20 transition-opacity duration-500 ease-in-out pointer-events-none ${
          isExpanded ? "opacity-0" : "opacity-100 delay-300"
        }`}>
          {/* Имитация отворота через CSS border */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-l-[28px] border-t-white/90 border-l-transparent drop-shadow-md origin-center rotate-90"></div>
          {/* Легкая тень под отворотом */}
          <div className="absolute top-[2px] right-[2px] w-[26px] h-[26px] bg-transparent shadow-[-2px_2px_4px_rgba(0,0,0,0.15)] rounded-bl-sm"></div>
        </div>

        {/* =========================================
            Иконка "Конверт" в свернутом состоянии 
            ========================================= */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            isExpanded ? "opacity-0 pointer-events-none" : "opacity-100 delay-300"
          }`}
        >
          <svg className="w-7 h-7 text-graphite/80 ml-1 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        {/* =========================================
            Содержимое развернутой формы 
            ========================================= */}
        <div 
          className={`absolute inset-0 p-8 sm:p-10 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isExpanded ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-graphite tracking-wide">Ждем вас</h3>
            <button 
              onClick={handleCloseAll} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/40 text-graphite/60 hover:text-graphite hover:bg-white/80 transition-colors"
              aria-label="Закрыть форму"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form className="flex flex-col flex-grow space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] text-graphite/60 font-bold pl-1">
                Ваше имя
              </label>
              <input 
                id="name"
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/40 border border-white/60 rounded-2xl px-5 py-4 text-graphite focus:outline-none focus:ring-2 focus:ring-graphite/20 focus:bg-white/70 transition-all placeholder:text-graphite/30 text-sm" 
                placeholder="Иван Иванов" 
                required 
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="text-[10px] uppercase tracking-[0.2em] text-graphite/60 font-bold pl-1">
                Номер телефона
              </label>
              <input 
                id="phone"
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/40 border border-white/60 rounded-2xl px-5 py-4 text-graphite focus:outline-none focus:ring-2 focus:ring-graphite/20 focus:bg-white/70 transition-all placeholder:text-graphite/30 text-sm" 
                placeholder="+7 (___) ___-__-__" 
                required 
              />
            </div>

            <div className="mt-auto pt-6">
              <button 
                type="submit" 
                className="w-full py-4 bg-graphite text-offWhite rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-graphite/90 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}