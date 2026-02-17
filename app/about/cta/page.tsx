"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { formatImageUrl } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface CtaData {
  heading: string;
  button: string;
//   placeholder: string;
  img: string;
}

export default function CtaJoinSection() {
  const [data, setData] = useState<CtaData | null>(null);

  useEffect(() => {
    const fetchCTA = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ctabanner?populate=*`
        );

        const d = res.data.data;

        setData({
          heading: d.heading,
          button: d.button,
          img: formatImageUrl(d.img?.[0]?.url),
        });
      } catch (error) {
        console.error("CTA fetch error:", error);
      }
    };

    fetchCTA();
  }, []);

  if (!data)
    return <div className="text-center py-16 text-gray-500">Loading...</div>;

  return (
    <section className="py-8 md:py-12 lg:py-14 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 md:h-88">
        <div className="relative rounded-2xl md:h-87 overflow-hidden">
          {/* Background Image */}
          {data.img && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${data.img})` }}
            />
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-linear-br from-[#00000000] to-[#000000]" />

          {/* Content */}
          <div className="relative z-10 py-12 md:py-20 px-4 md:px-6 text-center flex flex-col align-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[41px] max-w-4xl mx-auto font-bold text-[#001233] mb-6 md:mb-8">
              {data.heading}
            </h2>

            {/* Email Form */}
            <div className="flex flex-col sm:flex-row justify-center bg-[#ffffff] py-1 px-2 rounded-lg items-center gap-2 md:gap-3 max-w-[371px] mx-auto">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full sm:flex-1 px-4 md:px-5 py-2.5 md:py-3 rounded-lg border border-white/30 bg-white text-[#0F172A] placeholder:text-[#676B74] focus:outline-none text-sm md:text-base"
              />

              <button className="bg-[#1F7A4D] hover:opacity-90 text-[#ffffff] py-2 px-3 font-bold rounded-lg flex items-center gap-1 text-sm md:text-base whitespace-nowrap">
                {data.button}
              <ArrowUpRight size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
