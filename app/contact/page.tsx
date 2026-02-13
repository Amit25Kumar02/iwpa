import InnerPageLayout from "@/components/layout/InnerPageLayout";
import IwpaPresenceSection from "./contactAddress/page";
import ContactSection from "./contactSection/page";

export default function ContactPage() {
  return (
    <InnerPageLayout title="Contact Us" breadcrumbs={[{ label: "Contact Us" }]}>
      <ContactSection />
      <IwpaPresenceSection />
    </InnerPageLayout>
  );
}
