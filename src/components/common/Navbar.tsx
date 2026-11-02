import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Calendar,
  Phone,
  FileText,
  Building,
  ShieldCheck,
  Truck,
  Leaf,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CITIES } from '../../data/retailers';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    currentCity,
    setCurrentCity,
    openSubscribeModal,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isCorporateDropdownOpen, setIsCorporateDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'subscriptions', label: 'Daily Milk' },
    { id: 'about', label: 'About Us' },
    { id: 'quality', label: 'Dairy & Quality' },
    { id: 'retailers', label: 'Find Stores' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Utility Strip */}
      <div className="bg-dairy-950 text-white text-[11px] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-dairy-200">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-semibold text-white">Delivering Fresh Since 5:30 AM</span>
            </span>
            <span className="hidden md:inline text-dairy-700">|</span>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-dairy-400" />
              <span>ISO 22000 & FSSAI Certified</span>
            </span>
            <span className="hidden lg:inline text-dairy-700">|</span>
            <span className="hidden lg:flex items-center gap-1">
              <Leaf className="w-3 h-3 text-dairy-400" />
              <span>100% Cooperative Dairy</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-dairy-200">
            <button
              onClick={() => setActivePage('downloads')}
              className="hidden sm:inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <FileText className="w-3 h-3 text-dairy-400" />
              <span>Downloads</span>
            </button>
            <a
              href="tel:08912517230"
              className="inline-flex items-center gap-1 text-white font-semibold hover:text-dairy-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-dairy-400" />
              <span>0891-2517230</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-elevated py-2.5'
            : 'bg-white border-b border-gray-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-dairy-600 to-dairy-800 p-1.5 shadow-lg shadow-dairy-600/20 flex items-center justify-center transition-transform group-hover:scale-105">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#34d399" strokeWidth="4" strokeDasharray="6 3" />
                <path d="M50 16 C38 34 26 48 26 64 C26 78 36 86 50 86 C64 86 74 78 74 64 C74 48 62 34 50 16 Z" fill="#ffffff" />
                <circle cx="50" cy="62" r="8" fill="#059669" />
                <path d="M42 45 Q50 38 58 45" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900">
                  VISAKHA<span className="text-dairy-600 ml-0.5">DAIRY</span>
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium hidden sm:block leading-none">
                Pure Dairy Since 1973
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-dairy-700 bg-dairy-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-dairy-500 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Corporate Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCorporateDropdownOpen(!isCorporateDropdownOpen)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1 transition-all ${
                  ['downloads', 'corporate'].includes(activePage)
                    ? 'text-dairy-700 bg-dairy-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Corporate</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isCorporateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCorporateDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCorporateDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-elevated border border-gray-100 py-1.5 z-50 animate-fade-in-down"
                >
                  {[
                    { page: 'corporate', label: 'Board & Management', icon: Building },
                    { page: 'downloads', label: 'Tenders & Price Lists', icon: FileText },
                    { page: 'quality', label: 'Quality Certifications', icon: ShieldCheck },
                  ].map((item) => (
                    <button
                      key={item.page}
                      onClick={() => { setActivePage(item.page); setIsCorporateDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-dairy-50 hover:text-dairy-700 flex items-center gap-2.5 transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-dairy-500" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* City Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-dairy-500" />
                <span className="truncate max-w-[80px]">{currentCity}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {isCityDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCityDropdownOpen(false)}
                  className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-elevated border border-gray-100 py-1.5 z-50 animate-fade-in-down"
                >
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Delivery City
                  </div>
                  {CITIES.filter((c) => c !== 'All Cities').map((city) => (
                    <button
                      key={city}
                      onClick={() => { setCurrentCity(city); setIsCityDropdownOpen(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between ${
                        currentCity === city
                          ? 'text-dairy-700 bg-dairy-50'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{city}</span>
                      {currentCity === city && <span className="w-1.5 h-1.5 rounded-full bg-dairy-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setActivePage('account')}
              className={`p-2.5 rounded-xl transition-colors ${
                activePage === 'account'
                  ? 'bg-dairy-50 text-dairy-700'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl text-gray-700 bg-gray-50 hover:bg-dairy-50 hover:text-dairy-700 transition-colors border border-gray-200"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-coral text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Subscribe CTA */}
            <button
              onClick={() => openSubscribeModal()}
              className="hidden sm:inline-flex items-center gap-1.5 bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-dairy-600/20 hover:shadow-lg transition-all active:scale-95"
            >
              <Truck className="w-4 h-4" />
              <span>Subscribe</span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 space-y-3 animate-fade-in-down">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-dairy-500" />
                <select
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  className="text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5"
                >
                  {CITIES.filter((c) => c !== 'All Cities').map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { setActivePage(link.id); setIsMobileMenuOpen(false); }}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    activePage === link.id
                      ? 'bg-dairy-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setActivePage('corporate'); setIsMobileMenuOpen(false); }}
                className="text-left px-4 py-3 rounded-xl text-sm font-semibold bg-gray-50 text-gray-700"
              >
                Corporate
              </button>
              <button
                onClick={() => { setActivePage('downloads'); setIsMobileMenuOpen(false); }}
                className="text-left px-4 py-3 rounded-xl text-sm font-semibold bg-gray-50 text-gray-700"
              >
                Downloads
              </button>
            </div>

            <button
              onClick={() => { openSubscribeModal(); setIsMobileMenuOpen(false); }}
              className="w-full py-3.5 bg-dairy-600 hover:bg-dairy-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Subscribe to Daily Milk</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};
