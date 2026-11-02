import { BoardDirector } from '../types';

export interface Milestone {
  year: string;
  title: string;
  description: string;
  highlight?: string;
}

export const TIMELINE_DATA: Milestone[] = [
  {
    year: '1973',
    title: 'Cooperative Inception',
    description: 'Visakha Dairy was born under the Cooperative Societies Act under the visionary guidance of Sri Adari Tulasirao to eliminate farmer exploitation by middlemen and provide rural milk producers direct market access.',
    highlight: 'Foundation of Dairy Movement in North Coastal AP',
  },
  {
    year: '1977',
    title: 'Akkireddipalem Plant Commissioning',
    description: 'The foundation plant began commercial operations at Akkireddipalem, Visakhapatnam, initially handling 50,000 Liters of milk per day across Srikakulam, Vizianagaram, and Visakhapatnam.',
    highlight: 'First Modern Dairy Processing Plant',
  },
  {
    year: '1989',
    title: 'Establishment of Welfare Trust (MP & EEH & MW)',
    description: 'To care for the dairy farmers who form the backbone of the organization, a dedicated trust was established providing free multi-specialty healthcare, schools, and college education for rural families.',
    highlight: 'Pioneering Social Healthcare & Education',
  },
  {
    year: '1999',
    title: 'Cooperative Transformation (MACS Act)',
    description: 'Adopted the progressive 1995 Model Act, registering as Sri Vijaya Visakha District Milk Producers Mutually Aided Cooperative Union Ltd., empowering local farmer delegates with true democratic ownership.',
    highlight: 'Democratic Farmer Empowerment',
  },
  {
    year: '2006',
    title: 'Transformation into Producer Company',
    description: 'Evolved into Sri Vijaya Visakha Milk Producers Company Limited under Part IXA of the Companies Act, combining corporate efficiency and modern manufacturing with pure cooperative ethos.',
    highlight: 'Modern Corporate Governance',
  },
  {
    year: '2018',
    title: 'Rangampeta Mega Plant & Modernisation',
    description: 'Commissioned the state-of-the-art automated dairy plant at Rangampeta (East Godavari) and upgraded Akkireddipalem to fully automated SCADA-controlled sterile aseptic packaging.',
    highlight: 'ISO 22000:2018 Food Safety Certification',
  },
  {
    year: 'Present',
    title: 'Modern Dairy Operations & Digital Doorstep Care',
    description: 'Procuring over 10+ Lakh Litres of milk every single day from 350,000+ member dairy farmers across Andhra Pradesh, Odisha, and Chhattisgarh, serving millions of families with pure freshness.',
    highlight: 'Trusted by over 3 Generations',
  },
];

export const BOARD_MEMBERS: BoardDirector[] = [
  {
    name: 'Sri A. Anand Kumar',
    designation: 'Chairman',
    qualification: 'B.Com, Dairy Industry Visionary & Farmer Leader',
  },
  {
    name: 'Sri S. V. Ramana',
    designation: 'Managing Director',
    qualification: 'M.Sc (Dairy Tech), 30+ yrs Dairy Management Experience',
  },
  {
    name: 'Smt. A. Jayalakshmi',
    designation: 'Director',
    qualification: 'Elected Farmer Representative',
  },
  {
    name: 'Smt. P. Ramakumari',
    designation: 'Director',
    qualification: 'Women Dairy Empowerment Lead',
  },
  {
    name: 'Shri S. Suryanarayana',
    designation: 'Director',
    qualification: 'Agricultural Cooperative Specialist',
  },
  {
    name: 'Shri K. Katamayya',
    designation: 'Director',
    qualification: 'Procurement Strategy & Logistics',
  },
  {
    name: 'Shri V. Sanyasi Naidu',
    designation: 'Director',
    qualification: 'Rural Community Liaison',
  },
  {
    name: 'Shri G. Satyanarayana',
    designation: 'Director',
    qualification: 'Dairy Quality Audit Committee',
  },
];

export const DAIRY_STATS = [
  { label: 'Member Farmers', value: '3,50,000+', sublabel: 'Directly empowered milk producers' },
  { label: 'Daily Milk Handling', value: '10,00,000+ L', sublabel: 'Pure milk processed every 24 hours' },
  { label: 'Retail Outlets & Parlours', value: '2,800+', sublabel: 'Spanning AP, Odisha & CG' },
  { label: 'Years of Trust', value: '50+ Years', sublabel: 'Nourishing generations since 1973' },
];
