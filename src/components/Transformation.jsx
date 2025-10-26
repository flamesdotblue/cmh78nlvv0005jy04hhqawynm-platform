import { useEffect, useRef, useState } from 'react';

export default function Transformation({ onContinue }) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-3xl sm:text-5xl font-semibold leading-tight">
            We built a platform that redefines trust
          </h3>
          <p className="mt-4 text-white/80 text-lg">
            Digital Contracts. Escrow Protection. Instant Resolution.
          </p>
          <button
            onClick={onContinue}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-medium hover:bg-white/90 transition focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Explore the flow
          </button>
        </div>

        <div className="relative w-full">
          <ContractBuilder animate={inView} />
        </div>
      </div>
    </div>
  );
}

function ContractBuilder({ animate }) {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-2xl">
      <div className="text-sm text-white/70">Smart Contract</div>
      <div className="mt-3 space-y-3">
        <Row label="Couple" value="Aarav & Meera" ready={animate} delay={0.1} />
        <Row label="Vendor" value="Lumiere Photography" ready={animate} delay={0.2} />
        <Row label="Service" value="Wedding Shoot" ready={animate} delay={0.3} />
        <Row label="Milestone 1" value="Booking — ₹50,000" ready={animate} delay={0.4} />
        <Row label="Milestone 2" value="Delivery — ₹75,000" ready={animate} delay={0.5} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Pill text="OTP Sign" ready={animate} delay={0.55} />
        <Pill text="Escrow Lock" ready={animate} delay={0.65} />
        <Pill text="Auto-Release" ready={animate} delay={0.75} />
      </div>
      <Vault ready={animate} />
    </div>
  );
}

function Row({ label, value, ready, delay = 0 }) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-all ${
        ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      style={{ transitionDuration: '600ms', transitionDelay: `${Math.round(delay * 1000)}ms` }}
    >
      <span className="text-white/60 text-sm">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

function Pill({ text, ready, delay = 0 }) {
  return (
    <div
      className={`rounded-full text-center text-xs px-3 py-2 border border-emerald-300/30 bg-emerald-500/10 text-emerald-200 transition-all ${
        ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      style={{ transitionDuration: '600ms', transitionDelay: `${Math.round(delay * 1000)}ms` }}
    >
      {text}
    </div>
  );
}

function Vault({ ready }) {
  return (
    <div className="mt-8 relative h-28">
      <div className="absolute inset-0 rounded-2xl border border-amber-300/20 bg-amber-400/10" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex items-center gap-2 text-amber-200">
          <span className={`transition-transform ${ready ? 'scale-100' : 'scale-0'}`} style={{ transitionDuration: '600ms', transitionDelay: '650ms' }}>🪙</span>
          <span className={`transition-transform ${ready ? 'scale-100' : 'scale-0'}`} style={{ transitionDuration: '600ms', transitionDelay: '750ms' }}>🪙</span>
          <span className={`transition-transform ${ready ? 'scale-100' : 'scale-0'}`} style={{ transitionDuration: '600ms', transitionDelay: '850ms' }}>🪙</span>
        </div>
      </div>
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-300/20 px-3 py-1 text-xs text-amber-200 border border-amber-300/30">
        Escrow Vault Locked
      </div>
    </div>
  );
}
