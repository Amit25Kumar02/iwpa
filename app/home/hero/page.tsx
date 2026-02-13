"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Play, X } from "lucide-react";

import { formatImageUrl } from "@/lib/utils";

interface HeroData {
  badge: string;
  badge_img: string;
  heading: string;
  description: string;
  background_image: string;
  video: string;
  button: string;
  button_link: string;
}

export default function IndustryHeroSection() {
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homehero?populate=*`
        );

        const d = res.data.data;

        setData({
          badge: d.badge || '',
          badge_img: formatImageUrl(d.badge_img?.url),
          heading: d.heading,
          description: d.description,
          background_image: formatImageUrl(d.bgimg?.url),
          video: formatImageUrl(d.video?.url),
          button: d.button || '',
          button_link: d.button_url || "#",
        });
      } catch (error) {
        console.error("Hero fetch error:", error);
      }
    };

    fetchHero();
  }, []);

  if (!data) return null;

  return (
    <section className="relative h-110 md:h-164 w-full flex items-center">
      {/* Background Image */}
      {data.background_image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.background_image})` }}
        />
      )}

      {/* Left Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#001233] via-[#00123300] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:ml-12 lg:ml-20 text-[#ffffff]">
        {/* Badge */}
        {data.badge && (
          <span className="inline-flex items-center gap-2 bg-[#FFFFFF33] backdrop-blur px-3 py-1 md:px-4 md:py-2 rounded-sm text-xs md:text-sm font-medium mb-4 md:mb-6">
            {data.badge_img && (
              <img
                src={data.badge_img}
                alt="badge"
                className="w-3 h-3 md:w-4 md:h-4"
              />
            )}
            {data.badge}
          </span>
        )}

        {/* Heading */}
        <h1 className="text-2xl md:text-4xl lg:text-[44px] font-bold leading-tight max-w-xl md:max-w-2xl mb-4 md:mb-4">
          {data.heading}
        </h1>

        {/* Description */}
        <p className="max-w-sm md:max-w-xl text-[#FFFFFF] mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
          {data.description}
        </p>

        {/* Video Display - Behind buttons */}
        {data.video && (
          <div className="hidden md:block absolute -left-30 top-36 z-0 max-w-80 md:max-w-107">
            <img
              src={data.video}
              alt="IWPA Video"
              className="w-full h-110 rounded-lg opacity-30"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="relative z-30 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
          {/* Play Button */}
          {data.video && (
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1F7A4D] flex items-center justify-center">
              <Play className="text-[#ffffff]" size={20} />
            </div>
          )}

          {/* Secondary Button */}
          {data.button && (
            <Link
              href={data.button_link}
              className="flex items-center gap-2 text-[#ffffff] font-medium hover:underline text-sm md:text-base"
            >
              {data.button}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
