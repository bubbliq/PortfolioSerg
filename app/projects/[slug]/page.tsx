import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject, type ProjectSection } from '@/lib/projects';
import { site, withBase } from '@/lib/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CTAButton } from '@/components/CTAButton';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${site.name}`,
    description: p.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main>
      <Header />

      {/* Case hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-10">
        <div className="mx-auto max-w-page">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-chalk-300 underline-grow"
          >
            <span aria-hidden>←</span> Все проекты
          </Link>

          <h1 className="mt-10 font-display font-medium leading-[0.95] tracking-tightest text-[clamp(2.5rem,7vw,7rem)] max-w-[14ch]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-prose text-lg md:text-xl text-chalk-100">
            {project.tagline}
          </p>

          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 pt-8 border-t hairline">
            <Meta label="Год">{project.year}</Meta>
            <Meta label="Роль">{project.role}</Meta>
            {project.company && <Meta label="Компания">{project.company}</Meta>}
            <Meta label="Платформы">{project.platforms.join(' / ')}</Meta>
            <Meta label="Инструменты">{project.tools.join(', ')}</Meta>
          </dl>
        </div>
      </section>

      {/* Cover image — default 320px (mobile-screen size), per-project override via coverWidth */}
      {project.cover && (
        <div className="px-6 md:px-10">
          <div className="mx-auto" style={{ maxWidth: project.coverWidth ?? 320 }}>
            <div className="overflow-hidden rounded-2xl bg-ink-800 hairline border">
              <img
                src={withBase(project.cover)}
                alt={`${project.title} — обложка`}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      <article className="px-6 md:px-10 py-20 md:py-32">
        <div className="mx-auto max-w-page space-y-20 md:space-y-32">
          {project.sections.map((section, i) => (
            <SectionBlock key={i} section={section} index={i} />
          ))}
        </div>
      </article>

      {/* Outcome */}
      {project.outcome && (
        <section className="px-6 md:px-10 pb-24 md:pb-32">
          <div className="mx-auto max-w-page">
            <div className="rounded-2xl border hairline p-8 md:p-12 bg-ink-800/50">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-chalk-300 mb-4">
                Результат
              </p>
              <p className="font-display text-2xl md:text-3xl leading-snug max-w-prose">
                {project.outcome}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTAs duplicated on project pages too — both Telegram and CV */}
      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="mx-auto max-w-page text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-chalk-300 mb-6">
            Понравилось?
          </p>
          <h2 className="font-display font-medium leading-[1] tracking-tightest text-[clamp(2rem,5vw,4rem)] mb-10">
            Обсудим ваш проект.
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <CTAButton href={site.telegram} variant="primary" external>
              Telegram <span aria-hidden>↗</span>
            </CTAButton>
            <CTAButton href={site.cv} variant="secondary" external download>
              Скачать CV <span aria-hidden>↓</span>
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t hairline px-6 md:px-10 py-16 md:py-24">
        <div className="mx-auto max-w-page">
          <Link href={`/projects/${next.slug}`} className="group block">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-chalk-300 mb-3">
              Следующий проект
            </p>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h3 className="font-display font-medium leading-none tracking-tightest text-[clamp(2.25rem,6vw,5.5rem)] group-hover:text-chalk-100 transition">
                {next.title}
              </h3>
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-chalk-50/30 text-chalk-50 group-hover:bg-chalk-50 group-hover:text-ink-900 group-hover:rotate-45 transition-all duration-500 ease-soft"
              >
                →
              </span>
            </div>
            <p className="mt-3 text-chalk-300 max-w-prose">{next.tagline}</p>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-wider text-chalk-300 mb-2">
        {label}
      </dt>
      <dd className="text-sm md:text-base text-chalk-100">{children}</dd>
    </div>
  );
}

function SectionBlock({ section, index }: { section: ProjectSection; index: number }) {
  if (section.kind === 'gallery') {
    // --- Rows-mode: explicit groupings, equal columns per row, natural aspect (no crop) ---
    if (section.rows && section.rows.length > 0) {
      return (
        <div className="space-y-6 md:space-y-8">
          {section.rows.map((row, ri) => (
            <div
              key={ri}
              className={`mx-auto grid grid-cols-1 gap-4 md:gap-6 items-start ${rowColsClass(row.length)} ${rowMaxWidth(row.length)}`}
            >
              {row.map((src, ci) => (
                <div
                  key={ci}
                  className="overflow-hidden rounded-xl bg-ink-800 border hairline"
                >
                  <img
                    src={withBase(src)}
                    alt=""
                    loading="lazy"
                    className="w-full h-auto block"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    // --- Fit-mode: stack at natural aspect, no crop. maxWidth optional (default 768) ---
    if (section.layout === 'fit' && section.images) {
      return (
        <div
          className="mx-auto space-y-6 md:space-y-8"
          style={{ maxWidth: section.maxWidth ?? 768 }}
        >
          {section.images.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl bg-ink-800 border hairline"
            >
              <img
                src={withBase(img.src)}
                alt={img.alt || ''}
                loading="lazy"
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>
      );
    }

    // --- Legacy: per-image aspect in 12-col grid (kept for View), natural aspect, no crop ---
    const images = section.images ?? [];
    return (
      <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
        {images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl bg-ink-800 border hairline"
          >
            <img
              src={withBase(img.src)}
              alt={img.alt || ''}
              loading="lazy"
              className="w-full h-auto block"
            />
          </div>
        ))}
      </div>
    );
  }

  if (section.kind === 'tools') {
    return (
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          {section.title && <SectionLabel index={index}>{section.title}</SectionLabel>}
        </div>
        <div className="md:col-span-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {section.items.map((tool, i) => (
              <div key={i} className="rounded-2xl border hairline p-7 bg-ink-800/40">
                <div className="w-12 h-12 rounded-xl bg-ink-700 border hairline flex items-center justify-center mb-5">
                  <img
                    src={withBase(tool.logo)}
                    alt={tool.name}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-chalk-300 mb-2">
                  {tool.name}
                </p>
                <p className="text-base leading-snug text-chalk-100">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (section.kind === 'hypotheses') {
    return (
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <SectionLabel index={index}>{section.title ?? 'Гипотезы'}</SectionLabel>
        </div>
        <div className="md:col-span-8">
          <ul className="border-t border-b hairline divide-y divide-[var(--hairline)]">
            {section.items.map((h, i) => (
              <li key={i} className="py-6 grid md:grid-cols-12 gap-4">
                <span className="md:col-span-1 font-mono text-xs text-chalk-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="md:col-span-7 text-base md:text-lg leading-snug">{h.hypothesis}</p>
                <span className="md:col-span-2 font-mono text-xs uppercase tracking-wider text-chalk-100">
                  {h.result}
                </span>
                <p className="md:col-span-2 text-sm text-chalk-300">{h.insight}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (section.kind === 'list') {
    return (
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          {section.title && <SectionLabel index={index}>{section.title}</SectionLabel>}
        </div>
        <div className="md:col-span-8">
          <ul className="space-y-4">
            {section.items.map((item, i) => (
              <li key={i} className="flex gap-4 text-lg md:text-xl leading-snug border-b hairline pb-4 last:border-b-0">
                <span className="font-mono text-xs text-chalk-300 pt-2 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (section.kind === 'quote') {
    return (
      <blockquote className="max-w-4xl mx-auto text-center">
        <p className="font-display text-3xl md:text-5xl leading-tight italic text-chalk-100">
          «{section.text}»
        </p>
        {section.author && (
          <footer className="mt-6 font-mono text-xs uppercase tracking-wider text-chalk-300">
            — {section.author}
          </footer>
        )}
      </blockquote>
    );
  }

  // text
  return (
    <div className="grid md:grid-cols-12 gap-8">
      <div className="md:col-span-4">
        {section.title && <SectionLabel index={index}>{section.title}</SectionLabel>}
      </div>
      <div className="md:col-span-8 space-y-5 max-w-prose">
        {section.body.map((p, i) => (
          <p key={i} className="text-lg md:text-xl leading-snug text-chalk-100">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

// Tailwind JIT needs literal class names — keep these maps exhaustive so all variants ship.
function rowColsClass(n: number): string {
  switch (n) {
    case 1: return 'md:grid-cols-1';
    case 2: return 'md:grid-cols-2';
    case 3: return 'md:grid-cols-3';
    case 4: return 'md:grid-cols-4';
    case 5: return 'md:grid-cols-5';
    case 6: return 'md:grid-cols-6';
    default: return 'md:grid-cols-3';
  }
}

// Per-row max-width. Each item lands at ~155–320px wide so a phone screenshot
// stays a phone screenshot — not a wall.
function rowMaxWidth(n: number): string {
  switch (n) {
    case 1: return 'max-w-xs';   // 320px  → single screen ~320×570
    case 2: return 'max-w-2xl';  // 672px  → each ~316×562
    case 3: return 'max-w-3xl';  // 768px  → each ~240×427
    case 4: return 'max-w-4xl';  // 896px  → each ~206×366
    case 5: return 'max-w-4xl';  // 896px  → each ~163×290
    case 6: return 'max-w-5xl';  // 1024px → each ~155×275
    default: return 'max-w-4xl';
  }
}

function SectionLabel({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-300 mb-3">
        — {String(index + 1).padStart(2, '0')}
      </p>
      <h2 className="font-display text-2xl md:text-3xl font-medium leading-tight tracking-tight">
        {children}
      </h2>
    </div>
  );
}
