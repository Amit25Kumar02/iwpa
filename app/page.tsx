import Image from "next/image";
import IndustryHeroSection from "./home/hero/page";
import AboutAssociationSection from "./home/homeabout/page";
import KeyFocusAreasSection from "./home/homearea/page";
import CircularsSection from "./home/homeupdates/page";
import PublicationsSection from "./home/homepublication/page";
import ConferencesPage from "./events/conferences/page";
import MemberShowcase from "./home/homeoem/page";
import JoinIwpaCTA from "./home/joinIWPA/page";

export default function Home() {
  return (
    <>
  <IndustryHeroSection />
  <AboutAssociationSection />
  <KeyFocusAreasSection />
  <CircularsSection />
  <PublicationsSection />
  <ConferencesPage />
  <MemberShowcase />
  <JoinIwpaCTA />
  </>
  );
}
