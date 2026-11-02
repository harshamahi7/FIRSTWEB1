import React from 'react';
import {
  Users,
  Building,
  Award,
  Sparkles,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  GraduationCap,
} from 'lucide-react';
import { TIMELINE_DATA, DAIRY_STATS, BOARD_MEMBERS } from '../data/timeline';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div className="bg-[#fafbf9] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Story Banner */}
        <div className="bg-gradient-to-r from-dairy-950 via-dairy-900 to-ocean-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-dairy-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs bg-amber-400 text-gray-950 font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Nourishing Generations Since 1973
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Sri Vijaya Visakha Milk Producers Company Limited
            </h1>
            <p className="text-sm sm:text-base text-dairy-200 leading-relaxed font-normal">
              Widely known as <strong>Visakha Dairy</strong>, we are a proud Indian producer cooperative built on the bedrock of rural self-reliance, farmer empowerment, and uncompromised dairy quality.
            </p>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DAIRY_STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft text-center"
            >
              <div className="text-3xl sm:text-4xl font-black text-dairy-950 mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-gray-800 uppercase tracking-wider">{stat.label}</div>
              <p className="text-[11px] text-gray-500 mt-0.5">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Vision & Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-bold text-dairy-800 uppercase tracking-wider">
              The Genesis of Purity
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
              Championed by Sri Adari Tulasirao & The Cooperative Dream
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              In 1973, North Coastal Andhra Pradesh faced severe seasonal milk gluts and exploitation by private traders who underpaid unorganized rural farmers. Under the steadfast leadership of late visionary <strong>Sri Adari Tulasirao</strong>, the dairy cooperative union was founded to return economic sovereignty to the farmer.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Starting from a modest processing capacity of 50,000 Litres per day in 1977 at Akkireddipalem, Visakha Dairy today processes over 10 Lakh Litres daily, providing sustainable livelihoods across hundreds of villages.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 aspect-video">
              <img
                src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=900&q=80"
                alt="Visakha Dairy farmer community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Visual History Timeline (1973 to Present) */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-soft">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-dairy-800 uppercase tracking-wider mb-1">
              Historical Milestones
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              5 Decades of Trust & Excellence
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 sm:before:left-1/2 before:w-0.5 before:bg-dairy-200">
            {TIMELINE_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`relative flex items-center gap-6 sm:gap-10 ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Badge in Center */}
                  <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-dairy-800 text-white font-black text-xs flex items-center justify-center border-4 border-white shadow-md z-10">
                    {item.year.slice(-2)}
                  </div>

                  {/* Empty Spacer on opposite side for desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Card on content side */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 bg-[#fafbf9] p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-soft">
                    <span className="text-xs font-black text-dairy-800 bg-dairy-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {item.year}
                    </span>
                    <h3 className="font-bold text-base text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2">
                      {item.description}
                    </p>
                    {item.highlight && (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.highlight}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modern Dairy Plants & Infrastructure */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              State-of-the-Art Processing Plants
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Engineered with world-class stainless steel aseptic machinery and unbroken cold refrigeration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Akkireddipalem Plant */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-dairy-800 bg-dairy-50 px-2.5 py-1 rounded-full">
                  Primary Headquarters Plant
                </span>
                <span className="text-xs text-gray-400">Est. 1977</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Akkireddipalem Dairy Plant</h3>
              <p className="text-xs text-gray-500">
                Opp. BHEL Main Gate, Akkireddypalem, Visakhapatnam - 530012
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                Equipped with automated continuous butter making, pasteurization, SCADA-controlled ghee boilers, curd incubation chambers, and high-speed pouch packing lines.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">
                  SCADA Automated
                </span>
                <span className="text-[11px] font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">
                  ISO 22000:2018 Certified
                </span>
                <span className="text-[11px] font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">
                  6 Lakh LPD Capacity
                </span>
              </div>
            </div>

            {/* Rangampeta Plant */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-ocean-800 bg-ocean-50 px-2.5 py-1 rounded-full">
                  Modern Mega Plant
                </span>
                <span className="text-xs text-gray-400">Est. 2018</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Rangampeta Mega Plant</h3>
              <p className="text-xs text-gray-500">
                Dairy Complex, Rangampeta, East Godavari District, Andhra Pradesh
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                Ultra-modern automated milk processing and aseptic UHT packaging unit serving Godavari, Krishna, and neighboring districts with long-shelf-life cartons.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">
                  Aseptic UHT Lines
                </span>
                <span className="text-[11px] font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">
                  Eco-Friendly Solar Integration
                </span>
                <span className="text-[11px] font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">
                  4 Lakh LPD Capacity
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Welfare Trust: MP & EEH & MW Trust */}
        <div className="bg-gradient-to-br from-cream-100 to-cream-50 p-8 sm:p-10 rounded-3xl border border-cream-200">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
              <GraduationCap className="w-5 h-5 text-amber-600" />
              <span>Social Responsibility & Community Care</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              Milk Producers and Employee’s Education Health & Medical Welfare Trust
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Founded in 1989, the trust manages multi-specialty hospitals with modern surgical units, cardiac care, and free medicine distribution for rural dairy farmers and employees. It also funds schools and colleges to educate rural youth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
