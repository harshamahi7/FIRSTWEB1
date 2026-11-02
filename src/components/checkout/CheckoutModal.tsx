import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  Plus,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Banknote,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { UserAddress } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    addresses,
    addAddress,
    cart,
    subtotal,
    deliveryFee,
    discount,
    total,
    placeOrder,
    openOrderTracking,
    setActivePage,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Address selection
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses[0]?.id || ''
  );
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);
  const [newAddr, setNewAddr] = useState({
    name: 'Harsha Vardhan',
    phone: '+91 98480 22334',
    flat: '',
    street: '',
    area: 'MVP Colony',
    city: 'Visakhapatnam',
    pincode: '530017',
    tag: 'Home' as const,
  });

  // Step 2: Slot & Date
  const tomorrowStr = new Date(Date.now() + 86400000).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const [deliveryDate, setDeliveryDate] = useState<string>(`Tomorrow, ${tomorrowStr}`);
  const [deliverySlot, setDeliverySlot] = useState<string>(
    'Early Morning (05:30 AM - 07:30 AM)'
  );

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Netbanking' | 'Cash on Delivery'>('UPI');
  const [upiId, setUpiId] = useState('user@oksbi');

  if (!isCheckoutOpen) return null;

  const activeAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.flat || !newAddr.street) return;
    addAddress({ ...newAddr, isDefault: false });
    setIsAddingNewAddress(false);
  };

  const handleCompleteOrder = () => {
    if (!activeAddress) return;
    const order = placeOrder({
      address: activeAddress,
      slot: deliverySlot,
      date: deliveryDate,
      paymentMethod,
    });
    openOrderTracking(order);
    setActivePage('account');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">Seamless Dairy Checkout</h2>
            <p className="text-xs text-gray-400 mt-0.5">3 Simple Steps to Fresh Morning Dairy</p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Timeline */}
        <div className="px-6 py-3.5 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-dairy-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              1
            </span>
            <span className={`text-xs font-semibold ${step >= 1 ? 'text-dairy-900' : 'text-gray-400'}`}>
              Address
            </span>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${step >= 2 ? 'bg-dairy-600' : 'bg-gray-200'}`} />

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-dairy-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              2
            </span>
            <span className={`text-xs font-semibold ${step >= 2 ? 'text-dairy-900' : 'text-gray-400'}`}>
              Slot & Date
            </span>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${step >= 3 ? 'bg-dairy-600' : 'bg-gray-200'}`} />

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 3 ? 'bg-dairy-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              3
            </span>
            <span className={`text-xs font-semibold ${step === 3 ? 'text-dairy-900' : 'text-gray-400'}`}>
              Payment
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* STEP 1: Address Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Select Delivery Location:
                </h3>
                {!isAddingNewAddress && (
                  <button
                    onClick={() => setIsAddingNewAddress(true)}
                    className="text-xs font-semibold text-dairy-600 hover:text-dairy-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                )}
              </div>

              {!isAddingNewAddress ? (
                <div className="space-y-2.5">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between ${
                        selectedAddressId === addr.id
                          ? 'border-dairy-600 bg-dairy-50/40'
                          : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900">{addr.name}</span>
                          <span className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-md uppercase">
                            {addr.tag}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {addr.flat}, {addr.street}, {addr.area}
                        </p>
                        <p className="text-xs text-gray-400">
                          {addr.city} - {addr.pincode} • Phone: {addr.phone}
                        </p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedAddressId === addr.id
                            ? 'border-dairy-600 bg-dairy-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedAddressId === addr.id && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <form
                  onSubmit={handleSaveNewAddress}
                  className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                    Add New Delivery Address
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={newAddr.name}
                        onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                      House / Flat No.
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 301, Sri Sai Residency"
                      value={newAddr.flat}
                      onChange={(e) => setNewAddr({ ...newAddr, flat: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                      Street / Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Rythu Bazaar, Double Road"
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">Area</label>
                      <input
                        type="text"
                        value={newAddr.area}
                        onChange={(e) => setNewAddr({ ...newAddr, area: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">City</label>
                      <input
                        type="text"
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">Pincode</label>
                      <input
                        type="text"
                        value={newAddr.pincode}
                        onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(false)}
                      className="text-xs px-3 py-2 rounded-xl text-gray-600 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-xs px-4 py-2 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold transition-colors"
                    >
                      Save & Use
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* STEP 2: Slot & Date */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                  Choose Delivery Date:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    `Tomorrow, ${tomorrowStr}`,
                    `Day After (${new Date(Date.now() + 172800000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })})`,
                    `Select Custom Date`,
                  ].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDeliveryDate(d)}
                      className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                        deliveryDate === d
                          ? 'border-dairy-600 bg-dairy-50/50 text-dairy-950 font-black'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Calendar className="w-4 h-4 text-dairy-600 mb-1" />
                      <span>{d}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                  Select Delivery Slot:
                </h3>
                <div className="space-y-2.5">
                  {[
                    {
                      title: 'Early Morning Slot (Recommended)',
                      slot: 'Early Morning (05:30 AM - 07:30 AM)',
                      sub: 'Perfect for fresh morning tea, coffee & children milk.',
                    },
                    {
                      title: 'Evening Slot',
                      slot: 'Evening (04:30 PM - 07:00 PM)',
                      sub: 'Freshly arrived afternoon dispatch for dinner prep.',
                    },
                  ].map((s) => (
                    <div
                      key={s.slot}
                      onClick={() => setDeliverySlot(s.slot)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        deliverySlot === s.slot
                          ? 'border-dairy-600 bg-dairy-50/40'
                          : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm text-gray-900">{s.title}</div>
                        <div className="text-xs font-extrabold text-dairy-700 mt-0.5">{s.slot}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{s.sub}</div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          deliverySlot === s.slot
                            ? 'border-dairy-600 bg-dairy-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {deliverySlot === s.slot && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Payment & Order Summary */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                  Choose Payment Method:
                </h3>

                <div className="space-y-2.5">
                  {[
                    {
                      id: 'UPI',
                      label: 'UPI (Google Pay, PhonePe, Paytm, BHIM)',
                      icon: Smartphone,
                      badge: 'Zero Extra Fee',
                    },
                    {
                      id: 'Card',
                      label: 'Credit / Debit Card (Visa, RuPay, Mastercard)',
                      icon: CreditCard,
                    },
                    {
                      id: 'Cash on Delivery',
                      label: 'Cash on Delivery (Pay at Doorstep)',
                      icon: Banknote,
                      badge: 'Convenient',
                    },
                  ].map((p) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setPaymentMethod(p.id as any)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          paymentMethod === p.id
                            ? 'border-dairy-600 bg-dairy-50/40'
                            : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-900">{p.label}</div>
                            {p.badge && (
                              <span className="text-[10px] text-dairy-700 font-semibold">
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            paymentMethod === p.id
                              ? 'border-dairy-600 bg-dairy-600'
                              : 'border-gray-300'
                          }`}
                        >
                          {paymentMethod === p.id && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Review Snippet */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
                <div className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-1">
                  Delivery Destination:
                </div>
                <div className="text-gray-700">
                  <strong>{activeAddress.name}</strong> • {activeAddress.flat}, {activeAddress.street}, {activeAddress.area}, {activeAddress.city} - {activeAddress.pincode}
                </div>
                <div className="text-dairy-700 font-semibold pt-1 border-t border-gray-200">
                  Slot: {deliveryDate} ({deliverySlot})
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-gray-400 font-medium">Order Total:</div>
            <div className="text-xl font-extrabold text-dairy-800">₹{total}</div>
          </div>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-100 transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep((prev) => (prev + 1) as any)}
                className="px-6 py-2.5 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-dairy-600/20 active:scale-95 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleCompleteOrder}
                className="px-6 py-2.5 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-dairy-600/25 active:scale-95 transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Place Order (₹{total})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
