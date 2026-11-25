import { projects } from '@/lib/projects';
import { withBase } from '@/lib/site';

export function ProjectsGrid() {
  return (
    <section id="projects" className="relative px-[max(16px,3.5%)] py-24 md:py-32">
      <div className="mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-20">
          <div>
            <h2 className="font-display font-medium leading-none tracking-tightest text-[clamp(2rem,5vw,4.5rem)]">
              Работа
            </h2>
          </div>
          <p className="md:max-w-sm text-[20px] leading-snug text-white">
            Мобильные и веб-продукты, в которых я отвечал за исследование, проектирование и финальный UI.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, idx) => (
            <li key={p.slug} className="group min-w-0">
              <a href={withBase(`/projects/${p.slug}/`)} className="project-panel">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-800">
                  {p.cardImage ? (
                    <img src={withBase(p.cardImage)} alt={p.title} loading="lazy" className="card-img absolute inset-0 h-full w-full object-contain" />
                  ) : <PlaceholderCard title={p.title} />}
                </div>
                <div className="flex flex-1 flex-col gap-3 px-2 pt-5 pb-2 md:px-4">
                  <div className="flex justify-between gap-3 font-display font-medium text-xs text-chalk-300">
                    <span>{String(idx + 1).padStart(2, '0')}</span>
                    <span>{p.year}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">{p.title}</h3>
                    <span aria-hidden="true" className="project-arrow">↗</span>
                  </div>
                  <p className="max-w-prose text-sm text-chalk-100">{p.tagline}</p>
                  <p className="mt-auto pt-3 font-display font-medium text-xs text-chalk-300">
                    {[p.role, p.company, p.platforms.join(' / ')].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </a>
            </li>
          ))}
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
