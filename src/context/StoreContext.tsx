import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Order, Product, Subscription, UserAddress, SubscriptionFrequency } from '../types';
import { PRODUCTS } from '../data/products';
import { INITIAL_ADDRESSES, INITIAL_ORDERS, INITIAL_SUBSCRIPTIONS } from '../data/mockOrders';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation / Page Routing
  activePage: string;
  setActivePage: (page: string) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (catId: string | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Location
  currentCity: string;
  setCurrentCity: (city: string) => void;

  // Product Detail Modal
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  appliedCoupon: string | null;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, packSize?: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Subscriptions
  subscriptions: Subscription[];
  isSubscribeModalOpen: boolean;
  subscribeProduct: Product | null;
  openSubscribeModal: (product?: Product) => void;
  closeSubscribeModal: () => void;
  addSubscription: (newSub: Omit<Subscription, 'id' | 'createdAt'>) => void;
  pauseSubscription: (id: string) => void;
  resumeSubscription: (id: string) => void;
  cancelSubscription: (id: string) => void;
  updateSubscriptionQuantity: (id: string, qty: number) => void;

  // Orders & Checkout
  orders: Order[];
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  addresses: UserAddress[];
  addAddress: (addr: Omit<UserAddress, 'id'>) => void;
  placeOrder: (details: {
    address: UserAddress;
    slot: string;
    date: string;
    paymentMethod: 'UPI' | 'Card' | 'Netbanking' | 'Cash on Delivery';
  }) => Order;

  // Order Tracking Modal
  trackingOrder: Order | null;
  openOrderTracking: (order: Order) => void;
  closeOrderTracking: () => void;

  // Toast
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePageState] = useState<string>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Location
  const [currentCity, setCurrentCity] = useState<string>('Visakhapatnam');

  // Product Detail
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'prod-toned-milk-500 ml',
      productId: 'prod-toned-milk',
      name: 'Visakha Toned Milk',
      packSize: '500 ml',
      price: 29,
      originalPrice: 30,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80',
      category: 'fresh-milk',
    },
    {
      id: 'prod-fresh-curd-pouch-450 g',
      productId: 'prod-fresh-curd-pouch',
      name: 'Visakha Fresh Thick Curd',
      packSize: '450 g',
      price: 34,
      originalPrice: 36,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80',
      category: 'curd-yogurt',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['prod-amruth-cow-ghee', 'prod-doodhpeda']);

  // Subscriptions
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState<boolean>(false);
  const [subscribeProduct, setSubscribeProduct] = useState<Product | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<UserAddress[]>(INITIAL_ADDRESSES);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setActivePage = (page: string) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  // Cart operations
  const addToCart = (product: Product, packSize?: string, quantity: number = 1) => {
    const chosenSize = packSize || product.packSize;
    const sizeOption = product.packSizes.find((s) => s.size === chosenSize);
    const itemPrice = sizeOption ? sizeOption.price : product.price;
    const itemOriginalPrice = sizeOption ? sizeOption.originalPrice : product.originalPrice;
    const itemId = `${product.id}-${chosenSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          packSize: chosenSize,
          price: itemPrice,
          originalPrice: itemOriginalPrice,
          quantity,
          image: product.image,
          category: product.category,
        },
      ];
    });

    showToast(`Added ${quantity} × ${product.name} (${chosenSize}) to cart!`);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 || subtotal >= 199 ? 0 : 25;
  const discount = appliedCoupon === 'VISAKHA10' ? Math.round(subtotal * 0.1) : appliedCoupon === 'FREEDEL' ? 25 : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VISAKHA10') {
      setAppliedCoupon('VISAKHA10');
      showToast('10% Dairy Discount coupon applied successfully!');
      return true;
    }
    if (clean === 'FREEDEL') {
      setAppliedCoupon('FREEDEL');
      showToast('Free delivery coupon applied!');
      return true;
    }
    showToast('Invalid coupon code. Try VISAKHA10', 'error');
    return false;
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your Wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Subscriptions
  const openSubscribeModal = (product?: Product) => {
    const target = product || PRODUCTS.find((p) => p.id === 'prod-toned-milk') || PRODUCTS[0];
    setSubscribeProduct(target);
    setIsSubscribeModalOpen(true);
  };

  const closeSubscribeModal = () => {
    setIsSubscribeModalOpen(false);
    setSubscribeProduct(null);
  };

  const addSubscription = (newSub: Omit<Subscription, 'id' | 'createdAt'>) => {
    const created: Subscription = {
      ...newSub,
      id: `sub-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setSubscriptions((prev) => [created, ...prev]);
    showToast(`Milk Subscription activated! Delivery starts ${created.startDate}`);
    closeSubscribeModal();
  };

  const pauseSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: 'paused' as const } : sub))
    );
    showToast('Subscription paused. You can resume anytime.', 'info');
  };

  const resumeSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: 'active' as const } : sub))
    );
    showToast('Subscription resumed! Daily delivery reactivated.', 'success');
  };

  const cancelSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: 'cancelled' as const } : sub))
    );
    showToast('Subscription cancelled.', 'info');
  };

  const updateSubscriptionQuantity = (id: string, qty: number) => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          const unitPrice = sub.estimatedMonthlyCost / (sub.quantity * (sub.frequency === 'daily' ? 30 : 15));
          const daysCount = sub.frequency === 'daily' ? 30 : 15;
          return {
            ...sub,
            quantity: qty,
            estimatedMonthlyCost: Math.round(unitPrice * qty * daysCount),
          };
        }
        return sub;
      })
    );
    showToast(`Subscription quantity updated to ${qty} packs`);
  };

  // Addresses
  const addAddress = (newAddr: Omit<UserAddress, 'id'>) => {
    const created: UserAddress = {
      ...newAddr,
      id: `addr-${Date.now().toString().slice(-4)}`,
    };
    setAddresses((prev) => [created, ...prev]);
    showToast('New delivery address saved');
  };

  // Orders
  const placeOrder = ({
    address,
    slot,
    date,
    paymentMethod,
  }: {
    address: UserAddress;
    slot: string;
    date: string;
    paymentMethod: 'UPI' | 'Card' | 'Netbanking' | 'Cash on Delivery';
  }): Order => {
    const orderNumber = `VD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now().toString().slice(-5)}`,
      orderNumber,
      date: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      items: cart.map((c) => ({
        id: c.id,
        productId: c.productId,
        name: c.name,
        packSize: c.packSize,
        price: c.price,
        quantity: c.quantity,
        image: c.image,
      })),
      subtotal,
      deliveryFee,
      discount,
      total,
      status: 'Confirmed',
      deliveryDate: date,
      deliverySlot: slot,
      paymentMethod,
      deliveryAddress: address,
      tracking: [
        {
          status: 'Confirmed',
          time: 'Just now',
          done: true,
          description: 'Order confirmed and registered at Akkireddipalem dairy hub',
        },
        {
          status: 'Preparing',
          time: 'Pending',
          done: false,
          description: 'Packaged cold at 4°C sterile facility',
        },
        {
          status: 'Out for Delivery',
          time: 'Scheduled',
          done: false,
          description: 'Dispatched with insulated cold route agent',
        },
        {
          status: 'Delivered',
          time: 'Estimated',
          done: false,
          description: 'Doorstep safe drop or handover',
        },
      ],
      driverName: 'Ramesh K. (Visakha Route #14)',
      driverPhone: '+91 94401 55678',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Order #${orderNumber} placed successfully!`);
    return newOrder;
  };

  const openOrderTracking = (order: Order) => {
    setTrackingOrder(order);
  };

  const closeOrderTracking = () => {
    setTrackingOrder(null);
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        currentCity,
        setCurrentCity,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        cart,
        cartCount,
        subtotal,
        deliveryFee,
        discount,
        appliedCoupon,
        total,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        subscriptions,
        isSubscribeModalOpen,
        subscribeProduct,
        openSubscribeModal,
        closeSubscribeModal,
        addSubscription,
        pauseSubscription,
        resumeSubscription,
        cancelSubscription,
        updateSubscriptionQuantity,
        orders,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addresses,
        addAddress,
        placeOrder,
        trackingOrder,
        openOrderTracking,
        closeOrderTracking,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
