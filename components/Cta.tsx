export default function Cta() {
  return (
    <section className="py-20 md:py-32 bg-darkCharcoal text-offWhite text-center">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <h2 className="font-serif text-4xl md:text-6xl mb-6">
          Готовы услышать свою Симфонию?
        </h2>
        
        <p className="font-sans text-lg md:text-xl text-offWhite/80 mb-10 font-light">
          Оставьте заявку на получение закрытой презентации с актуальными планировками и ценами, или запишитесь на приватную экскурсию по объекту.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto bg-offWhite text-graphite px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-sageGreen hover:text-offWhite transition-colors duration-300">
            Скачать презентацию
          </button>
          
          <button className="w-full sm:w-auto border border-offWhite text-offWhite px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-offWhite hover:text-graphite transition-colors duration-300">
            Заказать звонок
          </button>
        </div>

      </div>
    </section>
  );
}