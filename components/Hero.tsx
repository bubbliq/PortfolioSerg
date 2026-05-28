import { site, withBase } from '@/lib/site';
import { CTAButton } from './CTAButton';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-32 md:pt-40 pb-12 px-6 md:px-10">
      <div className="relative z-10 mx-auto max-w-page w-full">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-chalk-300 mb-8">
          <span className="rise">{site.role} · {site.location}</span>
        </p>
        <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-8 md:gap-10">
          <h1 className="font-display font-medium leading-[0.95] tracking-tightest text-[clamp(2.75rem,9vw,9.5rem)]">
            <span className="block overflow-hidden">
              <span className="rise inline-block">Привет,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="rise rise-delay-1 inline-block">Я - Сергей, —</span>
            </span>
            <span className="block overflow-hidden text-chalk-300">
              <span className="rise rise-delay-2 inline-block">проектирую</span>
            </span>
            <span className="block overflow-hidden text-chalk-300">
              <span className="rise rise-delay-3 inline-block">продукты.</span>
            </span>
          </h1>
          <div
            className="shrink-0 overflow-hidden rounded-full border hairline self-start"
            style={{ width: 246, height: 246 }}
          >
            <img
              src={withBase('/Avatar.jpg')}
              alt={`${site.name} — фото`}
              width={246}
              height={246}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-page w-full mt-16 grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-end">
        <p className="max-w-prose text-lg md:text-xl text-chalk-100 leading-snug">
          {site.shortBio}
        </p>
        <div className="flex flex-wrap gap-3">
          <CTAButton href={site.telegram} variant="primary" external>
            Telegram
            <span aria-hidden>↗</span>
          </CTAButton>
          <CTAButton href={site.cv} variant="secondary" external download>
            Скачать CV
            <span aria-hidden>↓</span>
          </CTAButton>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-chalk-300 text-xs font-mono tracking-widest uppercase animate-pulse">
        Scroll
      </div>
    </section>
  );
}
