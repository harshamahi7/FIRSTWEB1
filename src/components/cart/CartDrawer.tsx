import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Tag,
  Check,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    discount,
    appliedCoupon,
    applyCoupon,
    total,
    setIsCheckoutOpen,
    setActivePage,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 199;
  const progressToFreeDelivery = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-dairy-600" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Your Fresh Basket</h2>
              <span className="text-xs bg-dairy-50 text-dairy-700 font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-dairy-50/80 p-3.5 border-b border-dairy-100">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-dairy-800">
                <Truck className="w-4 h-4 text-dairy-600" />
                {amountNeededForFreeDelivery === 0 ? (
                  <span className="text-dairy-700 font-bold">You qualify for FREE Sunrise Delivery!</span>
                ) : (
                  <span>Add ₹{amountNeededForFreeDelivery} more for FREE delivery</span>
                )}
              </span>
              <span className="text-dairy-700 font-bold">{progressToFreeDelivery}%</span>
            </div>
            <div className="w-full bg-dairy-200/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-dairy-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeDelivery}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base">Your cart is empty</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                    Pure, fresh cow milk, thick curd, and Amruth ghee are just a click away!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('products');
                  }}
                  className="inline-flex items-center gap-2 bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>Explore Dairy Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-dairy-200 bg-white shadow-card transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-gray-400">{item.packSize}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-extrabold text-gray-900 text-sm">
                        ₹{item.price * item.quantity}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-gray-400">
                          (₹{item.price} each)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-brand-coral transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5 text-gray-800">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md text-gray-700 font-bold transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md text-gray-700 font-bold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-gray-50/90 border-t border-gray-100 space-y-3.5">
              {/* Coupon Code Section */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon (e.g. VISAKHA10)"
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-dairy-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-dairy-700 bg-dairy-50 px-3 py-1.5 rounded-lg font-semibold">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Coupon '{appliedCoupon}' active
                  </span>
                  <span>-₹{discount}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-dairy-700 font-bold uppercase">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-dairy-700 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-dairy-700">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-6 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-dairy-600/20 active:scale-98 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2 text-center text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
