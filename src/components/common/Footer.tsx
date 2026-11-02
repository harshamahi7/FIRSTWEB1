import React from 'react';
import {
  ShieldCheck,
  Award,
  Phone,
  Mail,
  MapPin,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  CheckCircle,
  Truck,
  Download,
  CreditCard,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setActivePage('products');
  };

  return (
    <footer className="bg-dairy-950 text-white pt-16 pb-24 lg:pb-12 border-t border-dairy-900 mt-20 relative">
      {/* Top Value Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-dairy-900/90 rounded-2xl p-6 sm:p-8 border border-dairy-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-dairy-800/80 flex items-center justify-center flex-shrink-0 text-dairy-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">100% Pure & Lab Tested</h4>
              <p className="text-dairy-300 text-xs mt-0.5">32 stringent parameters tested at 4 quality checkpoints</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-dairy-800/80 flex items-center justify-center flex-shrink-0 text-cream-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Direct From 3.5 Lakh Farmers</h4>
              <p className="text-dairy-300 text-xs mt-0.5">Grassroots cooperative movement sustaining dairy families since 1973</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-dairy-800/80 flex items-center justify-center flex-shrink-0 text-ocean-300">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">5:30 AM Sunrise Doorstep Drop</h4>
              <p className="text-dairy-300 text-xs mt-0.5">Cold chain maintained under 4°C directly to your door</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-dairy-900/80">
          {/* Brand Info & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dairy-500 to-dairy-700 p-1.5 flex items-center justify-center shadow-md">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                  <path
                    d="M50 16 C38 34 26 48 26 64 C26 78 36 86 50 86 C64 86 74 78 74 64 C74 48 62 34 50 16 Z"
                    fill="#ffffff"
                  />
                  <circle cx="50" cy="62" r="8" fill="#047857" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white uppercase">
                  VISAKHA <span className="text-dairy-400">DAIRY</span>
                </span>
                <p className="text-[11px] text-dairy-300 font-medium">Sri Vijaya Visakha Milk Producers Company Ltd.</p>
              </div>
            </div>

            <p className="text-sm text-dairy-200 leading-relaxed pr-6">
              "Pure Dairy. Trusted by Generations." Operating on unyielding cooperative values to provide wholesome, nutritious milk and dairy delicacies while uplifting dairy farming families across Andhra Pradesh.
            </p>

            <div className="space-y-2 text-xs text-dairy-300 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-dairy-400 flex-shrink-0 mt-0.5" />
                <span>Head Office: Akkireddypalem, Opp. BHEL, Visakhapatnam - 530012, Andhra Pradesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-dairy-400 flex-shrink-0" />
                <span>(+91) (0891) 2517230 / 2517290 / 2517555</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-dairy-400 flex-shrink-0" />
                <span>marketing@visakhadairy.com | md@visakhadairy.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-2.5 pt-2">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-8 h-8 rounded-lg bg-dairy-900 hover:bg-dairy-800 flex items-center justify-center text-dairy-300 hover:text-white transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column: Visakha Dairy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-dairy-400 mb-4">
              Visakha Dairy
            </h4>
            <ul className="space-y-2.5 text-sm text-dairy-200">
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-dairy-300 transition-colors">
                  About Us & History
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('quality')} className="hover:text-dairy-300 transition-colors">
                  Dairy & Quality Testing
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-dairy-300 transition-colors">
                  Empowering Farmers
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('corporate')} className="hover:text-dairy-300 transition-colors">
                  Welfare Trust (MP & EEH)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('corporate')} className="hover:text-dairy-300 transition-colors">
                  Careers & Culture
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('corporate')} className="hover:text-dairy-300 transition-colors">
                  Board of Directors
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-dairy-400 mb-4">
              Dairy Products
            </h4>
            <ul className="space-y-2.5 text-sm text-dairy-200">
              {[
                { id: 'fresh-milk', label: 'Fresh Cow & Toned Milk' },
                { id: 'curd-yogurt', label: 'Thick Curd & Yogurt' },
                { id: 'ghee', label: 'Amruth Pure Cow Ghee' },
                { id: 'paneer', label: 'Fresh Malai Paneer' },
                { id: 'butter', label: 'Table Butter' },
                { id: 'sweets', label: 'Traditional Sweets & Peda' },
                { id: 'bakery', label: 'Bakery & Milk Bread' },
                { id: 'ice-cream', label: 'Real Milk Ice Cream' },
              ].map((p) => (
                <li key={p.id}>
                  <button onClick={() => handleCategoryNav(p.id)} className="hover:text-dairy-300 transition-colors">
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Customer & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-dairy-400 mb-4">
              Customer & Services
            </h4>
            <ul className="space-y-2.5 text-sm text-dairy-200">
              <li>
                <button onClick={() => setActivePage('account')} className="hover:text-dairy-300 transition-colors">
                  My Profile & Orders
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('subscriptions')} className="hover:text-dairy-300 transition-colors">
                  Daily Milk Subscriptions
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('retailers')} className="hover:text-dairy-300 transition-colors">
                  Find Nearest Stores
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('downloads')} className="hover:text-dairy-300 transition-colors">
                  Downloads & Rate Lists
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('corporate')} className="hover:text-dairy-300 transition-colors">
                  Vendor Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('corporate')} className="hover:text-dairy-300 transition-colors">
                  Stockist & Franchise Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-dairy-300 transition-colors">
                  Customer Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment & Security Strip */}
        <div className="py-6 border-b border-dairy-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dairy-300">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">Accepted Payments:</span>
            <div className="flex items-center gap-2 text-dairy-300">
              <span className="bg-dairy-900 px-2.5 py-1 rounded-md border border-dairy-800 font-semibold text-[11px]">UPI</span>
              <span className="bg-dairy-900 px-2.5 py-1 rounded-md border border-dairy-800 font-semibold text-[11px]">RuPay</span>
              <span className="bg-dairy-900 px-2.5 py-1 rounded-md border border-dairy-800 font-semibold text-[11px]">Visa</span>
              <span className="bg-dairy-900 px-2.5 py-1 rounded-md border border-dairy-800 font-semibold text-[11px]">Mastercard</span>
              <span className="bg-dairy-900 px-2.5 py-1 rounded-md border border-dairy-800 font-semibold text-[11px]">Cash on Delivery</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-dairy-300">
            <ShieldCheck className="w-4 h-4 text-dairy-400" />
            <span>256-bit SSL Secure Checkout & Encrypted Payments</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-dairy-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {new Date().getFullYear()} Sri Vijaya Visakha Milk Producers Company Ltd. All rights reserved.</span>
            <span>•</span>
            <span>FSSAI Lic. No: 10012044000165</span>
            <span>•</span>
            <span>CIN: U15209AP2006PTC048793</span>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">Refund Policy</button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-dairy-900 hover:bg-dairy-800 text-dairy-300 hover:text-white transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
