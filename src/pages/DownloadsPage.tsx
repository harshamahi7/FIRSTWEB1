import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  FileSpreadsheet,
  FileCheck,
  Search,
  CheckCircle,
} from 'lucide-react';
import { DOWNLOADS_DATA } from '../data/downloads';
import { useStore } from '../context/StoreContext';

export const DownloadsPage: React.FC = () => {
  const { showToast } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchDoc, setSearchDoc] = useState<string>('');

  const categories = [
    'All',
    'Price Lists',
    'Vendor Forms',
    'Stockist Forms',
    'Notices',
    'Reports',
    'Other Documents',
  ];

  const filteredDocs = DOWNLOADS_DATA.filter((doc) => {
    if (activeCategory !== 'All' && doc.category !== activeCategory) return false;
    if (searchDoc.trim()) {
      const q = searchDoc.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDownload = (doc: (typeof DOWNLOADS_DATA)[0]) => {
    showToast(`Downloading: ${doc.title} (${doc.fileType} • ${doc.fileSize})`, 'success');
  };

  return (
    <div className="bg-[#fafbf9] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <div className="text-xs font-bold text-dairy-800 uppercase tracking-wider mb-1">
            Official Documentation & Forms
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Downloads & Public Notices
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            Access official retail price lists, vendor applications, annual reports, tender circulars, and certificates.
          </p>
        </div>

        {/* Filter Tabs & Search */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-soft space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchDoc}
              onChange={(e) => setSearchDoc(e.target.value)}
              placeholder="Search downloads by document title, tender, or category..."
              className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-gray-50 rounded-2xl text-xs sm:text-sm font-medium border border-gray-200 focus:outline-dairy-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-dairy-900 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => {
            return (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 hover:border-dairy-300 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-dairy-800 bg-dairy-50 px-2.5 py-1 rounded-full">
                      {doc.category}
                    </span>
                    <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {doc.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-2">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <FileText className="w-4 h-4 text-dairy-700" />
                    <span>{doc.fileType} • {doc.fileSize}</span>
                  </span>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="px-4 py-2 rounded-xl bg-dairy-700 hover:bg-dairy-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
