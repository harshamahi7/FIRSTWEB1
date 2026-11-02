import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Truck,
  Calendar,
  CheckCircle2,
  MapPin,
  Clock,
  Star,
  Leaf,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const HeroSection: React.FC = () => {
  const { setActivePage, openSubscribeModal, addToCart } = useStore();
  const sectionRef = useScrollReveal();

  const [pincodeInput, setPincodeInput] = useState('530017');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput.trim()) return;
    if (pincodeInput.startsWith('53')) {
      setPincodeStatus('active');
    } else {
      setPincodeStatus('pending');
    }
  };

  const featuredGhee = PRODUCTS.find((p) => p.id === 'prod-amruth-cow-ghee') || PRODUCTS[1];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-dairy-50 via-white to-ocean-50 pt-6 pb-16 lg:py-20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-dairy-100/40 blur-[100px] pointer-events-none -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-ocean-100/30 blur-[80px] pointer-events-none -ml-32 -mb-32" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-cream-100/50 blur-[60px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-dairy-200 shadow-soft text-sm font-semibold text-dairy-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dairy-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-dairy-500" />
              </span>
              <span>100% Cooperative Dairy • 3,50,000+ Farmers</span>
            </div>

            {/* Headline */}
            <h1 className="reveal delay-100 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Pure Dairy.{' '}
              <span className="text-gradient">
                Trusted by Generations.
              </span>
            </h1>

            {/* Sub text */}
            <p className="reveal delay-200 text-base sm:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Fresh, nutritious, and certified pure dairy from Visakha Dairy — collected daily from village farmers, lab-tested across 32 quality parameters, and delivered chilled before sunrise.
            </p>

            {/* Action Buttons */}
            <div className="reveal delay-300 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={() => setActivePage('products')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-sm shadow-lg shadow-dairy-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Shop Fresh Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openSubscribeModal()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-dairy-50 text-dairy-700 font-bold text-sm border-2 border-dairy-200 hover:border-dairy-400 shadow-soft transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-dairy-500" />
                <span>Daily Milk Subscription</span>
              </button>
            </div>

            {/* Pincode Checker */}
            <div className="reveal delay-400 pt-1 max-w-md mx-auto lg:mx-0">
              <form
                onSubmit={handleCheckPincode}
                className="bg-white p-1.5 rounded-xl shadow-card border border-gray-200 flex items-center gap-2"
              >
                <div className="flex items-center gap-2 pl-3 flex-1">
                  <MapPin className="w-4 h-4 text-dairy-500 flex-shrink-0" />
                  <input
                    type="text"
                    value={pincodeInput}
                    onChange={(e) => {
                      setPincodeInput(e.target.value);
                      setPincodeStatus(null);
                    }}
                    placeholder="Enter delivery pincode"
                    className="w-full text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none"
                    maxLength={6}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-dairy-600 hover:bg-dairy-700 text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                >
                  Check
                </button>
              </form>

              {pincodeStatus === 'active' && (
                <div className="mt-2 bg-dairy-50 text-dairy-800 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border border-dairy-200 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-dairy-600 flex-shrink-0" />
                  <span>5:30 AM Delivery is <strong>ACTIVE</strong> in {pincodeInput}!</span>
                </div>
              )}
              {pincodeStatus === 'pending' && (
                <div className="mt-2 bg-cream-100 text-amber-800 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border border-cream-300 animate-fade-in">
                  <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Available via nearest Visakha Parlour. Hub delivery coming soon!</span>
                </div>
              )}
            </div>

            {/* Trust Stats */}
            <div className="reveal delay-500 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              {[
                { value: '3.5 Lakh+', label: 'Member Farmers' },
                { value: '10 Lakh L', label: 'Daily Handling' },
                { value: '50+ Years', label: 'Since 1973' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-900">{stat.value}</div>
                  <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-5 relative reveal-scale">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-dairy-600 to-dairy-800 p-1.5 shadow-premium">
                <img
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=85"
                  alt="Pure Visakha Dairy Milk"
                  className="w-full h-[380px] sm:h-[440px] object-cover rounded-[1.25rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[1.25rem]" />

                {/* Inset Info */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-dairy-400" />
                    <span className="text-[11px] font-semibold text-dairy-200 uppercase tracking-wider">Cold-Chain • Untouched By Hand</span>
                  </div>
                  <h3 className="text-lg font-bold">Visakha Fresh Milk Range</h3>
                  <p className="text-xs text-gray-300 mt-0.5">Rich in natural proteins, calcium & vitamins</p>
                </div>
              </div>

              {/* Floating Card: Ghee */}
              <div
                onClick={() => addToCart(featuredGhee)}
                className="absolute -top-4 -left-3 sm:-left-6 bg-white rounded-2xl p-3 shadow-elevated border border-gray-100 flex items-center gap-3 animate-float cursor-pointer hover:scale-105 transition-transform"
                title="Tap to add Amruth Ghee"
              >
                <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-cream-500 flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900">Amruth Cow Ghee</span>
                    <span className="text-[9px] bg-cream-300 text-cream-500 font-bold px-1.5 py-px rounded-full flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" /> 5.0
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">Pure Traditional Aroma</div>
                </div>
              </div>

              {/* Floating Card: Delivery */}
              <div
                onClick={() => openSubscribeModal()}
                className="absolute -bottom-4 -right-3 sm:-right-4 bg-white rounded-2xl p-3 shadow-elevated border border-gray-100 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform animate-float-delayed"
              >
                <div className="w-10 h-10 rounded-xl bg-dairy-50 flex items-center justify-center text-dairy-600 flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Sunrise Delivery</div>
                  <div className="text-[10px] text-dairy-600 font-semibold">5:30 AM Daily • ₹0 Fee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Marquee Strip */}
      <div className="mt-16 border-t border-b border-gray-100 bg-white/60 py-4 overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].map((_, dupIdx) => (
            <div key={dupIdx} className="flex items-center gap-10 px-5">
              {[
                { icon: ShieldCheck, text: 'ISO 22000:2018 Certified' },
                { icon: Leaf, text: '100% Cooperative Owned' },
                { icon: Award, text: 'FSSAI Licensed' },
                { icon: Sparkles, text: '32 Quality Tests Per Batch' },
                { icon: Truck, text: 'Cold-Chain Below 4°C' },
                { icon: Star, text: 'Trusted by 10 Lakh+ Homes' },
                { icon: ShieldCheck, text: 'Zero Antibiotics Policy' },
                { icon: Leaf, text: 'Direct from 3.5 Lakh Farmers' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 whitespace-nowrap text-gray-500 text-sm font-medium">
                  <item.icon className="w-4 h-4 text-dairy-500 flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
