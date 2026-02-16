import Image from "next/image";
import IndustryHeroSection from "./home/hero/page";
import AboutAssociationSection from "./home/homeabout/page";
import KeyFocusAreasSection from "./home/homearea/page";
import CircularsSection from "./home/homeupdates/page";
import PublicationsSection from "./home/homepublication/page";
import MemberShowcase from "./home/homeoem/page";
import JoinIwpaCTA from "./home/joinIWPA/page";
import Homeevent from "./home/homeevent/page";
import HomeAddPage from "./home/homeadd/page";

export default function Home() {
  return (
    <>
  <IndustryHeroSection />
  <HomeAddPage />
  <AboutAssociationSection />
  <KeyFocusAreasSection />
  <CircularsSection />
  <PublicationsSection />
  <Homeevent />
  <MemberShowcase />
  <JoinIwpaCTA />
  </>
  );
}
