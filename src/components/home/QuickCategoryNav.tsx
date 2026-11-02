import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useStore } from '../../context/StoreContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const QuickCategoryNav: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter } = useStore();
  const sectionRef = useScrollReveal();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setActivePage('products');
  };

  return (
    <section ref={sectionRef} className="py-14 sm:py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-dairy-700 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-cream-400" />
              <span>Explore The Pure Dairy Range</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Browse by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              From morning tea milk to authentic Amruth cow ghee and fresh bakery treats.
            </p>
          </div>

          <button
            onClick={() => { setSelectedCategoryFilter(null); setActivePage('products'); }}
            className="mt-4 md:mt-0 text-sm font-bold text-dairy-600 hover:text-dairy-700 inline-flex items-center gap-1 group self-start"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`reveal delay-${Math.min((idx % 7) * 100, 600)} group bg-white rounded-2xl border border-gray-100 hover:border-dairy-300 shadow-card hover:shadow-card-hover card-lift p-3 flex flex-col items-center text-center cursor-pointer`}
            >
              {/* Image */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden mb-2.5 bg-gray-50 border border-gray-100 group-hover:border-dairy-300 transition-colors">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <h3 className="font-semibold text-xs sm:text-sm text-gray-800 group-hover:text-dairy-700 leading-snug line-clamp-1">
                {cat.name}
              </h3>
              {cat.teluguName && (
                <span className="text-[10px] text-gray-400 font-medium mt-0.5 truncate max-w-full">
                  {cat.teluguName}
                </span>
              )}

              <div className="mt-2 w-full">
                <span className="w-full py-1 px-2 rounded-lg text-[10px] font-semibold text-dairy-600 bg-dairy-50 group-hover:bg-dairy-600 group-hover:text-white transition-colors flex items-center justify-center gap-0.5">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
