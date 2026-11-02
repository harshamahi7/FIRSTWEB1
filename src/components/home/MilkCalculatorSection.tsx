import React, { useState } from 'react';
import { Calculator, Users, Check, Calendar, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const MilkCalculatorSection: React.FC = () => {
  const { openSubscribeModal } = useStore();
  const sectionRef = useScrollReveal();

  const [members, setMembers] = useState<number>(4);
  const [includesTea, setIncludesTea] = useState(true);
  const [includesCurd, setIncludesCurd] = useState(true);
  const [includesKids, setIncludesKids] = useState(true);

  let dailyMl = members * 250;
  if (includesTea) dailyMl += members * 100;
  if (includesCurd) dailyMl += 500;
  if (includesKids) dailyMl += 300;

  const dailyLiters = (dailyMl / 1000).toFixed(1);
  const recommendedPacks = Math.ceil(dailyMl / 500);
  const monthlyCostRetail = recommendedPacks * 29 * 30;
  const subscriberCost = Math.round(monthlyCostRetail * 0.95);
  const monthlySavings = monthlyCostRetail - subscriberCost;

  const toggles = [
    { label: 'Morning Tea & Coffee', value: includesTea, toggle: () => setIncludesTea(!includesTea) },
    { label: 'Daily Home Curd', value: includesCurd, toggle: () => setIncludesCurd(!includesCurd) },
    { label: 'Kids Glass of Milk', value: includesKids, toggle: () => setIncludesKids(!includesKids) },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal bg-gradient-to-br from-dairy-900 via-dairy-950 to-brand-navy rounded-3xl p-8 sm:p-12 text-white shadow-premium relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-dairy-500/10 blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-ocean-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left: Controls */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-cream-300 text-xs font-semibold border border-white/10">
                <Calculator className="w-3.5 h-3.5" />
                <span>Smart Family Dairy Calculator</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                How Much Milk Does Your Family Need?
              </h2>

              <p className="text-sm text-dairy-300 leading-relaxed max-w-xl">
                Answer 4 quick lifestyle questions to discover your family's exact daily dairy requirement.
              </p>

              {/* Slider */}
              <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="flex items-center gap-2 text-white">
                    <Users className="w-4 h-4 text-dairy-400" />
                    Family Members:
                  </span>
                  <span className="text-lg font-extrabold text-cream-300 bg-white/10 px-3 py-0.5 rounded-lg">
                    {members} {members === 1 ? 'Person' : 'People'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={members}
                  onChange={(e) => setMembers(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-1">
                  <span>1</span><span>4</span><span>8+</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {toggles.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={t.toggle}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      t.value
                        ? 'bg-dairy-500/20 border-dairy-400 text-white font-semibold'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <span className="text-xs">{t.label}</span>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      t.value ? 'bg-dairy-400 text-dairy-950' : 'border border-gray-500'
                    }`}>
                      {t.value && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Result Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-7 shadow-elevated space-y-4 border border-gray-100">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-dairy-700">Recommended Daily</span>
                  <span className="text-xs bg-dairy-50 text-dairy-700 font-bold px-2.5 py-0.5 rounded-full">Optimal</span>
                </div>

                <div>
                  <div className="text-3xl font-extrabold text-gray-900">{dailyLiters} Liters <span className="text-sm font-medium text-gray-400">/ day</span></div>
                  <p className="text-xs text-gray-500 mt-0.5">({recommendedPacks} × 500ml pouches daily)</p>
                </div>

                <div className="p-3.5 bg-dairy-50 rounded-xl border border-dairy-100 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Retail Price:</span>
                    <span className="line-through text-gray-400">₹{monthlyCostRetail} / mo</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-sm">
                    <span>Subscription Price:</span>
                    <span>₹{subscriberCost} / mo</span>
                  </div>
                  <div className="flex justify-between text-dairy-700 font-semibold pt-1 border-t border-dairy-200">
                    <span>Monthly Savings:</span>
                    <span>₹{monthlySavings} + Free Delivery</span>
                  </div>
                </div>

                <button
                  onClick={() => openSubscribeModal()}
                  className="w-full py-3.5 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-dairy-600/20 active:scale-98 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Subscribe This Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-gray-400 text-center font-medium">
                  Zero lock-in. Pause on holidays with 1-click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
