"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Users, Target, BookOpen, ArrowUpRight } from "lucide-react";

import { formatImageUrl } from "@/lib/utils";

interface Area {
  id: number;
  title: string;
  description: string;
  button: string;
  button_url: string | null;
  img?: string;
}

interface HomeAreaData {
  badge: string;
  heading: string;
  badge_img: string;
  areas: Area[];
}

export default function KeyFocusAreasSection() {
  const [data, setData] = useState<HomeAreaData | null>(null);
  const [activeCard, setActiveCard] = useState<number>(1);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homearea?populate=*`
        );

        const d = res.data.data;
        
        setData({
          badge: d.badge,
          heading: d.heading,
          badge_img: formatImageUrl(d.badge_img?.url),
          areas: d.homeareacard?.map((item: any) => ({
            ...item,
            img: formatImageUrl(item.img?.url)
          })) || []
        });
      } catch (error) {
        console.error("Home areas fetch error:", error);
      }
    };

    fetchAreas();
  }, []);

  if (!data) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="py-20 bg-[#F6F8FA] text-center">
      <div className="max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 bg-[#0B6B3A14] text-[#0B6B3A] px-4 py-2 rounded-md text-sm font-medium">
            {data.badge_img && (
              <img
                src={data.badge_img}
                alt="badge"
                className="w-4 h-4"
              />
            )}
            {data.badge}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-14">
          {data.heading}
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.areas.map((area, index) => (
            <div
              key={area.id}
              onClick={() => setActiveCard(index)}
              className={`rounded-2xl p-8 transition-all duration-300  cursor-pointer
                ${
                  activeCard === index
                    ? "bg-[#1F7A4D] text-[#ffffff] shadow-xl scale-105"
                    : "bg-[#ffffff] text-[#001233]  hover:shadow-md"
                }`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-lg ${
                  activeCard === index ? "bg-white/20" : "bg-[#E2F5EA]"
                }`}
              >
                {area.img ? (
                  <img 
                    src={area.img} 
                    alt={area.title} 
                    className="w-7 h-7" 
                  />
                ) : (
                  <>
                    {index === 0 && <Target className={`w-7 h-7 ${activeCard === index ? "text-white" : "text-[#0B6B3A]"}`} />}
                    {index === 1 && <Users className={`w-7 h-7 ${activeCard === index ? "text-white" : "text-[#0B6B3A]"}`} />}
                    {index === 2 && <BookOpen className={`w-7 h-7 ${activeCard === index ? "text-white" : "text-[#0B6B3A]"}`} />}
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3">{area.title}</h3>

              {/* Description */}
              <p
                className={`text-sm leading-relaxed mb-5 ${
                  activeCard === index ? "text-[#CBCBCB]" : "text-[#676B74]"
                }`}
              >
                {area.description}
              </p>

              {/* Button - only show for active card */}
              {activeCard === index && (
                <Link
                  href={area.button_url || "#"}
                  className="inline-flex items-center gap-2 font-bold text-[#ffffff]"
                >
                  {area.button} <ArrowUpRight size={18} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}