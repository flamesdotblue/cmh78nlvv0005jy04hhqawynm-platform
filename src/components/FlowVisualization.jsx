import { useMemo, useRef } from 'react';

export default function FlowVisualization() {
  const scrollerRef = useRef(null);

  const steps = useMemo(
    () => [
      {
        title: 'Select Vendor',
        desc: 'Couple chooses a trusted vendor from the network',
        tag: 'Couple',
        color: 'from-pink-500/20 to-rose-500/20',
      },
      {
        title: 'Contract Auto-Builds',
        desc: 'Smart contract with milestones and deliverables',
        tag: 'Platform',
        color: 'from-indigo-500/20 to-violet-500/20',
      },
      {
        title: 'OTP Signing',
        desc: 'Both parties sign with secure OTP-based flow',
        tag: 'Security',
        color: 'from-blue-500/20 to-cyan-500/20',
      },
      {
        title: 'Payment in Escrow',
        desc: 'Funds are locked safely until delivery',
        tag: 'Escrow',
        color: 'from-amber-500/20 to-yellow-500/20',
      },
      {
        title: 'Proof Uploaded',
        desc: 'Vendor submits proofs and deliverables on time',
        tag: 'Vendor',
        color: 'from-emerald-500/20 to-green-500/20',
      },
      {
        title: 'Auto-Release or Mediation',
        desc: 'Money auto-releases or a structured mediation starts',
        tag: 'Outcome',
        color: 'from-teal-500/20 to-emerald-500/20',
      },
    ],
    []
  );

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16">
        <h4 className="text-2xl sm:text-4xl font-semibold">The Flow — Scroll Sideways</h4>
        <p className="mt-2 text-white/70 max-w-2xl">
          Follow the journey from selection to trust. Use your trackpad or shift+wheel to scroll horizontally.
        </p>
      </div>

      <div className="relative z-10 mt-8 overflow-x-auto overflow-y-hidden" ref={scrollerRef}>
        <div className="flex items-stretch gap-6 px-6 pb-10 min-w-max">
          {steps.map((s, i) => (
            <StepCard key={i} index={i + 1} {...s} />
          ))}

          <CTA />
        </div>
      </div>
    </div>
  );
}

function StepCard({ index, title, desc, tag, color }) {
  return (
    <div className="group relative w-[320px] shrink-0">
      <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br ${color} opacity-60 blur-xl group-hover:opacity-80 transition`} />
      <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 h-full flex flex-col">
        <div className="text-white/60 text-xs">Step {index}</div>
        <div className="mt-2 text-xl font-medium">{title}</div>
        <div className="mt-2 text-white/70 text-sm flex-1">{desc}</div>
        <div className="mt-4 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">{tag}</div>
      </div>
    </div>
  );
}

function CTA() {
  const onCouple = () => alert('Early Access for Couples — coming soon');
  const onVendor = () => alert('Vendor Onboarding — coming soon');

  return (
    <div className="relative w-[340px] shrink-0">
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 blur-xl" />
      <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.06] backdrop-blur p-6 h-full flex flex-col items-start justify-center">
        <div className="text-sm tracking-wider text-white/70 uppercase">Exit Portal</div>
        <div className="mt-2 text-2xl font-semibold">Step into the new world of weddings</div>
        <div className="mt-4 flex flex-col gap-3 w-full">
          <button onClick={onCouple} className="rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition focus:outline-none focus:ring-2 focus:ring-white/40">
            I’m a Couple — Get Early Access
          </button>
          <button onClick={onVendor} className="rounded-full bg-white/10 text-white px-4 py-2 text-sm font-medium border border-white/15 hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-white/30">
            I’m a Vendor — Join the Platform
          </button>
        </div>
      </div>
    </div>
  );
}
