import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Phone,
  Clock,
  Navigation,
  Star,
  CheckCircle,
  Filter,
  ExternalLink,
} from 'lucide-react';
import { RETAILERS, CITIES } from '../data/retailers';
import { useStore } from '../context/StoreContext';
import { Retailer } from '../types';

export const RetailerLocatorPage: React.FC = () => {
  const { currentCity, setCurrentCity } = useStore();

  const [searchArea, setSearchArea] = useState('');
  const [selectedCity, setSelectedCity] = useState(currentCity || 'All Cities');
  const [selectedType, setSelectedType] = useState('All');
  const [activeRetailerId, setActiveRetailerId] = useState<string>(RETAILERS[0].id);

  const filteredRetailers = RETAILERS.filter((r) => {
    if (selectedCity !== 'All Cities' && r.city !== selectedCity) return false;
    if (selectedType !== 'All' && r.type !== selectedType) return false;
    if (searchArea.trim()) {
      const q = searchArea.toLowerCase();
      const matchArea = r.area.toLowerCase().includes(q);
      const matchName = r.name.toLowerCase().includes(q);
      const matchAddress = r.address.toLowerCase().includes(q);
      const matchPincode = r.pincode.includes(q);
      if (!matchArea && !matchName && !matchAddress && !matchPincode) return false;
    }
    return true;
  });

  const activeRetailer =
    RETAILERS.find((r) => r.id === activeRetailerId) || filteredRetailers[0] || RETAILERS[0];

  const handleDirections = (retailer: (typeof RETAILERS)[0]) => {
    const query = encodeURIComponent(`${retailer.name}, ${retailer.address}, ${retailer.city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="bg-[#fafffe] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-dairy-700 uppercase tracking-wider mb-2 bg-dairy-50 px-3.5 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-dairy-600" />
            <span>2,800+ Official Network Points</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Find Visakha Dairy <span className="text-gradient">Near You</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl">
            Locate authorized exclusive parlours, super stockists, and fresh dairy marts near your neighborhood.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-card grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* City Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Select City
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-dairy-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  if (e.target.value !== 'All Cities') setCurrentCity(e.target.value);
                }}
                aria-label="Filter retailers by city"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-xl text-xs font-semibold text-gray-800 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-dairy-500"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Area / Landmark Search */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Search Area or Pincode
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchArea}
                onChange={(e) => setSearchArea(e.target.value)}
                placeholder="e.g. MVP Colony, Gajuwaka, 530017"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-xl text-xs font-medium text-gray-800 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-dairy-500"
              />
            </div>
          </div>

          {/* Outlet Type Filter */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Outlet Type
            </label>
            <div className="flex gap-1.5">
              {['All', 'Exclusive Parlour', 'Super Stockist'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-semibold transition-all border ${
                    selectedType === t
                      ? 'bg-dairy-600 text-white border-dairy-600 shadow-xs'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {t === 'Exclusive Parlour' ? 'Parlour' : t === 'Super Stockist' ? 'Stockist' : 'All'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Retailer List + Simulated Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Retailer Cards List */}
          <div className="lg:col-span-6 space-y-3.5 max-h-[750px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold px-1">
              <span>{filteredRetailers.length} locations found</span>
              <span>Updated Daily</span>
            </div>

            {filteredRetailers.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-card">
                <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <h3 className="font-bold text-gray-800 text-sm">No locations found</h3>
                <p className="text-xs text-gray-400 mt-1">Try selecting a different city or clearing search filters.</p>
              </div>
            ) : (
              filteredRetailers.map((r) => {
                const isSelected = r.id === activeRetailerId;
                return (
                  <div
                    key={r.id}
                    onClick={() => setActiveRetailerId(r.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white shadow-card hover:shadow-card-hover ${
                      isSelected
                        ? 'border-dairy-600 ring-2 ring-dairy-500/10'
                        : 'border-gray-100 hover:border-dairy-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              r.type === 'Exclusive Parlour'
                                ? 'bg-dairy-50 text-dairy-700'
                                : 'bg-ocean-50 text-ocean-700'
                            }`}
                          >
                            {r.type}
                          </span>
                          <span className="text-xs text-gray-400">• {r.area}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm mt-1">{r.name}</h3>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{r.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{r.address}</p>

                    <div className="pt-3 mt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-3 text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-dairy-600" />
                          <span>{r.phone}</span>
                        </span>
                        <span className="flex items-center gap-1 text-gray-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{r.timings}</span>
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDirections(r);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-dairy-50 hover:bg-dairy-600 text-dairy-700 hover:text-white font-semibold text-xs transition-colors flex items-center gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Directions</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right: Simulated Map View & Active Location Spotlight */}
          <div className="lg:col-span-6 sticky top-24 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-gray-100 bg-[#e5ebee] h-[450px]">
              {/* Stylized Google Map Background simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-emerald-50/20 to-sky-100">
                {/* SVG Road Network Patterns */}
                <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="120" x2="600" y2="150" stroke="#cbd5e1" strokeWidth="8" />
                  <line x1="180" y1="0" x2="220" y2="500" stroke="#cbd5e1" strokeWidth="12" />
                  <line x1="0" y1="320" x2="600" y2="280" stroke="#cbd5e1" strokeWidth="10" />
                  <line x1="420" y1="0" x2="380" y2="500" stroke="#cbd5e1" strokeWidth="6" />
                  <circle cx="210" cy="140" r="18" fill="#d1fae5" opacity="0.6" />
                  <circle cx="400" cy="300" r="24" fill="#e0f2fe" opacity="0.6" />
                </svg>
              </div>

              {/* Retailer Pins */}
              {filteredRetailers.map((r, i) => {
                const isSelected = r.id === activeRetailer.id;
                // Distribute mock coordinates visually
                const topPct = 25 + ((i * 19) % 55);
                const leftPct = 20 + ((i * 23) % 65);
                return (
                  <div
                    key={r.id}
                    onClick={() => setActiveRetailerId(r.id)}
                    style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 z-10 ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-2xl p-1.5 shadow-lg flex items-center justify-center border-2 border-white transition-colors ${
                        isSelected ? 'bg-dairy-600 text-white' : 'bg-white text-dairy-700'
                      }`}
                    >
                      <MapPin className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                );
              })}

              {/* Inset Store Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-elevated border border-gray-100 z-30">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-dairy-600 uppercase tracking-wider">
                      Selected Location
                    </span>
                    <h4 className="font-bold text-gray-900 text-sm">{activeRetailer.name}</h4>
                    <p className="text-xs text-gray-500">{activeRetailer.address}</p>
                  </div>

                  <button
                    onClick={() => handleDirections(activeRetailer)}
                    className="px-4 py-2 bg-dairy-600 hover:bg-dairy-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 active:scale-95 transition-all flex-shrink-0 ml-2"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Navigate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
