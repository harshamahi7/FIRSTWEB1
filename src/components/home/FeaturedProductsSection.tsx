import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { useStore } from '../../context/StoreContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const FeaturedProductsSection: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter } = useStore();
  const sectionRef = useScrollReveal();
  const [activeTab, setActiveTab] = useState<'all' | 'milk' | 'ghee' | 'curd' | 'sweets'>('all');

  const tabs = [
    { id: 'all', label: 'All Featured' },
    { id: 'milk', label: 'Fresh Milk' },
    { id: 'curd', label: 'Curd & Chaas' },
    { id: 'ghee', label: 'Ghee & Paneer' },
    { id: 'sweets', label: 'Traditional Sweets' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return p.isFeatured || p.isBestseller;
    if (activeTab === 'milk') return p.category === 'fresh-milk' || p.category === 'uht-milk';
    if (activeTab === 'curd') return p.category === 'curd-yogurt' || p.category === 'buttermilk';
    if (activeTab === 'ghee') return p.category === 'ghee' || p.category === 'paneer';
    if (activeTab === 'sweets') return p.category === 'sweets';
    return true;
  }).slice(0, 8);

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-dairy-700 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-cream-400" />
              <span>Customer Favorites</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured Products
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Pure, fresh dairy delivered to 10 lakh+ households every morning.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-dairy-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredProducts.map((product, idx) => (
            <div key={product.id} className={`reveal delay-${Math.min(idx * 100, 400)}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="reveal mt-12 text-center">
          <button
            onClick={() => { setSelectedCategoryFilter(null); setActivePage('products'); }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border-2 border-dairy-200 text-dairy-700 font-bold text-sm hover:bg-dairy-50 hover:border-dairy-400 shadow-soft transition-all active:scale-98"
          >
            <span>Explore All {PRODUCTS.length} Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
