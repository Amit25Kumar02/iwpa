"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowBigRight, ArrowUpRight } from "lucide-react";

import { formatImageUrl } from "@/lib/utils";

interface CtaData {
  heading: string;
  description: string;
  placeholder: string;
  button: string;
  button_url: string;
  bg_image?: string;
  side_image?: string;
}

export default function JoinIwpaCTA() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;
  const [data, setData] = useState<CtaData | null>(null);

  useEffect(() => {
    const fetchCTA = async () => {
      try {
        const res = await axios.get(
          `${API}/api/joincta?populate=*`
        );

        const d = res.data.data;

        setData({
          heading: d.heading,
          description: d.description,
          placeholder: d.placeholder || "Enter Your Email",
          button: d.button,
          button_url: d.button_url,
          bg_image: formatImageUrl(d.bg_image?.url),
          side_image: formatImageUrl(d.side_image?.url),
        });
      } catch (err) {
        console.error("CTA fetch failed:", err);
      }
    };

    fetchCTA();
  }, []);

  if (!data) return null;

  return (
    <section className="py-8 md:py-16 lg:py-20 px-4 md:px-4">
      <div
        className="max-w-6xl mx-auto min-h-[350px] md:max-h-[351px] rounded-2xl overflow-hidden relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${data.bg_image})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-black/40 to-black/80" />


        <div className="relative z-10 grid md:grid-cols-2 items-center px-6 py-10 md:px-10 md:py-0 gap-6 md:gap-8 h-full">

          {/* Left Content */}
          <div className="text-white max-w-xl text-center md:text-left">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight">
              {data.heading}
            </h2>

            <p className="text-xs md:text-base text-white/90 mb-4 md:mb-6">
              {data.description}
            </p>

            <div className="flex flex-col md:flex-row  bg-[#FFFFFF] p-2 rounded-lg gap-2 md:gap-3 max-w-[371px] mx-auto md:mx-0">
              <input
                type="email"
                placeholder={data.placeholder}
                className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm text-[#0F172A] outline-none"
              />

              <Link
                href={data.button_url || "#"}
                className="flex items-center justify-center gap-2 bg-[#1F7A4D] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-xs md:text-sm font-bold hover:opacity-90 transition whitespace-nowrap"
              >
                {data.button} <ArrowUpRight size={16} strokeWidth={3} className="md:w-[18px] md:h-[18px]" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          {data.side_image && (
            <div className="hidden md:flex justify-end mt-1">
              <img
                src={data.side_image}
                alt="Join IWPA"
                className="max-h-[280px] lg:max-h-[355px] "
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
