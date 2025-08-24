import { ComingSoonSection } from '@/components/landing/coming-soon-section';
import { CTASection } from '@/components/landing/cta-section';
import { FAQSection } from '@/components/landing/faq-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { Footer } from '@/components/landing/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { Navbar } from '@/components/landing/navbar';

export default function Page() {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-[var(--background)] [background-image:radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.25),transparent_70%)]" />
      <div className="relative z-10">
        <Navbar />
        <div className="mx-auto max-w-7xl space-y-32 px-4 sm:space-y-72 sm:px-6 lg:px-8">
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <ComingSoonSection />
          <FAQSection />
          <CTASection />
          <Footer />
        </div>
      </div>
    </>
  );
}
