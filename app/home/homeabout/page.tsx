"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import { formatImageUrl } from "@/lib/utils";

interface AboutCard {
  heading: string;
  subheading: string;
  icon?: string;
}

interface AboutData {
  badge: string;
  badge_img: string;
  heading: string;
  description: string;
  title: string;
  subheading: string;
  icon: string;
  button: string;
  img: string;
  homeaboutcard: AboutCard[];
}

export default function AboutAssociationSection() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homeabout?populate[0]=badge_img&populate[1]=homeaboutcard.icon&populate[2]=homeaboutcard.icon&populate[3]=img`
        );

        const d = res.data.data;

        setData({
          badge: d.badge,
          badge_img: formatImageUrl(d.badge_img?.url),
          heading: d.heading,
          description: d.description,
          title: d.title,
          subheading: d.subheading,
          icon: formatImageUrl(d.icon?.url),
          button: d.button,
          img: formatImageUrl(d.img?.url),
          homeaboutcard: d.homeaboutcard?.map((card: any) => ({
            heading: card.heading,
            subheading: card.subheading,
            icon: formatImageUrl(card.icon?.url),
          })) || [],
        });
      } catch (error) {
        console.error("About fetch error:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#ffffff] relative z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-[#0B6B3A14] text-[#0B6B3A] px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium mb-4 md:mb-5">
            {data.badge_img && data.badge_img !== '' && (
              <img 
                src={data.badge_img} 
                alt="badge icon" 
                className="w-3 h-3 md:w-4 md:h-4" 
                onError={(e) => {
                  console.log('Badge image failed to load:', data.badge_img);
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            {data.badge}
          </span>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 md:mb-5">
            {data.title}
          </h2>

          {/* Description */}
          <p
            className="text-[#475569] leading-relaxed mb-6 md:mb-8 text-sm md:text-base text-left"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          {/* Feature Items */}
          <div className="space-y-4 md:space-y-6 mb-6 md:mb-8 text-left">
            {data.homeaboutcard?.map((card, index) => (
              <div key={index} className="flex gap-3 md:gap-4 items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                  {card.icon && card.icon !== '' ? (
                    <img 
                      src={card.icon} 
                      alt="icon" 
                      className="w-5 h-5 md:w-6 md:h-6" 
                      onError={(e) => {
                        console.log('Card icon failed to load:', card.icon);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : data.icon && data.icon !== '' ? (
                    <img 
                      src={data.icon} 
                      alt="icon" 
                      className="w-5 h-5 md:w-6 md:h-6" 
                      onError={(e) => {
                        console.log('Default icon failed to load:', data.icon);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-[#0B6B3A] rounded-full" />
                  )}
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#0F172A] text-sm md:text-base">{card.heading}</h4>
                  <p className="text-[#64748B] text-xs md:text-sm">{card.subheading}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-[#0B6B3A] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:opacity-90 transition text-sm md:text-base"
          >
            {data.button} <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px]" />
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative order-1 lg:order-2">
          <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-full h-full bg-[#0B6B3A1A] rounded-2xl rotate-3 max-w-[300px] max-h-[300px] md:max-w-[400px] md:max-h-[400px] lg:max-w-none lg:max-h-none"></div>

          {data.img && (
            <img
              src={data.img}
              alt="Association"
              className="relative rounded-2xl shadow-lg object-cover w-full h-[250px] md:h-[350px] lg:h-auto"
              onError={(e) => {
                console.log('Image failed to load:', data.img);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => console.log('Image loaded successfully:', data.img)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
