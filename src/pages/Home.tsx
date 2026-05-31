import Hero from '@/components/Hero';
import Translator from '@/components/Translator';
import FeatureHighlights from '@/components/FeatureHighlights';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <Translator />
      <FeatureHighlights />
      <FAQ />
      <CTASection />
    </main>
  );
}
