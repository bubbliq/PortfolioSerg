import { site } from '@/lib/site';
import { CTAButton } from './CTAButton';

export function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-28 md:py-44 border-t hairline relative overflow-hidden">
      <div className="mx-auto max-w-page text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-chalk-300 mb-6">
          Открыт к новым проектам
        </p>
        <h2 className="font-display font-medium leading-[0.95] tracking-tightest text-[clamp(2.5rem,9vw,9rem)]">
          <span className="block">Сделаем</span>
          <span className="block text-chalk-300 italic">что-нибудь хорошее.</span>
        </h2>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <CTAButton href={site.telegram} variant="primary" external>
            Написать в Telegram
            <span aria-hidden>↗</span>
          </CTAButton>
          <CTAButton href={site.cv} variant="secondary" external download>
            Скачать CV (PDF)
            <span aria-hidden>↓</span>
          </CTAButton>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-chalk-300">
          <a href={`mailto:${site.email}`} className="underline-grow">
            {site.email}
          </a>
          <span aria-hidden className="text-chalk-500">·</span>
          <a href={site.telegram} target="_blank" rel="noreferrer" className="underline-grow">
            Telegram {site.telegramHandle}
          </a>
          <span aria-hidden className="text-chalk-500">·</span>
          <a href={site.behance} target="_blank" rel="noreferrer" className="underline-grow">
            Behance
          </a>
        </div>
      </div>
    </section>
  );
}
