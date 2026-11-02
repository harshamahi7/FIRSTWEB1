import React from 'react';
import { Heart, Users, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const FarmerEmpowermentSection: React.FC = () => {
  const { setActivePage } = useStore();
  const sectionRef = useScrollReveal();

  const initiatives = [
    { title: 'Free Veterinary Care', desc: 'Doorstep emergency animal doctors and round-the-clock rural clinics.' },
    { title: 'Cattle Feed Subsidies', desc: 'Lab-formulated balanced bypass protein cattle feed at subsidized rates.' },
    { title: 'Instant Transparent Testing', desc: 'Automated electronic Fat & SNF testing with direct SMS payment receipts.' },
    { title: 'Farmer Welfare Hospitals', desc: 'Modern super-specialty hospitals providing free surgeries and medicines.' },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-6 relative reveal-left">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80"
                alt="Dairy farmer with cattle"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs bg-dairy-600 text-white font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
                  Cooperative Movement
                </span>
                <h3 className="text-lg font-bold">Direct Prosperity to the Grassroots</h3>
                <p className="text-xs text-gray-200 mt-1">
                  80%+ of consumer spend returns directly to rural dairy producer families.
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-3 sm:-right-5 bg-white rounded-xl p-3.5 shadow-elevated border border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-dairy-50 flex items-center justify-center text-dairy-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">MP & EEH Trust</div>
                  <div className="text-[10px] text-gray-400">Free hospitals & schools</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 space-y-6 reveal-right">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-dairy-700 uppercase tracking-wider bg-dairy-50 px-4 py-1.5 rounded-full">
              <Users className="w-4 h-4 text-dairy-600" />
              <span>The Soul of Visakha Dairy</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Empowering <span className="text-gradient">3,50,000+</span> Dairy Farmers
            </h2>

            <p className="text-base text-gray-500 leading-relaxed">
              Founded in 1973 by Sri Adari Tulasirao to protect rural farmers from predatory brokers. Today, we're one of India's most successful producer organizations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {initiatives.map((item) => (
                <div key={item.title} className="p-3.5 bg-white rounded-xl border border-gray-100 shadow-card space-y-1 hover:shadow-card-hover transition-shadow">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-dairy-500" />
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActivePage('about')}
              className="px-6 py-3 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-dairy-600/20 active:scale-95 transition-all"
            >
              <span>Learn About Our Farmers & History</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
