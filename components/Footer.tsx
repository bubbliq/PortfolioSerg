import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t hairline px-6 md:px-10 py-10">
      <div className="mx-auto max-w-page text-xs font-mono uppercase tracking-wider text-chalk-300">
        <p>© {new Date().getFullYear()} {site.name}. Все права защищены.</p>
      </div>
    </footer>
  );
}
