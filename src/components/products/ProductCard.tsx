import React, { useState } from 'react';
import { Heart, Plus, Minus, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    cart,
    updateCartQuantity,
  } = useStore();

  const [selectedPackSize, setSelectedPackSize] = useState<string>(product.packSize);
  const [localQty, setLocalQty] = useState<number>(1);

  const isFavorite = isInWishlist(product.id);
  const currentOption = product.packSizes.find((o) => o.size === selectedPackSize) || {
    size: product.packSize,
    price: product.price,
    originalPrice: product.originalPrice,
  };

  const itemId = `${product.id}-${selectedPackSize}`;
  const cartItem = cart.find((item) => item.id === itemId);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) updateCartQuantity(cartItem.id, 1);
    else setLocalQty((prev) => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) updateCartQuantity(cartItem.id, -1);
    else setLocalQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedPackSize, localQty);
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-dairy-200 shadow-card hover:shadow-card-hover card-lift flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.isBestseller && (
            <span className="bg-dairy-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
              Bestseller
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-brand-coral text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
              Save ₹{product.originalPrice - product.price}
            </span>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 shadow-sm'
              : 'bg-white/90 text-gray-400 hover:text-rose-500 shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative pt-[80%] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-dairy-600 uppercase tracking-wider text-[10px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 group-hover:text-dairy-700 text-sm leading-snug line-clamp-1 transition-colors">
            {product.name}
          </h3>

          {product.teluguName && (
            <p className="text-[11px] text-dairy-600/70 font-medium mt-0.5">{product.teluguName}</p>
          )}

          {/* Pack Size Switcher */}
          {product.packSizes.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar"
            >
              {product.packSizes.map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => setSelectedPackSize(opt.size)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all border ${
                    selectedPackSize === opt.size
                      ? 'bg-dairy-600 text-white border-dairy-600'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {opt.size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price & Cart */}
        <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-gray-900">₹{currentOption.price}</span>
              {currentOption.originalPrice && currentOption.originalPrice > currentOption.price && (
                <span className="text-xs text-gray-400 line-through">₹{currentOption.originalPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{selectedPackSize}</span>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            {cartItem ? (
              <div className="flex items-center bg-dairy-50 border border-dairy-200 rounded-xl p-0.5">
                <button
                  onClick={handleDecrement}
                  className="w-7 h-7 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center text-dairy-700 shadow-sm"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center font-bold text-xs text-dairy-800">{cartItem.quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-7 h-7 rounded-lg bg-dairy-600 hover:bg-dairy-700 text-white flex items-center justify-center shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 bg-dairy-600 hover:bg-dairy-700 text-white font-semibold text-xs px-3 py-2 rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
