import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Pause,
  Play,
  XCircle,
  Plus,
  Minus,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  Truck,
  ArrowRight,
  Edit2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const SubscriptionsPage: React.FC = () => {
  const {
    subscriptions,
    openSubscribeModal,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    updateSubscriptionQuantity,
  } = useStore();

  const [editingSubId, setEditingSubId] = useState<string | null>(null);

  return (
    <div className="bg-[#fafffe] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-dairy-900 via-dairy-800 to-dairy-950 text-white rounded-3xl p-8 sm:p-12 shadow-premium relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cream-300 text-xs font-semibold border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Doorstep Cold-Chain Daily Routine</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Visakha Daily Milk <span className="text-cream-300">Subscription</span>
            </h1>

            <p className="text-sm sm:text-base text-dairy-200 leading-relaxed font-normal">
              Experience the joy of waking up to fresh, chilled milk at your door every morning by 5:30 AM. Pause, modify, or cancel whenever you travel with full schedule control.
            </p>

            <div className="pt-2">
              <button
                onClick={() => openSubscribeModal()}
                className="px-7 py-3.5 rounded-xl bg-cream-400 hover:bg-cream-300 text-gray-950 font-bold text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Start New Milk Subscription</span>
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-card">
            <Truck className="w-6 h-6 text-dairy-600 mb-2" />
            <h4 className="font-bold text-sm text-gray-900">5:30 AM Delivery</h4>
            <p className="text-xs text-gray-500 mt-1">Guaranteed morning doorstep delivery before your kettle boils.</p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-card">
            <Sparkles className="w-6 h-6 text-dairy-600 mb-2" />
            <h4 className="font-bold text-sm text-gray-900">5% Subscriber Discount</h4>
            <p className="text-xs text-gray-500 mt-1">Save on every pouch compared to daily retail buying.</p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-card">
            <Pause className="w-6 h-6 text-dairy-600 mb-2" />
            <h4 className="font-bold text-sm text-gray-900">Holiday & Vacation Pause</h4>
            <p className="text-xs text-gray-500 mt-1">Traveling out of station? Pause with 1 click and resume on return.</p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-card">
            <ShieldCheck className="w-6 h-6 text-dairy-600 mb-2" />
            <h4 className="font-bold text-sm text-gray-900">100% Zero Delivery Fee</h4>
            <p className="text-xs text-gray-500 mt-1">No packaging or extra doorstep delivery surcharge whatsoever.</p>
          </div>
        </div>

        {/* Active Subscriptions Dashboard */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Active Subscriptions Dashboard
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage your daily deliveries, pause dates, or update daily quantities.
              </p>
            </div>

            <button
              onClick={() => openSubscribeModal()}
              className="px-4 py-2 bg-dairy-600 hover:bg-dairy-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Variant</span>
            </button>
          </div>

          {subscriptions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-card space-y-3">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-base font-bold text-gray-800">No active subscriptions yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Set up a daily morning delivery of Visakha Toned or Cow Milk. Pause anytime with 1 click.
              </p>
              <button
                onClick={() => openSubscribeModal()}
                className="mt-2 px-6 py-2.5 bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Subscribe Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {subscriptions.map((sub) => {
                const isPaused = sub.status === 'paused';
                return (
                  <div
                    key={sub.id}
                    className={`p-6 rounded-2xl border transition-all bg-white shadow-card flex flex-col justify-between ${
                      isPaused ? 'border-amber-200 bg-amber-50/20' : 'border-gray-100 hover:border-dairy-200'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Sub Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={sub.productImage}
                            alt={sub.productName}
                            className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                          />
                          <div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                isPaused
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-dairy-100 text-dairy-800'
                              }`}
                            >
                              {sub.status.toUpperCase()}
                            </span>
                            <h3 className="font-extrabold text-base text-gray-900 mt-1">
                              {sub.productName}
                            </h3>
                            <p className="text-xs text-gray-500">
                              Pack: {sub.packSize} • {sub.frequency.toUpperCase()}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-gray-400">Monthly Approx</div>
                          <div className="text-base font-extrabold text-dairy-700">
                            ₹{sub.estimatedMonthlyCost}
                          </div>
                        </div>
                      </div>

                      {/* Schedule Specs */}
                      <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div>
                          <span className="text-gray-400 block text-[10px]">NEXT DELIVERY</span>
                          <span className="font-bold text-gray-900">
                            {isPaused ? 'PAUSED' : sub.nextDeliveryDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">TIME WINDOW</span>
                          <span className="font-bold text-gray-900">{sub.deliveryTimeSlot}</span>
                        </div>
                        <div className="col-span-2 pt-1 border-t border-gray-200">
                          <span className="text-gray-400 block text-[10px]">ADDRESS</span>
                          <span className="text-gray-700 line-clamp-1">{sub.addressText}</span>
                        </div>
                      </div>

                      {/* Quantity Stepper when Editing */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">Daily Quantity:</span>
                          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                            <button
                              onClick={() => updateSubscriptionQuantity(sub.id, -1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded text-gray-700 font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-bold text-gray-900">
                              {sub.quantity}
                            </span>
                            <button
                              onClick={() => updateSubscriptionQuantity(sub.id, 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded text-gray-700 font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <span className="text-xs text-gray-400">
                          Started: {sub.startDate}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Controls */}
                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                      {isPaused ? (
                        <button
                          onClick={() => resumeSubscription(sub.id)}
                          className="px-4 py-2 bg-dairy-600 hover:bg-dairy-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Resume Daily Drop</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => pauseSubscription(sub.id)}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Pause for Vacation</span>
                        </button>
                      )}

                      <button
                        onClick={() => cancelSubscription(sub.id)}
                        className="text-xs text-gray-400 hover:text-brand-coral font-medium transition-colors"
                      >
                        Cancel Plan
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
