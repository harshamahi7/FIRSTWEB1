import React from 'react';
import {
  X,
  CheckCircle,
  Clock,
  Truck,
  Package,
  MapPin,
  Phone,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OrderTrackingModal: React.FC = () => {
  const { trackingOrder, closeOrderTracking } = useStore();

  if (!trackingOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-dairy-50 text-dairy-700 px-2 py-0.5 rounded-full">
                Live Tracking
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {trackingOrder.orderNumber}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-gray-900 mt-1">Order Dispatch Status</h2>
          </div>

          <button
            onClick={closeOrderTracking}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Estimated Arrival Banner */}
          <div className="bg-dairy-50/70 rounded-2xl p-4 border border-dairy-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-dairy-600 text-white flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-medium">Estimated Arrival:</span>
                <div className="text-sm font-bold text-gray-900">
                  {trackingOrder.deliveryDate} • {trackingOrder.deliverySlot}
                </div>
              </div>
            </div>

            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-dairy-100 text-dairy-800">
              {trackingOrder.status}
            </span>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-6 pl-2">
            {trackingOrder.tracking.map((step, idx) => {
              const isLast = idx === trackingOrder.tracking.length - 1;
              return (
                <div key={step.status} className="relative flex items-start gap-4">
                  {/* Line connector */}
                  {!isLast && (
                    <div
                      className={`absolute left-3.5 top-7 w-0.5 h-12 ${
                        step.done ? 'bg-dairy-500' : 'bg-gray-200'
                      }`}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors ${
                      step.done
                        ? 'bg-dairy-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold ${
                          step.done ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {step.status}
                      </h4>
                      <span className="text-xs text-gray-400 font-medium">{step.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ordered Products Breakdown */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Basket Items ({trackingOrder.items.length})
            </h4>

            <div className="divide-y divide-gray-100">
              {trackingOrder.items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="text-[11px] text-gray-400">
                        {item.packSize} • Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <span className="font-extrabold text-gray-900">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200 flex justify-between text-xs font-extrabold text-gray-900">
              <span>Paid via {trackingOrder.paymentMethod}</span>
              <span className="text-dairy-700 text-sm">₹{trackingOrder.total}</span>
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
            <MapPin className="w-4 h-4 text-dairy-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-gray-900">Delivery Address:</span>
              <p className="text-gray-600">
                {trackingOrder.deliveryAddress.name} • {trackingOrder.deliveryAddress.flat},{' '}
                {trackingOrder.deliveryAddress.street}, {trackingOrder.deliveryAddress.area},{' '}
                {trackingOrder.deliveryAddress.city} - {trackingOrder.deliveryAddress.pincode}
              </p>
              <p className="text-gray-400 text-[11px]">Phone: {trackingOrder.deliveryAddress.phone}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-dairy-600" />
            <span>Chilled Cold-Chain Assured</span>
          </div>

          <button
            onClick={closeOrderTracking}
            className="px-5 py-2 rounded-xl bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
