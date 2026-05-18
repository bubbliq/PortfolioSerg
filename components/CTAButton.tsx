import Link from 'next/link';
import { withBase } from '@/lib/site';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  className?: string;
};

const base =
  'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium transition-all duration-300 ease-soft';

const styles: Record<Variant, string> = {
  primary:
    'bg-chalk-50 text-ink-900 hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(247,247,245,0.18)]',
  secondary:
    'border border-chalk-50/20 text-chalk-50 hover:border-chalk-50/60 hover:-translate-y-0.5',
  ghost: 'text-chalk-50 hover:text-white',
};

export function CTAButton({ href, children, variant = 'primary', external, download, className = '' }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (external || download) {
    return (
      <a
        href={withBase(href)}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        download={download ? '' : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
