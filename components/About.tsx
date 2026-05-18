import { site } from '@/lib/site';

const facts = [
  { k: '4+', v: 'года в продуктовом дизайне' },
  { k: '3', v: 'компании в опыте' },
  { k: '5+', v: 'кросс-платформенных продуктов' },
  { k: '17', v: 'глубинных интервью в одном из проектов' },
];

const stack = [
  ['Дизайн', ['Product design', 'UX/UI', 'Дизайн-системы', 'Прототипирование']],
  ['Исследования', ['JTBD', 'CJM', 'Юзабилити-тесты', 'Глубинные интервью']],
  ['Инструменты', ['Figma', 'FigJam', 'Notion', 'Jira / Kanban']],
  ['Процессы', ['Гипотезы → метрики', 'Защита решений', 'Работа с фидбеком']],
];

export function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32 border-t hairline">
      <div className="mx-auto max-w-page grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-chalk-300 mb-4">
            Обо мне
          </p>
          <h2 className="font-display font-medium leading-[1.02] tracking-tightest text-[clamp(2rem,4.5vw,4rem)]">
            Дизайнер,<br />
            который дружит<br />
            <span className="text-chalk-300">с метриками.</span>
          </h2>
        </div>

        <div className="md:col-span-7 space-y-10">
          <p className="text-lg md:text-xl leading-snug text-chalk-100 max-w-prose">
            Senior Product Designer с опытом в B2C и B2B. Работаю в продукте полным циклом:
            исследование → гипотезы → концепции → тестирование → внедрение. Защищаю
            UX-решения данными и пользовательскими инсайтами.
          </p>
          <p className="text-base text-chalk-300 max-w-prose">
            Сейчас в Кросслайфе делаю well-being платформу, кафетерий льгот и админ-панель
            для HR. До этого — мобильные продукты в КИБЕР-РОМ и фриланс-проекты, включая
            трамвайную линию «Славянка» в Санкт-Петербурге.
          </p>

          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
            {facts.map((f) => (
              <div key={f.v}>
                <dt className="font-display text-4xl md:text-5xl font-medium leading-none tracking-tight">
                  {f.k}
                </dt>
                <dd className="mt-3 text-xs font-mono uppercase tracking-wider text-chalk-300">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 pt-6 border-t hairline">
            {stack.map(([title, items]) => (
              <div key={title as string}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-chalk-300 mb-3">
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
