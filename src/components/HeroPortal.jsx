import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroPortal({ onEnter }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Trap wheel for slight inertia feel on hero (no external deps)
    const el = sectionRef.current;
    if (!el) return;
    let ticking = false;
    const onWheel = (e) => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        // On strong scroll intent, move to next section
        if (Math.abs(e.deltaY) > 24) {
          onEnter?.();
        }
        ticking = false;
      });
    };
    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onEnter]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero Portal"
    >
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <p className="text-sm tracking-widest text-white/70 uppercase">Step into the world of trust and transparency</p>
          <h1 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight">
            Where Weddings Meet Assurance
          </h1>
          <p className="mt-4 text-white/80 text-lg sm:text-xl">
            Trust. Transparency. Timely Payments.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={onEnter}
              className="pointer-events-auto rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Enter
            </button>
            <span className="text-white/60 text-sm">Scroll to begin</span>
          </div>
        </div>
      </div>
    </section>
  );
}
