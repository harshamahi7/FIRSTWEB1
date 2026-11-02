import React, { useState } from 'react';
import {
  Building,
  Users,
  Briefcase,
  FileText,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  Mail,
  Phone,
} from 'lucide-react';
import { BOARD_MEMBERS } from '../data/timeline';
import { useStore } from '../context/StoreContext';

export const CorporatePage: React.FC = () => {
  const { setActivePage, showToast } = useStore();
  const [activeTab, setActiveTab] = useState<'board' | 'careers' | 'vendor' | 'stockist'>('board');

  // Vendor inquiry state
  const [vendorForm, setVendorForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: 'Packaging Materials',
    message: '',
  });

  // Stockist inquiry state
  const [stockistForm, setStockistForm] = useState({
    applicantName: '',
    phone: '',
    email: '',
    city: 'Visakhapatnam',
    area: '',
    spaceSqFt: '200',
    type: 'Exclusive Parlour',
  });

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Vendor registration inquiry received! Procurement team will contact you.');
    setVendorForm({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      category: 'Packaging Materials',
      message: '',
    });
  };

  const handleStockistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Stockist/Parlour application submitted! Marketing officer assigned.');
    setStockistForm({
      applicantName: '',
      phone: '',
      email: '',
      city: 'Visakhapatnam',
      area: '',
      spaceSqFt: '200',
      type: 'Exclusive Parlour',
    });
  };

  const careerOpenings = [
    {
      title: 'Senior Dairy Technologist',
      department: 'Production & R&D',
      location: 'Akkireddipalem Dairy Plant, Visakhapatnam',
      experience: '4 - 7 years in UHT / Aseptic dairy operations',
      type: 'Full Time',
    },
    {
      title: 'Quality Assurance Microbiologist',
      department: 'Central Laboratory',
      location: 'Rangampeta Mega Plant, East Godavari',
      experience: '2 - 5 years in food safety & FSSAI microbiological audits',
      type: 'Full Time',
    },
    {
      title: 'Cold-Chain Logistics Officer',
      department: 'Supply Chain & Dispatch',
      location: 'Visakhapatnam',
      experience: '3+ years in refrigerated route fleet management',
      type: 'Full Time',
    },
    {
      title: 'Institutional Sales Executive',
      department: 'Marketing',
      location: 'Vijayawada / Rajahmundry',
      experience: '2 - 4 years in HORECA & sweets manufacturer sales',
      type: 'Full Time',
    },
  ];

  return (
    <div className="bg-[#fafbf9] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div>
          <div className="text-xs font-bold text-dairy-800 uppercase tracking-wider mb-1">
            Corporate Governance & B2B Partnerships
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Corporate Information & Management
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Sri Vijaya Visakha Milk Producers Company Limited is committed to transparent governance, progressive farmer welfare, and high corporate standards.
          </p>
        </div>

        {/* Corporate Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'board', label: 'Board of Directors & Leadership', icon: Users },
            { id: 'stockist', label: 'Stockist & Parlour Franchise', icon: Building },
            { id: 'vendor', label: 'Vendor & Supplier Registration', icon: Briefcase },
            { id: 'careers', label: 'Careers & Opportunities', icon: Briefcase },
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
              </button>
            );
          })}
        </div>

        {/* TAB 1: Board of Directors */}
        {activeTab === 'board' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-dairy-900 to-dairy-800 text-white p-6 sm:p-8 rounded-3xl">
              <h2 className="text-xl sm:text-2xl font-black">Board of Directors & Executive Leadership</h2>
              <p className="text-xs sm:text-sm text-dairy-200 mt-1">
                Comprising elected farmer representatives, dairy technocrats, and community leaders.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BOARD_MEMBERS.map((member) => (
                <div
                  key={member.name}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-soft space-y-2 hover:border-dairy-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-dairy-50 text-dairy-800 font-black text-base flex items-center justify-center">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
                    <span className="text-xs font-black text-dairy-700 block">
                      {member.designation}
                    </span>
                    {member.qualification && (
                      <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                        {member.qualification}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Stockist & Parlour Franchise */}
        {activeTab === 'stockist' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl font-black text-gray-900">
                Partner with Visakha Dairy as an Authorized Retailer
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Join our expansive distribution network of over 2,800 points. We provide full branding support, refrigeration assistance, high product turnover, and reliable daily morning stock supply.
              </p>
              
              <div className="space-y-2 text-xs text-gray-700 bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
                <h4 className="font-bold text-gray-900 mb-2">Basic Eligibility Criteria:</h4>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Commercial frontage with minimum 100 - 250 sq. ft. area</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Deep freezer / commercial cooler for milk and curd storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Valid FSSAI trade registration & GST certificate</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-soft">
              <h3 className="text-base font-bold text-gray-900 mb-4">Stockist / Parlour Inquiry Form</h3>
              <form onSubmit={handleStockistSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Applicant Name</label>
                  <input
                    type="text"
                    required
                    value={stockistForm.applicantName}
                    onChange={(e) => setStockistForm({ ...stockistForm, applicantName: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={stockistForm.phone}
                      onChange={(e) => setStockistForm({ ...stockistForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                      placeholder="e.g. 98480 12345"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={stockistForm.city}
                      onChange={(e) => setStockistForm({ ...stockistForm, city: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Proposed Location / Area</label>
                  <input
                    type="text"
                    required
                    value={stockistForm.area}
                    onChange={(e) => setStockistForm({ ...stockistForm, area: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                    placeholder="e.g. Near Bus Stand, MVP Colony"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Shop Area (sq ft)</label>
                    <input
                      type="number"
                      value={stockistForm.spaceSqFt}
                      onChange={(e) => setStockistForm({ ...stockistForm, spaceSqFt: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Inquiry Type</label>
                    <select
                      value={stockistForm.type}
                      onChange={(e) => setStockistForm({ ...stockistForm, type: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 font-bold"
                    >
                      <option value="Exclusive Parlour">Exclusive Brand Parlour</option>
                      <option value="Super Stockist">Super Stockist Area Distribution</option>
                      <option value="Retail Franchise">Retail Franchise</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-dairy-700 hover:bg-dairy-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all pt-3"
                >
                  Submit Stockist Application
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: Vendor Registration */}
        {activeTab === 'vendor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl font-black text-gray-900">
                Vendor & Supplier Empanelment
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We invite reputed manufacturers and certified vendors to register for procurement tenders across packaging poly films, aseptic cartons, lab chemicals, cattle feed raw materials, and dairy plant spares.
              </p>
              
              <div className="bg-dairy-50 p-5 rounded-2xl border border-dairy-100 text-xs space-y-2">
                <span className="font-bold text-dairy-900 block">Purchase Department Contact:</span>
                <p className="text-gray-700">Email: purchase@visakhadairy.com</p>
                <p className="text-gray-700">Phone: (+91) (0891) 2517230 / Extn 224</p>
                <p className="text-gray-500 text-[11px]">Registered vendors receive direct notifications for open tenders.</p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-soft">
              <h3 className="text-base font-bold text-gray-900 mb-4">Vendor Registration Form</h3>
              <form onSubmit={handleVendorSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Company / Firm Name</label>
                  <input
                    type="text"
                    required
                    value={vendorForm.companyName}
                    onChange={(e) => setVendorForm({ ...vendorForm, companyName: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                    placeholder="e.g. Apex Packaging Pvt Ltd"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Contact Person</label>
                    <input
                      type="text"
                      required
                      value={vendorForm.contactPerson}
                      onChange={(e) => setVendorForm({ ...vendorForm, contactPerson: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Business Phone</label>
                    <input
                      type="text"
                      required
                      value={vendorForm.phone}
                      onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={vendorForm.email}
                    onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Supply Category</label>
                  <select
                    value={vendorForm.category}
                    onChange={(e) => setVendorForm({ ...vendorForm, category: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 font-bold"
                  >
                    <option value="Packaging Materials">Packaging Materials (Pouches, Bottles, Cartons)</option>
                    <option value="Cattle Feed Ingredients">Cattle Feed Raw Materials & Grains</option>
                    <option value="Dairy Processing Equipment">Dairy Processing Equipment & Spares</option>
                    <option value="Laboratory Reagents">Laboratory Reagents & Testing Consumables</option>
                    <option value="Cold Storage Services">Cold Storage & Refrigerated Transport</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-dairy-700 hover:bg-dairy-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all pt-3"
                >
                  Submit Vendor Empanelment Details
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: Careers */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-dairy-900 to-ocean-900 text-white p-6 sm:p-8 rounded-3xl">
              <h2 className="text-xl sm:text-2xl font-black">Careers at Visakha Dairy</h2>
              <p className="text-xs sm:text-sm text-dairy-200 mt-1">
                Build an impactful career in modern food technology and rural empowerment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careerOpenings.map((job) => (
                <div
                  key={job.title}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-soft space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-black text-dairy-800 bg-dairy-50 px-2 py-0.5 rounded-md">
                        {job.department}
                      </span>
                      <span className="font-bold text-gray-500">{job.type}</span>
                    </div>
                    <h3 className="font-bold text-base text-gray-900 mt-1">{job.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{job.location}</p>
                    <p className="text-xs text-gray-600 mt-2 font-medium">Req: {job.experience}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">Send CV to hrd@visakhadairy.com</span>
                    <a
                      href="mailto:hrd@visakhadairy.com?subject=Application for Job"
                      className="px-3.5 py-1.5 rounded-xl bg-dairy-700 hover:bg-dairy-800 text-white text-xs font-bold"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
