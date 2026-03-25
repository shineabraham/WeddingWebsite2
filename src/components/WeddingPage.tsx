"use client";

import { useState } from "react";
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

interface WeddingPageProps {
  data: WeddingData;
}

export default function WeddingPage({ data }: WeddingPageProps) {
  const [entered, setEntered] = useState(false);

  const { couple, date, venue, tagline, story, timeline, gallery, rsvp, dressCode, hashtag } =
    data;

  return (
    <main>
      <GrainOverlay />
      <CursorFollower />

      {/* Entrance gate */}
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

      {/* Main site with snap scrolling */}
      {entered && (
        <div className="snap-container">
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

          <div className="snap-section relative bg-obsidian">
            <SectionDivider variant="ornament" />
            <StorySection
              story={story}
              partner1={couple.partner1.firstName}
              partner2={couple.partner2.firstName}
            />
          </div>

          <div className="snap-section relative bg-obsidian">
            <SectionDivider variant="diamond" />
            <QuoteSection />
          </div>

          <div className="snap-section-auto relative">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
              alt="Romantic couple"
              caption="A love written in the stars"
              height="100vh"
            />
          </div>

          <div className="snap-section relative bg-obsidian">
            <SectionDivider variant="flourish" />
            <CountdownSection
              ceremonyDate={date.ceremony}
              venueName={venue.ceremony.name}
            />
          </div>

          <div className="snap-section relative bg-obsidian">
            <SectionDivider variant="line" />
            <Gallery images={gallery} />
          </div>

          <div className="snap-section-auto relative">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=80"
              alt="Venue at golden hour"
              caption="Where dreams meet reality"
              height="100vh"
            />
          </div>

          <div className="snap-section relative bg-obsidian">
            <SectionDivider variant="ornament" />
            <Timeline events={timeline} />
          </div>

          <div className="snap-section relative bg-obsidian">
            <SectionDivider variant="diamond" />
            <VenueSection
              ceremony={venue.ceremony}
              reception={venue.reception}
              dressCode={dressCode}
            />
          </div>

          <div className="snap-section relative bg-obsidian">
            <SectionDivider variant="flourish" />
            <RSVPForm questions={rsvp.questions} deadline={rsvp.deadline} />
          </div>

          <div className="snap-section-auto relative bg-obsidian">
            <Footer
              partner1={couple.partner1.firstName}
              partner2={couple.partner2.firstName}
              hashtag={hashtag}
              date={date.ceremony}
              venue={venue.ceremony.name}
            />
          </div>
        </div>
      )}
    </main>
  );
}
