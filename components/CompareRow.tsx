'use client';

import { useState } from 'react';

/**
 * A row of screens that flips between the new design and its old version on click.
 * Both images sit in the same grid cell and cross-fade, so the layout never jumps.
 */
export function CompareRow({
  newSrcs,
  oldSrcs,
  gridClassName,
}: {
  newSrcs: string[];
  oldSrcs: string[];
  gridClassName: string;
}) {
  const [showOld, setShowOld] = useState(false);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setShowOld((v) => !v)}
        aria-pressed={showOld}
        aria-label={showOld ? 'Показать новую версию' : 'Показать старую версию'}
        className={`${gridClassName} w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-chalk-50/60 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-xl`}
      >
        {newSrcs.map((src, i) => (
          <div
            key={i}
            className="grid overflow-hidden rounded-xl bg-ink-800 border hairline transition-transform duration-300 ease-out hover:-translate-y-0.5"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className={`[grid-area:1/1] w-full h-auto block transition-opacity duration-500 ease-out ${
                showOld ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <img
              src={oldSrcs[i]}
              alt=""
              loading="lazy"
              className={`[grid-area:1/1] w-full h-auto block transition-opacity duration-500 ease-out ${
                showOld ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        ))}
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
