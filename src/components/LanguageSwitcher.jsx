import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = ({ menuPlacement = 'down' } = {}) => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const openUp = menuPlacement === 'up';

  const languages = useMemo(
    () => [
      { code: 'en', name: t('nav.langEnglish'), flag: '🇺🇸' },
      { code: 'es', name: t('nav.langSpanish'), flag: '🇪🇸' },
      { code: 'hi', name: t('nav.langHindi'), flag: '🇮🇳' },
      { code: 'kn', name: t('nav.langKannada'), flag: '🇮🇳' },
      { code: 'ar', name: t('nav.langArabic'), flag: '🇸🇦' }
    ],
    [language, t]
  );

  const current = useMemo(
    () => languages.find((l) => l.code === language) ?? languages[0],
    [languages, language]
  );

  useEffect(() => {
    const onPointerDown = (e) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target)) return;
      setOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={[
        'relative flex flex-wrap items-center gap-x-1.5 gap-y-1 min-w-0',
        open ? 'z-[100]' : 'z-auto'
      ].join(' ')}
    >
      <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase shrink-0">{t('nav.languageLabel')}:</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold bg-[color:var(--soft)] text-[color:var(--dk)] hover:bg-white border border-black/5 transition shrink-0 max-w-full"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-1">
          <span aria-hidden="true">{current.flag}</span>
          <span>{current.code.toUpperCase()}</span>
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className={[
            'absolute w-52 max-h-[min(55dvh,20rem)] overflow-y-auto overscroll-contain bg-white border border-black/5 rounded-2xl shadow-xl touch-pan-y',
            openUp ? 'left-0 bottom-full mb-2' : 'right-0 top-full mt-2'
          ].join(' ')}
        >
          {languages.map((lang) => {
            const active = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                role="menuitem"
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                }}
                className={[
                  'w-full text-start px-4 py-3 text-sm font-bold transition flex items-center gap-2',
                  active ? 'bg-[color:var(--teal)] text-white' : 'hover:bg-[color:var(--soft)] text-[color:var(--dk)]'
                ].join(' ')}
              >
                <span aria-hidden="true">{lang.flag}</span>
                <span className="flex-1">{lang.name}</span>
                <span className="text-xs opacity-80">{lang.code.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
