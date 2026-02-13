import { ReactNode } from "react";
// import Navbar from "./Navbar";
import InnerPageHero from "./InnerPageHero";

type Breadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  title: string;
  breadcrumbs?: Breadcrumb[];
  children: ReactNode;
};

export default function InnerPageLayout({
  title,
  breadcrumbs,
  children,
}: Props) {
  return (
    <>
      <InnerPageHero title={title} breadcrumbs={breadcrumbs} />
      <main className="mx-auto px-4 md:px-6 py-8 md:py-12 bg-[#F6F8FA]">{children}</main>
    </>
  );
}
