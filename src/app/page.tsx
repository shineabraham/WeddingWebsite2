"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { WeddingData } from "@/lib/data";

import Entrance from "@/components/Entrance";
import Hero3D from "@/components/Hero3D";
import HUD from "@/components/HUD";
import StorySection from "@/components/StorySection";
import QuoteSection from "@/components/QuoteSection";
import CountdownSection from "@/components/CountdownSection";
import Gallery from "@/components/Gallery";
import ParallaxImage from "@/components/ParallaxImage";
import Timeline from "@/components/Timeline";
import VenueSection from "@/components/VenueSection";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import GrainOverlay from "@/components/GrainOverlay";
import CursorFollower from "@/components/CursorFollower";
import FloatingParticles from "@/components/FloatingParticles";

export default function Home() {
  const [data, setData] = useState<WeddingData | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    fetch("/wedding-data.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-obsidian">
        <div className="flex flex-col items-center">
          <div className="h-px w-12 animate-gold-shimmer bg-gold/40" />
          <p className="mt-4 font-body text-[10px] uppercase tracking-ultrawide text-gold/70">
            Loading
          </p>
        </div>
      </div>
    );
  }

  const { couple, date, venue, tagline, story, timeline, gallery, rsvp, dressCode, hashtag } =
    data;

  return (
    <main>
      <GrainOverlay />
      <CursorFollower />

      {/* Entrance gate — always first on load/refresh */}
      <AnimatePresence>
        {!entered && (
          <Entrance
            partner1={couple.partner1.firstName}
            partner2={couple.partner2.firstName}
            date={date.ceremony}
            tagline={tagline}
            onEnter={() => {
              window.scrollTo(0, 0);
              setEntered(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Main site — only renders after entering */}
      {entered && (
        <>
          <FloatingParticles />
          <HUD
            ceremonyDate={date.ceremony}
            coordinates={venue.ceremony.coordinates}
          />

          <Hero3D
            partner1={couple.partner1.firstName}
            partner2={couple.partner2.firstName}
            tagline={tagline}
            date={date.ceremony}
            galleryImages={gallery}
          />

          <SectionDivider variant="ornament" />

          <StorySection
            story={story}
            partner1={couple.partner1.firstName}
            partner2={couple.partner2.firstName}
          />

          <SectionDivider variant="diamond" />

          <QuoteSection />

          <ParallaxImage
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
            alt="Romantic couple"
            caption="A love written in the stars"
            height="70vh"
          />

          <SectionDivider variant="flourish" />

          <CountdownSection
            ceremonyDate={date.ceremony}
            venueName={venue.ceremony.name}
          />

          <SectionDivider variant="line" />

          <Gallery images={gallery} />

          <ParallaxImage
            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=80"
            alt="Venue at golden hour"
            caption="Where dreams meet reality"
            height="60vh"
          />

          <SectionDivider variant="ornament" />

          <Timeline events={timeline} />

          <SectionDivider variant="diamond" />

          <VenueSection
            ceremony={venue.ceremony}
            reception={venue.reception}
            dressCode={dressCode}
          />

          <SectionDivider variant="flourish" />

          <RSVPForm questions={rsvp.questions} deadline={rsvp.deadline} />

          <Footer
            partner1={couple.partner1.firstName}
            partner2={couple.partner2.firstName}
            hashtag={hashtag}
            date={date.ceremony}
            venue={venue.ceremony.name}
          />
        </>
      )}
    </main>
  );
}
