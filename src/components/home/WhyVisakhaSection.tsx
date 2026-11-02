import React from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const WhyVisakhaSection: React.FC = () => {
  const { setActivePage } = useStore();
  const sectionRef = useScrollReveal();

  const comparisonRows = [
    {
      feature: 'Adulteration & Chemical Testing',
      visakha: '32 automated lab tests at 4 stages (zero urea, detergent, or neutralizers)',
      others: 'Untested or superficial tests with high adulteration risk',
    },
    {
      feature: 'Cold-Chain Maintenance',
      visakha: 'Chilled below 4°C within 45 mins of milking; insulated tankers to doorstep',
      others: 'Transported at ambient temperature in open cans for hours',
    },
    {
      feature: 'Hygiene & Packaging',
      visakha: '100% untouched by hand; sterile automated CIP pouch filling',
      others: 'Manual hand bottling, exposed to airborne bacteria',
    },
    {
      feature: 'Farmer Share & Fairness',
      visakha: '80%+ of consumer rupee goes to 3.5 Lakh+ cooperative dairy farmers',
      others: 'Middlemen siphon margins; farmers underpaid',
    },
    {
      feature: 'Social Welfare',
      visakha: 'Free rural hospitals, schools, and colleges for farming families',
      others: 'No community healthcare infrastructure',
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="reveal text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-dairy-700 bg-dairy-50 px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-dairy-600" />
            <span>The Gold Standard</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Why Visakha Dairy <span className="text-gradient">Stands Apart</span>
          </h2>
          <p className="text-sm text-gray-500">
            Compare our scientific process with unorganized loose milk and commercial brands.
          </p>
        </div>

        <div className="reveal bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="p-5 font-bold text-gray-400 uppercase tracking-wider text-xs w-1/3">Dimension</th>
                  <th className="p-5 font-bold text-dairy-800 bg-dairy-50/60 border-x border-dairy-100 text-sm w-1/3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-dairy-600 text-white flex items-center justify-center text-xs">✓</div>
                      <span>Visakha Dairy</span>
                    </div>
                  </th>
                  <th className="p-5 font-semibold text-gray-400 uppercase tracking-wider text-xs w-1/3">Loose / Local</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 font-semibold text-gray-800">{row.feature}</td>
                    <td className="p-5 bg-dairy-50/30 border-x border-dairy-100 text-dairy-800 font-medium">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-dairy-600 flex-shrink-0 mt-0.5" />
                        <span>{row.visakha}</span>
                      </div>
                    </td>
                    <td className="p-5 text-gray-400">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="reveal bg-gradient-to-r from-dairy-700 to-dairy-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-elevated">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold">Experience Pure Visakha Milk</h3>
            <p className="text-xs text-dairy-200">Trusted by 10+ Lakh Telugu homes since 1973.</p>
          </div>
          <button
            onClick={() => setActivePage('products')}
            className="px-6 py-3 rounded-xl bg-white text-dairy-800 font-bold text-sm hover:bg-dairy-50 transition-all shadow-md active:scale-95 flex-shrink-0"
          >
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};
