import Link from 'next/link';
import { site } from '@/lib/site';

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-chalk-50">
      <div className="mx-auto max-w-page px-6 md:px-10 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5"
          aria-label="На главную — RudakovSA"
        >
          <span
            aria-hidden
            className="inline-flex items-center justify-center w-7 h-7 rounded-[6px] border border-chalk-50/60 font-mono text-[12px] font-medium leading-none transition-all duration-300 ease-soft group-hover:bg-chalk-50 group-hover:text-ink-900"
          >
            R
          </span>
          <span className="font-mono text-[12px] uppercase tracking-[0.22em] font-medium">
            Rudakov<span className="text-chalk-300">SA</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link href="/#projects" className="underline-grow opacity-80 hover:opacity-100">
            Проекты
          </Link>
          <Link href="/#about" className="underline-grow opacity-80 hover:opacity-100">
            Обо&nbsp;мне
          </Link>
          <Link href="/#contact" className="underline-grow opacity-80 hover:opacity-100">
            Контакты
          </Link>
        </nav>
        <a
          href={site.telegram}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium underline-grow"
        >
          Написать в Telegram →
        </a>
      </div>
    </header>
  );
}
