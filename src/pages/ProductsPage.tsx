import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  X,
  Sparkles,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/products/ProductCard';
import { useStore } from '../context/StoreContext';

export const ProductsPage: React.FC = () => {
  const { selectedCategoryFilter, setSelectedCategoryFilter } = useStore();

  const [searchWord, setSearchWord] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter || 'all');
  const [priceRange, setPriceRange] = useState<'all' | 'under50' | '50to150' | 'above150'>('all');
  const [packSizeFilter, setPackSizeFilter] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'newest'>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync if context category changes
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  const filteredAndSortedProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (searchWord.trim()) {
        const query = searchWord.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchCat = product.categoryName.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchTelugu = product.teluguName?.includes(query);
        if (!matchName && !matchCat && !matchDesc && !matchTelugu) return false;
      }

      // Category
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Price Range
      if (priceRange === 'under50' && product.price >= 50) return false;
      if (priceRange === '50to150' && (product.price < 50 || product.price > 150)) return false;
      if (priceRange === 'above150' && product.price <= 150) return false;

      // Pack Size
      if (packSizeFilter !== 'all') {
        const hasSize = product.packSizes.some((s) =>
          s.size.toLowerCase().includes(packSizeFilter.toLowerCase())
        );
        if (!hasSize) return false;
      }

      // In Stock
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.rating - a.rating; // default popular
    });
  }, [searchWord, activeCategory, priceRange, packSizeFilter, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSearchWord('');
    setActiveCategory('all');
    setSelectedCategoryFilter(null);
    setPriceRange('all');
    setPackSizeFilter('all');
    setInStockOnly(false);
    setSortBy('popular');
  };

  return (
    <div className="bg-[#fafffe] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-dairy-700 uppercase tracking-wider mb-2 bg-dairy-50 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-cream-400" />
            <span>Official Visakha Dairy Catalogue</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Pure Dairy <span className="text-gradient">Products</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl">
            Sourced daily from 3.5 lakh cooperative member farmers. 100% pasteurized, laboratory tested, and delivered chilled before sunrise.
          </p>
        </div>

        {/* Search Bar & Mobile Filter Trigger */}
        <div className="bg-white p-2.5 sm:p-3.5 rounded-2xl shadow-card border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="Search dairy products, Amruth ghee, curd, paneer, doodhpeda, buttermilk..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dairy-500/20 border border-transparent focus:border-dairy-300 focus:bg-white transition-all"
            />
            {searchWord && (
              <button
                onClick={() => setSearchWord('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between">
            {/* Sorting Dropdown */}
            <div className="relative flex-1 md:w-52">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="w-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 py-2.5 px-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-dairy-500/20 cursor-pointer"
              >
                <option value="popular">Popular (Highest Rated)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Additions</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-4 py-2.5 bg-dairy-600 hover:bg-dairy-700 text-white rounded-xl flex items-center gap-1.5 text-xs font-semibold shadow-sm active:scale-95 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Filters + Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-card h-fit sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-dairy-600" />
                <span>Filters</span>
              </span>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-dairy-600 hover:text-dairy-700 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2.5">
                Categories
              </label>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1 no-scrollbar">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSelectedCategoryFilter(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                    activeCategory === 'all'
                      ? 'bg-dairy-600 text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setSelectedCategoryFilter(cat.id);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                        activeCategory === cat.id
                          ? 'bg-dairy-600 text-white shadow-xs'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] opacity-75">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2.5">
                Price Range
              </label>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under50', label: 'Under ₹50' },
                  { id: '50to150', label: '₹50 to ₹150' },
                  { id: 'above150', label: 'Above ₹150' },
                ].map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center gap-2 cursor-pointer font-medium text-gray-600 hover:text-gray-900"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === p.id}
                      onChange={() => setPriceRange(p.id as any)}
                      className="accent-dairy-600"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pack Size */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2.5">
                Pack Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['all', '200', '450', '500', '1000', 'kg'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setPackSizeFilter(size)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold border transition-all ${
                      packSizeFilter === size
                        ? 'bg-dairy-600 text-white border-dairy-600 shadow-xs'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size === 'all' ? 'All Sizes' : size}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock toggle */}
            <div className="pt-3 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-dairy-600 focus:ring-dairy-500 accent-dairy-600"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
              <div className="bg-white w-5/6 max-w-sm h-full p-6 overflow-y-auto space-y-6 animate-slide-in-right">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <span className="font-bold text-gray-900 text-base">Filters</span>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase block mb-2">Categories</label>
                  <div className="space-y-1">
                    <button
                      onClick={() => { setActiveCategory('all'); setSelectedCategoryFilter(null); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                        activeCategory === 'all' ? 'bg-dairy-600 text-white' : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { setActiveCategory(cat.id); setSelectedCategoryFilter(cat.id); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                          activeCategory === cat.id ? 'bg-dairy-600 text-white' : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-xs"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-dairy-600 text-white font-semibold text-xs shadow-md"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Product Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Pills */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">
                Showing {filteredAndSortedProducts.length} of {PRODUCTS.length} products
              </span>

              {(activeCategory !== 'all' ||
                priceRange !== 'all' ||
                packSizeFilter !== 'all' ||
                inStockOnly ||
                searchWord) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-dairy-600 font-bold hover:underline"
                >
                  Clear Active Filters
                </button>
              )}
            </div>

            {/* Product Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-card">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-dairy-50 flex items-center justify-center text-dairy-600 mb-3">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No matching products found</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Try clearing your filters or search keywords to view the complete Visakha Dairy range.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-dairy-600 text-white font-bold text-xs shadow-sm hover:bg-dairy-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
