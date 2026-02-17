"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { formatImageUrl } from "@/lib/utils";

type Breadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  title: string;
  breadcrumbs?: Breadcrumb[];
};

export default function InnerPageHero({ title, breadcrumbs = [] }: Props) {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/heropage?populate=*`);
        const imageUrl = response.data.data?.img?.url;
        if (imageUrl) {
          setHeroImage(formatImageUrl(imageUrl));
        }
      } catch (error) {
        console.error('Failed to fetch hero image:', error);
      }
    };

    fetchHeroImage();
  }, []);

  return (
   <div className="relative w-full h-[260px] md:h-[340px] lg:h-[400px] overflow-hidden">

  {/* Background Image */}
  {heroImage && (
    <img
      src={heroImage}
      alt="Banner"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
  )}

  {/* LEFT DARK OVERLAY */}
  <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#001233]/90 via-[#001233]/60 to-transparent" />

  {/* Content */}
  <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
    <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
      {title}
    </h1>

    <div className="text-sm text-gray-200 flex gap-2">
      <Link href="/">Home</Link>
      <span>&gt;</span>
      <span className="text-white font-semibold">{title}</span>
    </div>
  </div>
</div>

  );

}
