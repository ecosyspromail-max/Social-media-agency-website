/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import type { CustomScopePayload } from './data/agencyData';
import { ScrollProgressBar } from './components/MotionPrimitives';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CapabilitiesAndToolsSection } from './components/CapabilitiesAndToolsSection';
import { ProcessSection } from './components/ProcessSection';
import { ResultsAndProofSection } from './components/ResultsAndProofSection';
import { FaqSection } from './components/FaqSection';
import { ContactAndFooter } from './components/ContactAndFooter';
import { FloatingCtaButton } from './components/FloatingCtaButton';

export default function App() {
  const [selectedScope, setSelectedScope] = useState<CustomScopePayload | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#07091B] text-[#F8F9FA] flex flex-col">
        <ScrollProgressBar />
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <ServicesSection onBookScope={setSelectedScope} />
          <CapabilitiesAndToolsSection />
          <ProcessSection />
          <ResultsAndProofSection />
          <FaqSection />
          <ContactAndFooter selectedScope={selectedScope} />
        </main>
        <FloatingCtaButton />
      </div>
    </MotionConfig>
  );
}
