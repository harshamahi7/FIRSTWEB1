import React from 'react';
import {
  ShieldCheck,
  Microscope,
  Cpu,
  Truck,
  Award,
  CheckCircle,
  FileCheck,
  Zap,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const QualityPage: React.FC = () => {
  const { setActivePage } = useStore();

  const testingStages = [
    {
      stage: 'Stage 01: Village Milk Collection Centers (MCC)',
      details: 'Automatic Fat & SNF testing using electronic milk analyzers. Instant receipt and sample rejection if water or adulteration is detected.',
      equipment: 'Ultrasonic Milk Analyzers & Gerber Centrifuges',
    },
    {
      stage: 'Stage 02: Bulk Milk Chilling Centers (BMC)',
      details: 'Milk is immediately cooled to below 4°C within 45 minutes of milking to halt bacterial multiplication. Methylene Blue Reduction Test (MBRT) performed.',
      equipment: 'Direct Expansion Refrigerated Chilling Tanks',
    },
    {
      stage: 'Stage 03: Dairy Plant Reception Dock (RMRD)',
      details: 'Tankers arriving at Akkireddipalem and Rangampeta undergo 16 rapid screening tests including adulterants (urea, starch, detergent, salt), antibiotic residue, and acidity.',
      equipment: 'High-Throughput Spectrophotometers & Strip Analyzers',
    },
    {
      stage: 'Stage 04: Processed & Packaged Product QA',
      details: 'Post-pasteurisation microbiological tests (Coliform count, total plate count, yeast & mold) before release to consumer cold-chain dispatch.',
      equipment: 'Laminar Airflow Benches & Incubator Batteries',
    },
  ];

  return (
    <div className="bg-[#fafbf9] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase text-dairy-800 bg-dairy-50 px-3 py-1 rounded-full inline-block">
            Purity Guarantee & Laboratory Standards
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Scientific Quality & Uncompromised Hygiene
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            At Visakha Dairy, quality is an uncompromising promise. Our state-of-the-art testing protocols protect millions of Telugu families daily.
          </p>
        </div>

        {/* 4-Stage Quality Journey */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-soft space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            4-Stage Laboratory Milk Quality Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testingStages.map((s, idx) => (
              <div
                key={s.stage}
                className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 hover:border-dairy-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-dairy-800 text-white font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-sm text-gray-900">{s.stage}</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-9">{s.details}</p>
                <div className="pl-9 pt-1 text-[11px] font-bold text-dairy-800">
                  Instrumentation: {s.equipment}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications and Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-dairy-50 text-dairy-800 flex items-center justify-center mx-auto">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-gray-900">ISO 22000:2018</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Global benchmark for Food Safety Management Systems across processing, aseptic filling, and cold distribution.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-dairy-50 text-dairy-800 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-gray-900">FSSAI Central License</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              License No. 10012044000165 strictly verified for compliance with national dairy and nutritional fortification guidelines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-dairy-50 text-dairy-800 flex items-center justify-center mx-auto">
              <Microscope className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Zero Antibiotics & Adulterants</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Zero tolerance for chemical preservatives, neutralizers, or synthetic adulterants. 100% natural pure dairy.
            </p>
          </div>
        </div>

        {/* Action Banner */}
        <div className="bg-dairy-900 text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Have Questions About Visakha Dairy Quality?</h3>
          <p className="text-xs sm:text-sm text-dairy-200 max-w-lg mx-auto">
            Our quality control lab welcomes consumer inquiries and feedback on our dairy products.
          </p>
          <button
            onClick={() => setActivePage('contact')}
            className="px-6 py-3 rounded-xl bg-white text-dairy-950 font-bold text-xs sm:text-sm shadow-md"
          >
            Contact Quality Control Department
          </button>
        </div>
      </div>
    </div>
  );
};
