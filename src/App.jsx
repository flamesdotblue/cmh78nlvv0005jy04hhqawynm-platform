import { useRef } from 'react';
import HeroPortal from './components/HeroPortal';
import ChaosBefore from './components/ChaosBefore';
import Transformation from './components/Transformation';
import FlowVisualization from './components/FlowVisualization';

export default function App() {
  const chaosRef = useRef(null);
  const transformRef = useRef(null);
  const flowRef = useRef(null);

  const scrollTo = (ref) => {
    if (!ref?.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-black text-white min-h-screen font-inter selection:bg-white/10 selection:text-white">
      <HeroPortal onEnter={() => scrollTo(chaosRef)} />

      <section ref={chaosRef} className="relative min-h-screen overflow-hidden">
        <ChaosBefore onContinue={() => scrollTo(transformRef)} />
      </section>

      <section ref={transformRef} className="relative min-h-screen overflow-hidden">
        <Transformation onContinue={() => scrollTo(flowRef)} />
      </section>

      <section ref={flowRef} className="relative min-h-screen overflow-hidden">
        <FlowVisualization />
      </section>

      <footer className="relative py-10 text-center text-sm text-white/60">
        <div className="max-w-6xl mx-auto px-6">
          © {new Date().getFullYear()} WedTrust — Where Weddings Meet Assurance
        </div>
      </footer>
    </div>
  );
}
