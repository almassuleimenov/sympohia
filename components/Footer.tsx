import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-whitesmoke text-graphite pt-16 pb-8 border-t border-graphite/10">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Основная сетка футера */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          
          {/* Колонка 1: Бренд */}
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-3xl uppercase tracking-widest block mb-4">
              Симфония
            </Link>
            <p className="font-sans text-sm text-graphite/70">
              Премиальный жилой комплекс. <br />
              Искусство жить у воды.
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-xs mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-graphite/80">
              <li><Link href="#about" className="hover:text-sageGreen transition-colors">О проекте</Link></li>
              <li><Link href="#gallery" className="hover:text-sageGreen transition-colors">Галерея</Link></li>
              <li><Link href="#layouts" className="hover:text-sageGreen transition-colors">Планировки</Link></li>
              <li><Link href="#location" className="hover:text-sageGreen transition-colors">Расположение</Link></li>
            </ul>
          </div>

          {/* Колонка 3: Контакты */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-xs mb-4">Офис продаж</h4>
            <ul className="space-y-2 text-sm text-graphite/80">
              <li>ул. Архитектурная, д. 1</li>
              <li>Ежедневно с 09:00 до 20:00</li>
              <li className="pt-2">
                <a href="tel:+79991234567" className="font-semibold hover:text-sageGreen transition-colors">
                  +7 (999) 123-45-67
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Документация */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-xs mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-graphite/80">
              <li><a href="#" className="hover:text-sageGreen transition-colors">Проектная декларация</a></li>
              <li><a href="#" className="hover:text-sageGreen transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-sageGreen transition-colors">Согласие на обработку данных</a></li>
            </ul>
          </div>

        </div>

        {/* Копирайт */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-graphite/10 pt-8 text-xs text-graphite/50">
          <p>© {new Date().getFullYear()} ЖК «Симфония». Все права защищены.</p>
          <p className="mt-2 md:mt-0">Не является публичной офертой.</p>
        </div>

      </div>
    </footer>
  );
}