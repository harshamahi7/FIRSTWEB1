import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  Calendar,
  Heart,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openSubscribeModal,
    setIsCheckoutOpen,
    openProductDetail,
  } = useStore();

  if (!selectedProduct) return null;

  const [chosenSize, setChosenSize] = useState<string>(selectedProduct.packSize);
  const [qty, setQty] = useState<number>(1);

  const isFavorite = isInWishlist(selectedProduct.id);

  const currentOption = selectedProduct.packSizes.find((o) => o.size === chosenSize) || {
    size: selectedProduct.packSize,
    price: selectedProduct.price,
    originalPrice: selectedProduct.originalPrice,
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, chosenSize, qty);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, chosenSize, qty);
    closeProductDetail();
    setIsCheckoutOpen(true);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.isBestseller)
  ).slice(0, 3);

  const freqBoughtProduct = PRODUCTS.find(
    (p) =>
      p.id !== selectedProduct.id &&
      (selectedProduct.category === 'fresh-milk'
        ? p.id === 'prod-fresh-curd-pouch'
        : p.category === 'sweets'
        ? p.id === 'prod-amruth-cow-ghee'
        : p.id === 'prod-toned-milk')
  ) || PRODUCTS[1];

  const bundleTotal = currentOption.price + freqBoughtProduct.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale-in">
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-black shadow-md flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Product Imagery & Trust Badges */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 aspect-square">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-dairy-600 mb-1" />
                  <span className="text-[11px] font-bold text-gray-800">100% Pure</span>
                  <span className="text-[10px] text-gray-400">ISO 22000</span>
                </div>
                <div className="flex flex-col items-center border-x border-gray-200">
                  <Truck className="w-4 h-4 text-dairy-600 mb-1" />
                  <span className="text-[11px] font-bold text-gray-800">Cold Chain</span>
                  <span className="text-[10px] text-gray-400">Below 4°C</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-dairy-600 mb-1" />
                  <span className="text-[11px] font-bold text-gray-800">Daily Fresh</span>
                  <span className="text-[10px] text-gray-400">Direct From Farm</span>
                </div>
              </div>
            </div>

            {/* Right: Details & CTAs */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-dairy-700 uppercase tracking-wider bg-dairy-50 px-2.5 py-0.5 rounded-full">
                    {selectedProduct.categoryName}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-gray-400 font-normal">
                      ({selectedProduct.reviewCount})
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  {selectedProduct.name}
                </h1>
                {selectedProduct.teluguName && (
                  <p className="text-sm font-semibold text-dairy-600 mt-0.5">
                    {selectedProduct.teluguName}
                  </p>
                )}
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  ₹{currentOption.price}
                </span>
                {currentOption.originalPrice && currentOption.originalPrice > currentOption.price && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{currentOption.originalPrice}
                  </span>
                )}
                <span className="text-xs text-dairy-700 font-bold bg-dairy-50 px-2 py-0.5 rounded-md ml-auto">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Pack Size Selector */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                  Select Pack Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.packSizes.map((opt) => (
                    <button
                      key={opt.size}
                      onClick={() => setChosenSize(opt.size)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all ${
                        chosenSize === opt.size
                          ? 'bg-dairy-600 text-white border-dairy-600 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {opt.size} — ₹{opt.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Quantity Stepper & Add to Cart / Buy Now */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center bg-gray-100 rounded-xl p-0.5 text-gray-800">
                    <button
                      onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
                      className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center font-bold text-gray-600 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{qty}</span>
                    <button
                      onClick={() => setQty((prev) => prev + 1)}
                      className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center font-bold text-gray-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-dairy-600/20 active:scale-98 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (₹{currentOption.price * qty})</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleBuyNow}
                    className="py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Zap className="w-4 h-4 text-cream-400" />
                    <span>Buy Now</span>
                  </button>

                  {['fresh-milk', 'uht-milk', 'curd-yogurt'].includes(selectedProduct.category) && (
                    <button
                      onClick={() => {
                        closeProductDetail();
                        openSubscribeModal(selectedProduct);
                      }}
                      className="py-2.5 px-4 rounded-xl bg-cream-400 hover:bg-cream-300 text-gray-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Subscribe Daily</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Nutritional Table */}
              <div className="pt-3 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Nutritional Value (Per 100g/ml approx):
                </h3>
                <div className="grid grid-cols-5 gap-1 text-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  {[
                    ['Energy', selectedProduct.nutritionalInfo.energy],
                    ['Protein', selectedProduct.nutritionalInfo.protein],
                    ['Fat', selectedProduct.nutritionalInfo.fat],
                    ['Carbs', selectedProduct.nutritionalInfo.carbohydrate],
                    ['Calcium', selectedProduct.nutritionalInfo.calcium],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div className="text-[10px] text-gray-400 font-medium">{label}</div>
                      <div className="text-xs font-bold text-gray-900 mt-0.5">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ingredients & Storage Info */}
              <div className="space-y-1 text-xs text-gray-600 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                <p><strong className="text-gray-900">Ingredients:</strong> {selectedProduct.ingredients}</p>
                <p><strong className="text-gray-900">Storage:</strong> {selectedProduct.storage}</p>
                <p><strong className="text-gray-900">Shelf Life:</strong> {selectedProduct.shelfLife}</p>
                {selectedProduct.fssaiNumber && (
                  <p><strong className="text-gray-900">FSSAI:</strong> {selectedProduct.fssaiNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Frequently Bought Together Bundle */}
          <div className="mt-8 p-5 bg-gradient-to-r from-dairy-50/50 to-cream-50/40 rounded-2xl border border-dairy-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-cream-500" />
              <span>Frequently Bought Together</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-white p-0.5 border border-gray-200 overflow-hidden flex-shrink-0">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-gray-900">{selectedProduct.name}</div>
                  <div className="text-dairy-700 font-bold">₹{currentOption.price}</div>
                </div>
              </div>

              <span className="text-lg font-bold text-gray-400">+</span>

              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-white p-0.5 border border-gray-200 overflow-hidden flex-shrink-0">
                  <img
                    src={freqBoughtProduct.image}
                    alt={freqBoughtProduct.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-gray-900">{freqBoughtProduct.name}</div>
                  <div className="text-dairy-700 font-bold">₹{freqBoughtProduct.price}</div>
                </div>
              </div>

              <div className="sm:ml-auto flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-gray-400">Combo Total:</div>
                  <div className="text-base font-extrabold text-gray-900">₹{bundleTotal}</div>
                </div>
                <button
                  onClick={() => {
                    addToCart(selectedProduct, chosenSize, 1);
                    addToCart(freqBoughtProduct, freqBoughtProduct.packSize, 1);
                  }}
                  className="px-4 py-2 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Add Both
                </button>
              </div>
            </div>
          </div>

          {/* You May Also Like Section */}
          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-900 mb-3">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => openProductDetail(rel)}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-dairy-200 hover:bg-dairy-50/20 transition-all cursor-pointer bg-white shadow-card"
                >
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-gray-900 truncate">{rel.name}</h4>
                    <p className="text-[10px] text-gray-400">{rel.packSize}</p>
                    <div className="font-bold text-xs text-dairy-700 mt-0.5">₹{rel.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
