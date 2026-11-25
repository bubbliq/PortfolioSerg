import Link from 'next/link';
import { site } from '@/lib/site';

export function Header({ wide = false }: { wide?: boolean }) {
  return (
    <header className={`fixed top-0 inset-x-0 z-50 ${wide ? 'text-white' : 'mix-blend-difference text-chalk-50'}`}>
      <div className={`mx-auto py-5 flex items-center justify-between ${wide ? 'px-[max(16px,3.5%)]' : 'max-w-page px-6 md:px-10'}`}>
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="На главную — RudakovSA"
        >
          <span className="font-display text-[12px] uppercase tracking-[0.22em] font-bold">
            Rudakov<span className={wide ? undefined : 'text-chalk-300'}>SA</span>
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
