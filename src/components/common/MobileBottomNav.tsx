import React from 'react';
import { Home, Grid, Calendar, ShoppingBag, User } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const { activePage, setActivePage, cartCount, setIsCartOpen, openSubscribeModal } = useStore();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, action: () => setActivePage('home') },
    { id: 'products', label: 'Products', icon: Grid, action: () => setActivePage('products') },
    {
      id: 'subscriptions',
      label: 'Subscribe',
      icon: Calendar,
      action: () => openSubscribeModal(),
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingBag,
      badge: cartCount,
      action: () => setIsCartOpen(true),
    },
    { id: 'account', label: 'Account', icon: User, action: () => setActivePage('account') },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive ? 'text-dairy-600 scale-105' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-brand-coral text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-dairy-600 absolute bottom-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
