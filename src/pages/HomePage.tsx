import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { QuickCategoryNav } from '../components/home/QuickCategoryNav';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { MilkCalculatorSection } from '../components/home/MilkCalculatorSection';
import { MilkSubscriptionBanner } from '../components/home/MilkSubscriptionBanner';
import { WhyVisakhaSection } from '../components/home/WhyVisakhaSection';
import { QualityTrustSection } from '../components/home/QualityTrustSection';
import { FarmerEmpowermentSection } from '../components/home/FarmerEmpowermentSection';
import { AppDownloadBanner } from '../components/home/AppDownloadBanner';
import { CustomerTestimonialsSection } from '../components/home/CustomerTestimonialsSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <QuickCategoryNav />
      <HowItWorksSection />
      <FeaturedProductsSection />
      <MilkCalculatorSection />
      <MilkSubscriptionBanner />
      <WhyVisakhaSection />
      <QualityTrustSection />
      <FarmerEmpowermentSection />
      <AppDownloadBanner />
      <CustomerTestimonialsSection />
    </div>
  );
};
