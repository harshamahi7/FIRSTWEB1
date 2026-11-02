import React, { useState } from 'react';
import {
  X,
  Calendar,
  Check,
  Truck,
  ShieldCheck,
  Clock,
  Plus,
  Minus,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { SubscriptionFrequency } from '../../types';

export const SubscriptionModal: React.FC = () => {
  const {
    isSubscribeModalOpen,
    closeSubscribeModal,
    subscribeProduct,
    addSubscription,
    addresses,
    setActivePage,
  } = useStore();

  const milkProducts = PRODUCTS.filter((p) =>
    ['fresh-milk', 'uht-milk', 'curd-yogurt'].includes(p.category)
  );

  const initialProd = subscribeProduct || milkProducts[0];
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProd.id);
  const selectedProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || initialProd;

  const [packSize, setPackSize] = useState<string>(selectedProduct.packSize);
  const [quantity, setQuantity] = useState<number>(2);
  const [frequency, setFrequency] = useState<SubscriptionFrequency>('daily');
  const [customDays, setCustomDays] = useState<string[]>(['Mon', 'Wed', 'Fri']);
  const [durationDays, setDurationDays] = useState<number>(30);
  const [slot, setSlot] = useState<'Morning (5:30 AM - 7:30 AM)' | 'Evening (4:30 PM - 7:00 PM)'>(
    'Morning (5:30 AM - 7:30 AM)'
  );
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses[0]?.id || '');

  if (!isSubscribeModalOpen) return null;

  const chosenAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const currentOption = selectedProduct.packSizes.find((o) => o.size === packSize) || {
    size: selectedProduct.packSize,
    price: selectedProduct.price,
  };

  let deliveryDaysCount = durationDays;
  if (frequency === 'alternate') {
    deliveryDaysCount = Math.ceil(durationDays / 2);
  } else if (frequency === 'weekly') {
    deliveryDaysCount = Math.ceil(durationDays / 7);
  } else if (frequency === 'custom') {
    deliveryDaysCount = Math.round(durationDays * (customDays.length / 7));
  }

  const baseCost = currentOption.price * quantity * deliveryDaysCount;
  const estimatedCost = Math.round(baseCost * 0.95);

  const toggleCustomDay = (day: string) => {
    if (customDays.includes(day)) {
      if (customDays.length > 1) {
        setCustomDays(customDays.filter((d) => d !== day));
      }
    } else {
      setCustomDays([...customDays, day]);
    }
  };

  const handleCreateSubscription = () => {
    const tomorrow = new Date(Date.now() + 86400000);
    const startStr = tomorrow.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    addSubscription({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productImage: selectedProduct.image,
      packSize: packSize,
      quantity,
      frequency,
      customDays: frequency === 'custom' ? customDays : undefined,
      startDate: startStr,
      durationDays,
      deliveryTimeSlot: slot,
      addressId: chosenAddress.id,
      addressText: `${chosenAddress.flat}, ${chosenAddress.area}, ${chosenAddress.city}`,
      estimatedMonthlyCost: estimatedCost,
      status: 'active',
      nextDeliveryDate: `Tomorrow, ${startStr} (Morning)`,
    });

    setActivePage('subscriptions');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale-in">
        {/* Header with Visual Banner */}
        <div className="relative bg-gradient-to-r from-dairy-700 to-dairy-800 text-white p-6 sm:p-7">
          <button
            onClick={closeSubscribeModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-cream-400 text-gray-900 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Sunrise Doorstep Routine
            </span>
            <span className="text-xs text-dairy-200">5:30 AM Chilled Delivery</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Subscribe to Daily Farm-Fresh Milk
          </h2>
          <p className="text-xs sm:text-sm text-dairy-200 mt-1 max-w-xl">
            Never run out of pure milk. Delivered quietly at 5:30 AM before sunrise, directly from our chilled cooperative cold-chain.
          </p>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step 1: Product Selection */}
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2.5">
              1. Select Dairy Product:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {milkProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProductId(p.id);
                    setPackSize(p.packSize);
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                    selectedProductId === p.id
                      ? 'border-dairy-600 bg-dairy-50/60 shadow-sm'
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">{p.name}</h4>
                    <span className="text-xs font-extrabold text-dairy-700">₹{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pack Size & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                Pack Size:
              </label>
              <div className="flex gap-2">
                {selectedProduct.packSizes.map((opt) => (
                  <button
                    key={opt.size}
                    onClick={() => setPackSize(opt.size)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      packSize === opt.size
                        ? 'bg-dairy-600 text-white border-dairy-600 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {opt.size} (₹{opt.price})
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                Daily Quantity:
              </label>
              <div className="flex items-center bg-gray-100 rounded-xl p-1 text-gray-800 w-fit">
                <button
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                  className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center font-bold text-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm">{quantity} pkts</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center font-bold text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Frequency */}
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2.5">
              2. Delivery Frequency:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'daily', label: 'Everyday', desc: 'Daily Sunrise Drop' },
                { id: 'alternate', label: 'Alternate Days', desc: 'Every 2nd Day' },
                { id: 'weekly', label: 'Weekly', desc: 'Every 7 Days' },
                { id: 'custom', label: 'Custom Days', desc: 'Pick Specific Days' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFrequency(f.id as any)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    frequency === f.id
                      ? 'bg-dairy-50 border-dairy-600 text-dairy-900 shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-xs font-bold">{f.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{f.desc}</div>
                </button>
              ))}
            </div>

            {frequency === 'custom' && (
              <div className="mt-3 p-3 bg-gray-50 rounded-2xl border border-gray-200 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-gray-600 mr-2">Deliver on:</span>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleCustomDay(day)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      customDays.includes(day)
                        ? 'bg-dairy-600 text-white shadow-xs'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 3: Delivery Slot & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                Preferred Time Window:
              </label>
              <div className="space-y-2">
                {[
                  'Morning (5:30 AM - 7:30 AM)',
                  'Evening (4:30 PM - 7:00 PM)',
                ].map((s) => (
                  <label
                    key={s}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs font-semibold ${
                      slot === s
                        ? 'border-dairy-600 bg-dairy-50/50 text-dairy-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="slot"
                      checked={slot === s}
                      onChange={() => setSlot(s as any)}
                      className="accent-dairy-600"
                    />
                    <Clock className="w-3.5 h-3.5 text-dairy-600" />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                Subscription Plan Duration:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { days: 15, label: '15 Days Trial' },
                  { days: 30, label: '30 Days Monthly' },
                  { days: 90, label: '90 Days Quarterly' },
                ].map((d) => (
                  <button
                    key={d.days}
                    onClick={() => setDurationDays(d.days)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border text-center transition-all ${
                      durationDays === d.days
                        ? 'bg-dairy-600 text-white border-dairy-600 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Delivery Address */}
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
              Delivery Address:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedAddressId === addr.id
                      ? 'border-dairy-600 bg-dairy-50/50'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-900">{addr.tag}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-dairy-100 text-dairy-800 font-bold px-1.5 py-0.2 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {addr.flat}, {addr.area}, {addr.city}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer with Price Breakdown & Action */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900">₹{estimatedCost}</span>
              <span className="text-xs text-gray-400 line-through">₹{baseCost}</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                5% Subscriber Off
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              For {deliveryDaysCount} morning drops ({quantity} pkts / drop) • ₹0 Delivery Fee
            </p>
          </div>

          <button
            onClick={handleCreateSubscription}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-sm shadow-md shadow-dairy-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Confirm & Start Subscription</span>
          </button>
        </div>
      </div>
    </div>
  );
};
