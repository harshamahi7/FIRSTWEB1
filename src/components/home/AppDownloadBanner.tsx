import React from 'react';
import { Smartphone, Star, Download, Bell, ShieldCheck, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const AppDownloadBanner: React.FC = () => {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-dairy-50 via-white to-ocean-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Content */}
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-dairy-700 uppercase tracking-wider bg-dairy-50 px-4 py-1.5 rounded-full border border-dairy-200">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Coming Soon</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Visakha Dairy App.{' '}
              <span className="text-gradient">Order in Seconds.</span>
            </h2>

            <p className="text-base text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Manage subscriptions, track deliveries, browse products, and reorder favourites — all from your pocket. Launching soon for Android & iOS.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0">
              {[
                { icon: Bell, text: 'Delivery Alerts' },
                { icon: Star, text: 'Rate Products' },
                { icon: ShieldCheck, text: 'Secure Pay' },
                { icon: Download, text: 'Quick Reorder' },
              ].map((f) => (
                <div key={f.text} className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-gray-100 shadow-card">
                  <f.icon className="w-5 h-5 text-dairy-500" />
                  <span className="text-[11px] font-semibold text-gray-600">{f.text}</span>
                </div>
              ))}
            </div>

            {/* Store Badges (Placeholder) */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-md cursor-pointer hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.792-2.302 2.792-2.302zM5.864 2.658L16.8 8.991l-2.302 2.302-8.634-8.635z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[9px] font-medium text-gray-300">GET IT ON</div>
                  <div className="text-sm font-bold -mt-0.5">Google Play</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-md cursor-pointer hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[9px] font-medium text-gray-300">Download on the</div>
                  <div className="text-sm font-bold -mt-0.5">App Store</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-[260px] sm:w-[280px] bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="bg-white rounded-[2rem] overflow-hidden h-[500px] sm:h-[540px] relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10" />
                  
                  {/* Screen Content */}
                  <div className="pt-8 px-4 pb-4 h-full bg-gradient-to-b from-dairy-50 to-white flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-[10px] text-gray-400">Good Morning 🌅</div>
                        <div className="text-sm font-bold text-gray-900">Visakha Dairy</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-dairy-100 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-dairy-600" />
                      </div>
                    </div>
                    
                    <div className="bg-dairy-600 text-white rounded-xl p-3 mb-3">
                      <div className="text-[10px] font-medium text-dairy-200">Today's Delivery</div>
                      <div className="text-xs font-bold mt-0.5">Toned Milk × 2 arriving at 5:30 AM</div>
                      <div className="w-full h-1.5 bg-dairy-800 rounded-full mt-2">
                        <div className="w-3/4 h-full bg-dairy-300 rounded-full" />
                      </div>
                    </div>

                    <div className="text-xs font-bold text-gray-800 mb-2">Quick Reorder</div>
                    <div className="space-y-2 flex-1">
                      {['Toned Milk 500ml', 'Pure Cow Milk 1L', 'Fresh Curd 400g'].map((item) => (
                        <div key={item} className="flex items-center justify-between bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-dairy-50" />
                            <span className="text-[11px] font-semibold text-gray-800">{item}</span>
                          </div>
                          <button className="text-[10px] bg-dairy-600 text-white px-2 py-1 rounded-md font-bold">Add</button>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-1 pt-3 border-t border-gray-100 mt-2">
                      {['Home', 'Shop', 'Track', 'Account'].map((tab) => (
                        <div key={tab} className="text-center">
                          <div className={`w-5 h-5 mx-auto rounded-md mb-0.5 ${tab === 'Home' ? 'bg-dairy-600' : 'bg-gray-200'}`} />
                          <div className={`text-[9px] font-semibold ${tab === 'Home' ? 'text-dairy-600' : 'text-gray-400'}`}>{tab}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -left-8 top-24 bg-white rounded-xl p-2.5 shadow-elevated border border-gray-100 animate-float max-w-[160px]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-dairy-50 flex items-center justify-center text-dairy-600 flex-shrink-0">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-800">Delivery on the way!</div>
                    <div className="text-[9px] text-gray-400">ETA: 5:28 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
