import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { QuickAccess } from "@/components/site/QuickAccess";
import { Services } from "@/components/site/Services";
import { Journey } from "@/components/site/Journey";
import { StatsBand } from "@/components/site/StatsBand";
import { VisitPrep } from "@/components/site/VisitPrep";
import { Booking } from "@/components/site/Booking";
import { HoursLocation } from "@/components/site/HoursLocation";
import { Team } from "@/components/site/Team";
import { Trust } from "@/components/site/Trust";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { MobileCTA } from "@/components/site/MobileCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickAccess />
        <Services />
        <Journey />
        <StatsBand />
        <VisitPrep />
        <Booking />
        <HoursLocation />
        <Team />
        <Trust />
        <Faq />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
