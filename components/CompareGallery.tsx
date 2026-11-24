'use client';

import { useRef, useState } from 'react';
import { withBase } from '@/lib/site';

const FADE_MS = 220;

/**
 * Shows the redesigned gallery by default and lets visitors switch to the old screens.
 */
export function CompareGallery({
  children,
  oldSrcs,
  oldWrapClassName,
  controlWrapClassName,
  cols,
}: {
  children: React.ReactNode;
  oldSrcs: string[];
  oldWrapClassName: string;
  controlWrapClassName?: string;
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
    for (const src of oldSrcs) {
      const img = new Image();
      img.src = src;
    }
  };

  const switchVersion = (nextShowOld: boolean) => {
    if (busy.current || nextShowOld === showOld) return;
    busy.current = true;
    preload();
    setVisible(false);
    window.setTimeout(() => {
      setShowOld(nextShowOld);
      setVisible(true);
      busy.current = false;
    }, FADE_MS);
  };

  // One column of the gallery on desktop: (100% - gaps) / cols. Gap is 1.5rem at md.
  const colWidth = `calc((100% - ${(cols - 1) * 1.5}rem) / ${cols})`;
  const leftEnabled = showOld && visible;
  const rightEnabled = !showOld && visible;
  const iconButtonClass = 'inline-flex size-11 shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-chalk-50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]';

  return (
    <div className="space-y-4">
      <div
        className="transition-opacity ease-out"
        style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
      >
        {showOld ? (
          <div
            className={`${oldWrapClassName} flex flex-col md:flex-row md:justify-center items-start gap-4 md:gap-6`}
            style={{ ['--col-w' as string]: colWidth }}
          >
            {oldSrcs.map((src, i) => (
              <div
                key={i}
                className="w-full md:w-[var(--col-w)] md:shrink-0 overflow-hidden rounded-xl bg-ink-800 border hairline"
              >
                <img src={src} alt="Старая версия" className="w-full h-auto block" />
              </div>
            ))}
          </div>
        ) : (
          children
        )}
      </div>

      <div
        className={`${controlWrapClassName ?? oldWrapClassName} flex min-h-[104px] items-center justify-center gap-2 rounded-2xl px-4 py-4 sm:gap-4 sm:px-6`}
        onPointerEnter={preload}
        onFocus={preload}
        onTouchStart={preload}
      >
        <button
          type="button"
          onClick={() => switchVersion(false)}
          disabled={!leftEnabled}
          aria-label="Показать после редизайна"
          className={iconButtonClass}
        >
          <img src={withBase(leftEnabled ? '/icons/Icon-Button-LeftON.svg' : '/icons/Icon-Button-LeftOFF.svg')} alt="" width={44} height={44} />
        </button>

        <p
          aria-live="polite"
          className="text-center text-xl font-medium tracking-tight text-chalk-50 sm:text-2xl"
        >
          {showOld ? 'До редизайна' : 'После редизайна'} <span aria-hidden="true">👆🏻</span>
        </p>

        <button
          type="button"
          onClick={() => switchVersion(true)}
          disabled={!rightEnabled}
          aria-label="Показать старую версию"
          className={iconButtonClass}
        >
          <img src={withBase(rightEnabled ? '/icons/Icon-Button-RightON.svg' : '/icons/Icon-Button-RightOFF.svg')} alt="" width={44} height={44} />
        </button>
      </div>
    </div>
  );
}




