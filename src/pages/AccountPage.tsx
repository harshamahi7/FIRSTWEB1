import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  Calendar,
  MapPin,
  Heart,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const AccountPage: React.FC = () => {
  const {
    orders,
    subscriptions,
    addresses,
    addAddress,
    wishlist,
    toggleWishlist,
    addToCart,
    openOrderTracking,
    setActivePage,
    setSelectedCategoryFilter,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'orders' | 'subscriptions' | 'addresses' | 'wishlist' | 'profile'
  >('orders');

  const [isAddingAddr, setIsAddingAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: 'Harsha Vardhan',
    phone: '+91 98480 22334',
    flat: '',
    street: '',
    area: '',
    city: 'Visakhapatnam',
    pincode: '530017',
    tag: 'Home' as const,
  });

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleSaveAddr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.flat || !newAddr.area) return;
    addAddress({ ...newAddr, isDefault: false });
    setIsAddingAddr(false);
  };

  return (
    <div className="bg-[#fafbf9] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-dairy-800 text-white font-black text-xl flex items-center justify-center shadow-md">
              HV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900">Harsha Vardhan</h1>
                <span className="text-[10px] font-bold bg-dairy-100 text-dairy-800 px-2 py-0.5 rounded-full uppercase">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">+91 98480 22334 • Visakhapatnam, Andhra Pradesh</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('subscriptions')}
              className="px-4 py-2.5 rounded-xl bg-dairy-50 text-dairy-800 hover:bg-dairy-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>{subscriptions.filter((s) => s.status === 'active').length} Active Subscriptions</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: 'My Orders', icon: ShoppingBag, count: orders.length },
            { id: 'subscriptions', label: 'Milk Subscriptions', icon: Calendar, count: subscriptions.length },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
            { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
            { id: 'profile', label: 'Profile Details', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isSel
                    ? 'bg-dairy-900 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                      isSel ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: My Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-gray-900">Order History & Deliveries</h2>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-soft">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 text-base">No orders yet</h3>
                <p className="text-xs text-gray-500 mt-1">Explore our farm fresh milk and delicacies.</p>
                <button
                  onClick={() => setActivePage('products')}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-dairy-700 text-white font-bold text-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              orders.map((order) => {
                let badgeColor = 'bg-emerald-100 text-emerald-800';
                if (order.status === 'Preparing') badgeColor = 'bg-sky-100 text-sky-800';
                if (order.status === 'Out for Delivery') badgeColor = 'bg-amber-100 text-amber-800';
                if (order.status === 'Cancelled') badgeColor = 'bg-rose-100 text-rose-800';

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-soft space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gray-500">
                            {order.orderNumber}
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${badgeColor}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">Placed on {order.date}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-base font-black text-gray-900">₹{order.total}</div>
                          <span className="text-[10px] text-gray-400">{order.paymentMethod}</span>
                        </div>

                        <button
                          onClick={() => openOrderTracking(order)}
                          className="px-3.5 py-2 rounded-xl bg-dairy-700 hover:bg-dairy-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Order</span>
                        </button>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-2.5 rounded-2xl bg-gray-50/70 border border-gray-100"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-gray-900 truncate">{item.name}</h4>
                            <p className="text-[11px] text-gray-500">
                              {item.quantity} × {item.packSize} • ₹{item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-gray-500 flex items-center justify-between pt-1">
                      <span>Delivery Slot: <strong>{order.deliverySlot}</strong></span>
                      <span>Address: <strong>{order.deliveryAddress.area}, {order.deliveryAddress.city}</strong></span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: Subscriptions */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">Your Daily Milk Routine</h2>
              <button
                onClick={() => setActivePage('subscriptions')}
                className="text-xs font-bold text-dairy-800 hover:underline flex items-center gap-1"
              >
                <span>Full Subscription Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white rounded-3xl p-5 border border-gray-100 shadow-soft space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={sub.productImage}
                      alt={sub.productName}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">{sub.productName}</h3>
                      <p className="text-xs text-gray-500">
                        {sub.quantity} pack(s) • {sub.packSize} • {sub.frequency}
                      </p>
                      <span className="text-xs font-black text-dairy-800">
                        ₹{sub.estimatedMonthlyCost} / mo
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl">
                    Next delivery: <strong>{sub.nextDeliveryDate}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">Delivery Addresses</h2>
              {!isAddingAddr && (
                <button
                  onClick={() => setIsAddingAddr(true)}
                  className="text-xs font-bold text-dairy-800 bg-dairy-50 hover:bg-dairy-100 px-3 py-1.5 rounded-xl flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Address</span>
                </button>
              )}
            </div>

            {isAddingAddr && (
              <form onSubmit={handleSaveAddr} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft space-y-3 text-xs">
                <h3 className="font-bold text-sm text-gray-900">New Address</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-600 block mb-1">House / Flat No.</label>
                    <input
                      type="text"
                      required
                      value={newAddr.flat}
                      onChange={(e) => setNewAddr({ ...newAddr, flat: e.target.value })}
                      className="w-full p-2 bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-600 block mb-1">Street / Landmark</label>
                    <input
                      type="text"
                      required
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      className="w-full p-2 bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-gray-600 block mb-1">Area</label>
                    <input
                      type="text"
                      required
                      value={newAddr.area}
                      onChange={(e) => setNewAddr({ ...newAddr, area: e.target.value })}
                      className="w-full p-2 bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-600 block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="w-full p-2 bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-600 block mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      className="w-full p-2 bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingAddr(false)}
                    className="px-3 py-1.5 text-xs text-gray-500 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-dairy-700 text-white rounded-xl text-xs font-bold"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-soft space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">{addr.name}</span>
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full uppercase">
                      {addr.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {addr.flat}, {addr.street}, {addr.area}
                  </p>
                  <p className="text-xs text-gray-500">
                    {addr.city} - {addr.pincode} • Phone: {addr.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-gray-900">Saved Wishlist Products</h2>

            {wishlistProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-soft">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 text-base">Your wishlist is empty</h3>
                <p className="text-xs text-gray-500 mt-1">Tap the heart icon on any product to save it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-3xl p-4 border border-gray-100 shadow-soft flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1">
                          {p.name}
                        </h4>
                        <p className="text-xs text-gray-500">{p.packSize}</p>
                        <span className="text-xs font-black text-dairy-900">₹{p.price}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => addToCart(p)}
                        className="px-3 py-1.5 rounded-xl bg-dairy-700 hover:bg-dairy-800 text-white text-xs font-bold shadow-sm"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-[11px] text-gray-400 hover:text-rose-500 text-center"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft max-w-xl space-y-4 text-xs">
            <h2 className="text-base font-black text-gray-900">Profile & Contact Preferences</h2>
            <div className="space-y-3">
              <div>
                <label className="font-bold text-gray-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Harsha Vardhan"
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="font-bold text-gray-600 block mb-1">Primary Mobile Number</label>
                <input
                  type="text"
                  defaultValue="+91 98480 22334"
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="font-bold text-gray-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="harsha@visakhadairy.demo"
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                />
              </div>
              <div className="pt-2">
                <button className="px-5 py-2.5 bg-dairy-700 text-white font-bold rounded-xl">
                  Update Profile Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
