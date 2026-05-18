import Link from 'next/link';
import { projects } from '@/lib/projects';
import { withBase } from '@/lib/site';

export function ProjectsGrid() {
  return (
    <section id="projects" className="relative px-6 md:px-10 py-24 md:py-40">
      <div className="mx-auto max-w-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-chalk-300 mb-4">
              Избранные проекты · {String(projects.length).padStart(2, '0')}
            </p>
            <h2 className="font-display font-medium leading-none tracking-tightest text-[clamp(2rem,5vw,4.5rem)]">
              Работа
            </h2>
          </div>
          <p className="md:max-w-sm text-[20px] leading-snug text-white">
            Мобильные и веб-продукты, в которых я отвечал за исследование, проектирование и финальный UI.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, idx) => {
            return (
              <li key={p.slug} className="group">
                <Link href={`/projects/${p.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-2xl bg-ink-800 hairline border aspect-[4/3]">
                    {p.cardImage ? (
                      <img
                        src={withBase(p.cardImage)}
                        alt={p.title}
                        loading="lazy"
                        className="card-img absolute inset-0 w-full h-full object-contain"
                      />
                    ) : (
                      <PlaceholderCard title={p.title} />
                    )}
                    {/* Soft top + bottom shading so the meta text stays readable, image stays clean in the middle. */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink-900/70 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900/90 to-transparent" />
                    <div className="absolute top-4 left-5 right-5 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-chalk-100/80">
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                      <span>{p.year}</span>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl md:text-3xl font-medium leading-none tracking-tight">
                            {p.title}
                          </h3>
                          <p className="mt-2 text-sm text-chalk-100/80 max-w-md line-clamp-2">
                            {p.tagline}
                          </p>
                        </div>
                        <span
                          aria-hidden
                          className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-chalk-50/30 text-chalk-50 transition-all duration-500 ease-soft group-hover:bg-chalk-50 group-hover:text-ink-900 group-hover:rotate-45"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-chalk-300">
                    <span>{p.role}</span>
                    {p.company && <span className="text-chalk-500">·</span>}
                    {p.company && <span>{p.company}</span>}
                    <span className="text-chalk-500">·</span>
                    <span>{p.platforms.join(' / ')}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function PlaceholderCard({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink-700 to-ink-900">
      <span className="font-display text-7xl md:text-8xl font-medium text-chalk-50/10 tracking-tight">
        {title}
      </span>
    </div>
  );
}
