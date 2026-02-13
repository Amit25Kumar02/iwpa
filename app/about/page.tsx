import InnerPageLayout from "@/components/layout/InnerPageLayout";
import AboutIWPA from "./aboutiwpa/page";
import OurValueSection from "./ourvalue/page";
import CtaJoinSection from "./cta/page";

export default function AboutPage() {
  return (
    <InnerPageLayout title="About Us" breadcrumbs={[{ label: "About Us" }]}>
      <AboutIWPA />
      <OurValueSection />
      <CtaJoinSection />
    </InnerPageLayout>
  );
}
