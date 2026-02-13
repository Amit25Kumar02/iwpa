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
    <div className="relative w-full h-48 md:h-65 lg:h-80 overflow-hidden">
      {heroImage && (
        <img
          src={heroImage}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-[#0b2c4d]/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          {title}
        </h1>

        <div className="text-xs md:text-sm text-gray-200 flex gap-2 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>

          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex gap-2">
              <span>&gt;</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
