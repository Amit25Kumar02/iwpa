"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import { formatImageUrl } from "@/lib/utils";

interface OEMCard {
  heading: string;
  img?: {
    url: string;
  };
}

interface ShowcaseData {
  badge: string;
  badge_img?: string;
  title: string;
  oemcard: OEMCard[];
}

export default function MemberShowcase() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;
  const [data, setData] = useState<ShowcaseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API}/api/homeoem?populate[0]=badge_img&populate[1]=oemcard&populate[2]=oemcard.img`
        );

        const d = res.data.data;

        setData({
          badge: d.badge,
          badge_img: formatImageUrl(d.badge_img?.url),
          title: d.title,
          oemcard: d.oemcard || [],
        });
      } catch (err) {
        console.error("Failed to fetch showcase:", err);
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#0B6B3A14] text-[#0B6B3A] px-4 py-2 rounded-md text-sm font-medium mb-4">
            {data.badge_img && (
              <img
                src={data.badge_img}
                alt="badge"
                className="w-4 h-4"
              />
            )}
            {data.badge}
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A]">
            {data.title}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.oemcard?.map((oem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition"
            >
              {oem.img?.url && (
                <img
                  src={formatImageUrl(oem.img.url)}
                  alt={oem.heading}
                  className="w-full h-[160px] object-cover"
                />
              )}
              <div className="p-4">
                <p className="font-semibold text-[#0F172A]">{oem.heading}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
