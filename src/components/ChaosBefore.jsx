import { useEffect, useState } from 'react';

function useParallax(speed = 0.2) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(window.scrollY * speed));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [speed]);
  return offset;
}

export default function ChaosBefore({ onContinue }) {
  const layer1 = useParallax(0.12);
  const layer2 = useParallax(0.18);
  const layer3 = useParallax(0.24);

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-20 -left-10 h-72 w-72 rounded-full bg-pink-500/30 blur-3xl" style={{ transform: `translateY(${layer1 * -0.2}px)` }} />
        <div className="absolute top-1/3 -right-10 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" style={{ transform: `translateY(${layer2 * -0.2}px)` }} />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-amber-400/30 blur-3xl" style={{ transform: `translateY(${layer3 * -0.2}px)` }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <h2 className="text-3xl sm:text-5xl font-semibold leading-tight">
            Weddings are beautiful. Managing them is messy.
          </h2>
          <p className="text-white/80 text-lg">
            Contracts break. Payments delay. Trust disappears.
          </p>
          <p className="text-white/70">
            Before the promise, there’s chaos — refunds, disputes, and late payouts.
          </p>
          <button
            onClick={onContinue}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-5 py-3 text-sm hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            See the transformation
          </button>
        </div>

        <div className="relative h-[420px]">
          <FloatingCard style={{ transform: `translateY(${layer1 * 0.15}px)` }} title="Refund Argument" desc="Anxious couple arguing over a missing refund" emoji="😠" x="10%" y="10%" />
          <FloatingCard style={{ transform: `translateY(${layer2 * 0.25}px)` }} title="Pending Payout" desc="Vendor waiting days for money" emoji="⏳" x="55%" y="35%" />
          <FloatingCard style={{ transform: `translateY(${layer3 * 0.35}px)` }} title="Broken Contract" desc="PDFs drifting into the void" emoji="📄" x="30%" y="65%" />
        </div>
      </div>
    </div>
  );
}

function FloatingCard({ title, desc, emoji, x, y, style }) {
  return (
    <div
      className="absolute w-60 rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-4 shadow-2xl"
      style={{ left: x, top: y, ...style }}
    >
      <div className="text-2xl">{emoji}</div>
      <div className="mt-2 font-medium">{title}</div>
      <div className="text-sm text-white/70">{desc}</div>
    </div>
  );
}
