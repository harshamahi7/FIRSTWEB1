import React from 'react';
import { Calendar, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const MilkSubscriptionBanner: React.FC = () => {
  const { openSubscribeModal } = useStore();
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal relative rounded-3xl overflow-hidden bg-gradient-to-br from-dairy-800 via-dairy-900 to-dairy-950 text-white p-8 sm:p-12 shadow-premium">
          {/* BG effects */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-dairy-700/30 pointer-events-none" />
          <div className="absolute right-10 top-0 w-60 h-60 rounded-full bg-dairy-500/10 blur-3xl pointer-events-none" />
          <div className="absolute left-1/2 bottom-0 w-40 h-40 rounded-full bg-ocean-500/10 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-dairy-200 text-xs font-semibold border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-cream-400" />
                <span>Zero Delivery Charges • Flexible Schedule</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Subscribe to Daily Milk.{' '}
                <span className="text-dairy-300">Fresh At Sunrise.</span>
              </h2>

              <p className="text-sm sm:text-base text-dairy-300 leading-relaxed max-w-xl">
                Choose your favorite Visakha milk variant. We deliver straight to your doorstep every morning between 5:30 AM and 7:30 AM.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {['Pause or cancel anytime', '5% subscriber savings', 'Insulated chilled drop'].map((text) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-dairy-200">
                    <CheckCircle className="w-4 h-4 text-dairy-400 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={() => openSubscribeModal()}
                  className="px-7 py-3.5 rounded-xl bg-cream-400 hover:bg-cream-300 text-gray-900 font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Customize Your Subscription</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Schedule Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-dairy-300">Sample Routine</span>
                  <span className="text-[10px] bg-dairy-500/20 text-dairy-300 font-bold px-2 py-0.5 rounded-full">Active</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=200&q=80"
                    alt="Milk pouch"
                    className="w-14 h-14 rounded-xl object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">Visakha Toned Milk (500 ml)</h4>
                    <p className="text-xs text-dairy-300">2 Pouches Daily • 5:30 AM</p>
                    <span className="text-xs font-bold text-cream-300">₹1,740 / month</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-3 text-xs space-y-1.5 border border-white/10">
                  {[
                    ['Morning Window:', '05:30 – 07:30 AM'],
                    ['Frequency:', 'All 7 Days'],
                    ['Delivery Fee:', '₹0 (FREE)'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-dairy-200">
                      <span>{label}</span>
                      <span className="font-bold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
