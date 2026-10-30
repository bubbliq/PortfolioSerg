'use client';

import { useRef, useState } from 'react';

const FADE_MS = 220;

/**
 * Wraps a gallery of new screens. Clicking it swaps the whole gallery for a single
 * "old version" screen (sized like one column of the gallery), and back again.
 */
export function CompareGallery({
  children,
  oldSrc,
  oldWrapClassName,
  cols,
}: {
  children: React.ReactNode;
  oldSrc: string;
  oldWrapClassName: string;
  cols: number;
}) {
  const [showOld, setShowOld] = useState(false);
  const [visible, setVisible] = useState(true);
  const busy = useRef(false);
  const preloaded = useRef(false);

  // Warm the old screenshot as soon as the visitor shows intent, so the swap is instant.
  const preload = () => {
    if (preloaded.current) return;
    preloaded.current = true;
    const img = new Image();
    img.src = oldSrc;
  };

  const toggle = () => {
    if (busy.current) return;
    busy.current = true;
    preload();
    setVisible(false);
    window.setTimeout(() => {
      setShowOld((v) => !v);
      setVisible(true);
      busy.current = false;
    }, FADE_MS);
  };

  // One column of the gallery on desktop: (100% - gaps) / cols. Gap is 1.5rem at md.
  const colWidth = `calc((100% - ${(cols - 1) * 1.5}rem) / ${cols})`;

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={toggle}
        onPointerEnter={preload}
        onFocus={preload}
        onTouchStart={preload}
        aria-pressed={showOld}
        aria-label={showOld ? 'Показать новую версию' : 'Показать старую версию'}
        className="block w-full cursor-pointer text-left rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-chalk-50/60 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-900"
      >
        <div
          className="transition-opacity ease-out"
          style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
        >
          {showOld ? (
            <div className={oldWrapClassName}>
              <div
                className="mx-auto w-full md:w-[var(--col-w)] overflow-hidden rounded-xl bg-ink-800 border hairline"
                style={{ ['--col-w' as string]: colWidth }}
              >
                <img src={oldSrc} alt="Старая версия" className="w-full h-auto block" />
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </button>

      <p
        aria-live="polite"
        className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider text-chalk-300 select-none"
      >
        <span aria-hidden>↻</span>
        {showOld
          ? 'Старая версия · Нажми, чтобы вернуться к новой'
          : 'Нажми, чтобы посмотреть старую версию'}
      </p>
    </div>
  );
}
