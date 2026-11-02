import React from 'react';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const CustomerTestimonialsSection: React.FC = () => {
  const sectionRef = useScrollReveal();

  const reviews = [
    {
      name: 'Dr. K. Radhika Devi',
      area: 'MVP Colony, Visakhapatnam',
      verified: 'Subscribed since 2021',
      rating: 5,
      comment: 'We have been drinking Visakha Cow Milk since my childhood. Having it delivered at 5:30 AM before my morning clinic is a blessing. The curd sets remarkably thick every day.',
      product: 'Pure Cow Milk & Fresh Curd',
    },
    {
      name: 'P. Satyanarayana Murthy',
      area: 'Siripuram, Visakhapatnam',
      verified: 'Loyal Consumer 25+ Years',
      rating: 5,
      comment: 'Visakha Amruth Cow Ghee is the gold standard in Andhra. The granular texture and heavenly aroma for festive sweets cannot be matched by any commercial brand.',
      product: 'Amruth Pure Cow Ghee',
    },
    {
      name: 'Smt. S. Lakshmi Prasanna',
      area: 'Gajuwaka, Visakhapatnam',
      verified: 'Daily Milk Subscriber',
      rating: 5,
      comment: 'Fresh Malai Paneer is so soft and melts in the mouth! What I admire most is knowing our money supports 3.5 Lakh local farmers through their cooperative trust hospitals.',
      product: 'Fresh Paneer & Toned Milk',
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="reveal text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-dairy-700 bg-dairy-50 px-4 py-1.5 rounded-full">
            <Heart className="w-3.5 h-3.5 text-brand-coral fill-brand-coral" />
            <span>Loved by Telugu Families</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Voices of <span className="text-gradient">Trust</span>
          </h2>
          <p className="text-sm text-gray-500">
            Real feedback from households who start every morning with pure Visakha Dairy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, idx) => (
            <div
              key={r.name}
              className={`reveal delay-${idx * 200} bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover card-lift flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-gray-200" />
                </div>

                <p className="text-sm text-gray-600 leading-relaxed italic">"{r.comment}"</p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
                <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                <div className="text-xs text-gray-400">{r.area}</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-dairy-600 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{r.verified}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
