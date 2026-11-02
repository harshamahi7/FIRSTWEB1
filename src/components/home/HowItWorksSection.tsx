import React from 'react';
import { Smartphone, Package, Truck, Sun, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const HowItWorksSection: React.FC = () => {
  const { setActivePage, openSubscribeModal } = useStore();
  const sectionRef = useScrollReveal();

  const steps = [
    {
      step: '01',
      icon: Smartphone,
      title: 'Choose Your Dairy',
      desc: 'Browse our range of fresh milk, curd, ghee, paneer, and 25+ dairy products. Pick your favourites.',
      color: 'bg-dairy-50 text-dairy-600',
      accent: 'border-dairy-200',
    },
    {
      step: '02',
      icon: Package,
      title: 'We Pack Fresh',
      desc: 'Your order is processed at our ISO-certified dairy plants in Akkireddipalem and Rangampeta. Lab-tested and sealed.',
      color: 'bg-ocean-50 text-ocean-600',
      accent: 'border-ocean-200',
    },
    {
      step: '03',
      icon: Truck,
      title: 'Cold-Chain Dispatch',
      desc: 'Insulated refrigerated vehicles maintain below 4°C from plant to your neighbourhood hub. Zero temperature breaks.',
      color: 'bg-cream-50 text-cream-500',
      accent: 'border-cream-200',
    },
    {
      step: '04',
      icon: Sun,
      title: 'Sunrise Delivery',
      desc: 'Fresh at your doorstep by 5:30 AM — before you even wake up. Track your order in real time.',
      color: 'bg-amber-50 text-amber-600',
      accent: 'border-amber-200',
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-dairy-700 uppercase tracking-wider mb-3 bg-dairy-50 px-4 py-1.5 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Farm to Doorstep in <span className="text-gradient">4 Simple Steps</span>
          </h2>
          <p className="text-base text-gray-500 mt-3">
            From our 3.5 lakh cooperative farmers to your morning table — a journey of purity and trust.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`reveal delay-${(idx + 1) * 100} group relative bg-white rounded-2xl p-6 border ${item.accent} hover:border-dairy-400 shadow-card hover:shadow-card-hover card-lift text-center`}
              >
                {/* Step Number */}
                <div className="absolute -top-3 left-6 bg-white text-gray-300 text-xs font-extrabold px-3 py-1 rounded-full border border-gray-100">
                  Step {item.step}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-4 mt-2 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>

                {/* Connector Arrow (hidden on last) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="reveal mt-12 text-center">
          <button
            onClick={() => openSubscribeModal()}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-sm shadow-lg shadow-dairy-600/20 active:scale-95 transition-all"
          >
            <span>Start Your Morning Subscription</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
