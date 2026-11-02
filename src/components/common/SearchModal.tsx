import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    openProductDetail,
    addToCart,
    setActivePage,
    setSelectedCategoryFilter,
  } = useStore();

  const [inputVal, setInputVal] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = inputVal.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(inputVal.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(inputVal.toLowerCase()) ||
          p.description.toLowerCase().includes(inputVal.toLowerCase()) ||
          (p.teluguName && p.teluguName.includes(inputVal))
      )
    : PRODUCTS.slice(0, 4);

  const handleSelectProduct = (product: (typeof PRODUCTS)[0]) => {
    openProductDetail(product);
    setIsSearchOpen(false);
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setActivePage('products');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh] animate-scale-in">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-dairy-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search milk, ghee, curd, paneer, doodhpeda, ice cream..."
            className="w-full text-base sm:text-lg font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          {inputVal && (
            <button
              onClick={() => {
                setInputVal('');
                setSearchQuery('');
              }}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-bold text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-xl transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Popular Categories */}
        <div className="px-5 py-2.5 bg-gray-50/70 border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex-shrink-0">
            Quick Categories:
          </span>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-dairy-500 hover:text-dairy-700 whitespace-nowrap transition-colors"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {inputVal.trim() ? `Found ${filteredProducts.length} Results` : 'Popular Fresh Products'}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p className="text-base font-semibold text-gray-700">No dairy products found matching "{inputVal}"</p>
              <p className="text-xs mt-1">Try searching for "Milk", "Ghee", "Paneer", or "Curd"</p>
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => handleSelectProduct(prod)}
                className="group flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-dairy-200 hover:bg-dairy-50/30 transition-all cursor-pointer bg-white"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-dairy-700 text-sm">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {prod.categoryName} • {prod.packSize}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-extrabold text-gray-900 text-sm">₹{prod.price}</div>
                    {prod.originalPrice && (
                      <div className="text-[10px] text-gray-400 line-through">₹{prod.originalPrice}</div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(prod);
                    }}
                    className="p-2 rounded-xl bg-dairy-50 text-dairy-600 hover:bg-dairy-600 hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View all in catalogue */}
        <div className="p-3.5 bg-gray-50 border-t border-gray-100 text-center">
          <button
            onClick={() => {
              setActivePage('products');
              setIsSearchOpen(false);
            }}
            className="text-xs font-bold text-dairy-700 hover:text-dairy-800 inline-flex items-center gap-1.5"
          >
            <span>View all products in Full Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
