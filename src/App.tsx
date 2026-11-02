import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { ToastContainer } from './components/common/Toast';
import { SearchModal } from './components/common/SearchModal';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { SubscriptionModal } from './components/subscription/SubscriptionModal';
import { OrderTrackingModal } from './components/tracking/OrderTrackingModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { RetailerLocatorPage } from './pages/RetailerLocatorPage';
import { AboutPage } from './pages/AboutPage';
import { QualityPage } from './pages/QualityPage';
import { CorporatePage } from './pages/CorporatePage';
import { DownloadsPage } from './pages/DownloadsPage';
import { AccountPage } from './pages/AccountPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { activePage } = useStore();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'subscriptions':
        return <SubscriptionsPage />;
      case 'retailers':
        return <RetailerLocatorPage />;
      case 'about':
        return <AboutPage />;
      case 'quality':
        return <QualityPage />;
      case 'corporate':
        return <CorporatePage />;
      case 'downloads':
        return <DownloadsPage />;
      case 'account':
        return <AccountPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbf9] text-gray-900 selection:bg-dairy-100 selection:text-dairy-900">
      <Navbar />

      <main className="flex-1">
        {renderActivePage()}
      </main>

      <Footer />

      {/* Mobile Experience: Dedicated Bottom Bar */}
      <MobileBottomNav />

      {/* Global Interactive Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <SubscriptionModal />
      <OrderTrackingModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
