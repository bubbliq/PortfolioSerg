import { site, withBase } from '@/lib/site';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-24 md:pt-28 pb-20 px-[max(16px,3.5%)]">
      <div className="hero-content relative z-10 w-full">
        <div className="hero-stage">
          <h1 aria-label={site.name} className="hero-heading font-display">
            <span aria-hidden="true" className="hero-word hero-name">{Array.from(site.name, (letter, i) => (
              <span key={i} style={{ animationDelay: i * 20 + 'ms' }}>{letter === ' ' ? '\u00a0' : letter}</span>
            ))}</span>
            {['Обо мне', 'Проекты', 'Это я 👋', 'Telegram', 'Скачать CV'].map(label => (
              <span key={label} aria-hidden="true" className="hero-word" data-title={label}>
                {label}
              </span>
            ))}
          </h1>
          <div className="hero-links">
            <a data-preview="Обо мне" href="#about" className="hero-tile"><span>Обо мне</span><span aria-hidden="true">↗</span></a>
            <a data-preview="Проекты" href="#projects" className="hero-tile hero-project">
              <span className="hero-label"><span>Проекты</span><span aria-hidden="true">Проекты</span></span>
              <span className="hero-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="hero-lower">
          <div className="hero-tile hero-intro">
            <p className="text-[clamp(1.6rem,3.2vw,3rem)] leading-tight tracking-tight">Привет, Я - Сергей, проектирую продукты.</p>
          </div>
          <div data-preview="Это я 👋" className="hero-portrait">
            <img src={withBase('/avatar-v2.jpg')} alt={site.name} width={246} height={246} className="h-full w-full object-cover" />
          </div>
          <div id="contact" className="hero-actions scroll-mt-24">
            <a data-preview="Telegram" className="hero-tile" href={site.telegram} target="_blank" rel="noreferrer">Telegram <span aria-hidden="true">↗</span></a>
            <a data-preview="Скачать CV" className="hero-tile" href={withBase(site.cv)} download>Скачать CV <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>

    </section>
  );
}
