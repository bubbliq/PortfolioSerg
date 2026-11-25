const facts = [
  { k: '4+', v: 'года в продуктовом дизайне' },
  { k: '2', v: 'компании в опыте' },
  { k: '5+', v: 'кросс-платформенных продуктов' },
  { k: '17', v: 'глубинных интервью в одном из проектов' },
];

const stack = [
  ['Исследования', ['Глубинные интервью', 'Юзабилити-тесты', 'Проверка гипотез на прототипах']],
  ['Аналитика', ['DataLens и Яндекс Метрика', 'Разбор обратной связи от пользователей']],
  ['Дизайн', ['Прототипирование в Figma', 'Создание и поддержка дизайн-систем', 'Дизайн-ревью']],
  ['ИИ в работе команды', ['Обработка интервью', 'Прототипирование', 'Создание анимации и иллюстраций']],
];

export function About() {
  return (
    <section id="about" className="px-[max(16px,3.5%)] py-24 md:py-32 border-t hairline">
      <div className="mx-auto w-full grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <h2 className="font-display font-medium leading-[1.02] tracking-tightest text-[clamp(2rem,4.5vw,4rem)]">
            Помогаю людям <span className="text-chalk-300">тратить меньше времени на привычные задачи.</span>
          </h2>
        </div>

        <div className="md:col-span-7 space-y-10">
          <p className="text-lg md:text-xl leading-snug text-chalk-100 max-w-prose">
            Я продуктовый дизайнер. Больше четырёх лет проектирую мобильные приложения и веб-сервисы. В «Кросслайфе» работаю с обеими сторонами одной платформы: сотрудники выбирают льготы и следят за здоровьем, а HR-команды создают события и смотрят статистику.
          </p>
          <p className="text-base text-chalk-300 max-w-prose">
            Чтобы понять, где человек теряет время, сверяю его отзывы с данными, проверяю решение на прототипе и после запуска смотрю, что изменилось. Раньше спроектировал и запустил в «КИБЕР-РОМ» первую версию приложения для покупок Cheers! Up. Для трамвайной линии «Славянка» спроектировал мобильное приложение с нуля.
          </p>

          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
            {facts.map((f) => (
              <div key={f.v}>
                <dt className="font-display text-4xl md:text-5xl font-medium leading-none tracking-tight">
                  {f.k}
                </dt>
                <dd className="mt-3 text-xs font-display font-medium text-chalk-300">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 pt-6 border-t hairline">
            {stack.map(([title, items]) => (
              <div key={title as string}>
                <p className="font-display font-medium text-[11px] uppercase tracking-wider text-chalk-300 mb-3">
                  {title}
                </p>
                <ul className="space-y-1.5">
                  {(items as string[]).map((s) => (
                    <li key={s} className="text-base">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
