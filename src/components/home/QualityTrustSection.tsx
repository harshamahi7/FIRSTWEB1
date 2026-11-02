import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Truck,
  Award,
  Microscope,
  Leaf,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const QualityTrustSection: React.FC = () => {
  const { setActivePage } = useStore();
  const sectionRef = useScrollReveal();

  const qualityPillars = [
    {
      icon: Microscope,
      title: 'Multi-Stage Lab Testing',
      desc: 'Tested at village centers and plant labs for fat, SNF, adulterants, and zero antibiotics.',
      metric: '32 Quality Tests',
      color: 'bg-dairy-50 text-dairy-600',
    },
    {
      icon: ShieldCheck,
      title: 'Food Safety & Hygiene',
      desc: 'Processed in sterile environments with automated CIP sanitation. Zero hand contact.',
      metric: '100% Sterile',
      color: 'bg-ocean-50 text-ocean-600',
    },
    {
      icon: Cpu,
      title: 'SCADA Automation',
      desc: 'High-speed automated pasteurization and homogenisation at Akkireddipalem and Rangampeta.',
      metric: 'Fully Automated',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: Truck,
      title: 'Unbroken Cold Chain',
      desc: 'From farm chilling centers to insulated road tankers — maintained below 4°C throughout.',
      metric: '4°C Controlled',
      color: 'bg-cyan-50 text-cyan-600',
    },
    {
      icon: Leaf,
      title: 'Farmer & Animal Care',
      desc: 'Veterinary checkups, vaccination drives, cattle feed subsidies, and clean milking guidance.',
      metric: '3.5 Lakh Farmers',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: Award,
      title: 'Certified Facilities',
      desc: 'ISO 22000:2018 Food Safety and Central FSSAI License No. 10012044000165.',
      metric: 'ISO 22000:2018',
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-dairy-700 uppercase tracking-wider mb-3 bg-dairy-50 px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-dairy-600" />
            <span>Guaranteed Purity</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Quality You Can <span className="text-gradient">Trust</span>
          </h2>
          <p className="text-base text-gray-500 mt-3">
            Every drop passes rigorous scientific testing so your family gets nothing less than wholesome goodness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {qualityPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`reveal delay-${Math.min(idx * 100, 500)} group bg-white rounded-2xl p-6 border border-gray-100 hover:border-dairy-200 shadow-card hover:shadow-card-hover card-lift`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-dairy-700 bg-dairy-50 px-2.5 py-1 rounded-full">{item.metric}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-dairy-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Visakha Assured</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal mt-12 text-center">
          <button
            onClick={() => setActivePage('quality')}
            className="text-sm font-bold text-dairy-600 hover:text-dairy-700 inline-flex items-center gap-1.5 group"
          >
            <span>Learn more about our dairy plants & testing</span>
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
