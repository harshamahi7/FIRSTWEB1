import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Your message has been delivered to Visakha Dairy headquarters.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
  };

  return (
    <div className="bg-[#fafbf9] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-dairy-800 bg-dairy-50 px-3 py-1 rounded-full inline-block">
            Get in Touch With Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Contact Visakha Dairy
          </h1>
          <p className="text-sm text-gray-600">
            Have questions about our milk products, doorstep daily delivery, or corporate inquiries? We are always here to listen.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft space-y-2.5">
            <div className="w-12 h-12 rounded-2xl bg-dairy-50 text-dairy-800 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900">Registered Head Office</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Sri Vijaya Visakha Milk Producers Company Ltd.<br />
              Akkireddypalem, Opp. BHEL,<br />
              Visakhapatnam - 530012, Andhra Pradesh, India
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft space-y-2.5">
            <div className="w-12 h-12 rounded-2xl bg-dairy-50 text-dairy-800 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900">Phone & Customer Care</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              EPABX Lines:<br />
              (+91) (0891) 2517230 / 2517290 / 2517555<br />
              Fax: (+91) (0891) 2757708
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft space-y-2.5">
            <div className="w-12 h-12 rounded-2xl bg-dairy-50 text-dairy-800 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900">Department Emails</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Marketing: marketing@visakhadairy.com<br />
              Managing Director: md@visakhadairy.com<br />
              Corporate Board: board@visakhadairy.com
            </p>
          </div>
        </div>

        {/* Contact Form + Map Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Send us a Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-soft">
            <h2 className="text-xl font-black text-gray-900 mb-1">Send Us a Message</h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill in your details and our customer care team will respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    placeholder="e.g. Ramesh Naidu"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    placeholder="e.g. +91 98480 12345"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold"
                  >
                    <option value="General Inquiry">General Product Inquiry</option>
                    <option value="Daily Milk Subscription">Doorstep Milk Subscription Question</option>
                    <option value="Retailer / Parlour Franchise">Retailer / Parlour Franchise Inquiry</option>
                    <option value="Bulk Order for Event">Bulk Sweet / Ghee Order for Wedding/Event</option>
                    <option value="Quality Feedback">Quality Control Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                  placeholder="How can we assist you today? Please provide any specific product or location details..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-dairy-700 hover:bg-dairy-800 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Plant Location & Map Visual */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-soft space-y-4">
            <h3 className="font-bold text-base text-gray-900">Headquarters Plant Location</h3>
            <p className="text-xs text-gray-500">
              Conveniently located directly opposite BHEL on the National Highway corridor in Visakhapatnam.
            </p>

            <div className="h-60 rounded-2xl bg-gray-100 overflow-hidden relative border border-gray-200 flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin className="w-8 h-8 text-dairy-700 mx-auto mb-2 animate-bounce" />
                <h4 className="font-bold text-sm text-gray-900">Akkireddipalem Dairy Complex</h4>
                <p className="text-[11px] text-gray-500 mt-1">Opp. BHEL Main Gate, Visakhapatnam 530012</p>
                <a
                  href="https://maps.google.com/?q=Visakha+Dairy+Akkireddipalem"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block px-3.5 py-1.5 bg-dairy-800 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div className="text-xs text-gray-600 bg-dairy-50 p-3 rounded-2xl border border-dairy-100">
              <span className="font-bold text-dairy-900 block mb-0.5">Office Timings:</span>
              <p>Monday - Saturday: 09:30 AM - 05:30 PM</p>
              <p>Main Plant Despatch: 24 Hours / 365 Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
