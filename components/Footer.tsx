import { site } from '@/lib/site';

export function Footer({ wide = false }: { wide?: boolean }) {
  return (
    <footer className={`border-t hairline py-10 ${wide ? 'px-[max(16px,3.5%)]' : 'px-6 md:px-10'}`}>
      <div className={`mx-auto text-xs font-display font-medium uppercase tracking-wider text-chalk-300 ${wide ? 'w-full' : 'max-w-page'}`}>
        <p>© {new Date().getFullYear()} {site.name}. Все права защищены.</p>
      </div>
    </footer>
  );
}
