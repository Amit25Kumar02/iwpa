"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, Calendar } from "lucide-react";

import { formatImageUrl } from "@/lib/utils";

interface Circular {
  id: number;
  heading: string;
  date: string;
  button: string;
  button_url: string | null;
}

interface Region {
  id: number;
  tab_name: string;
  circulartab: Circular[];
}

interface SectionHeader {
  badge: string;
  badge_img?: string;
  title: string;
}

export default function CircularsSection() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;

  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [header, setHeader] = useState<SectionHeader | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API}/api/homeregion?populate=badge_img&populate=tab_name.circulartab
`
        );

        const d = res.data.data;

        // Header
        setHeader({
          badge: d.badge,
          badge_img: formatImageUrl(d.badge_img?.url),
          title: d.title,
        });

        // Regions (tab_name array)
        const regionTabs = d.tab_name || [];
        setRegions(regionTabs);

        if (regionTabs.length > 0) {
          setSelectedRegion(regionTabs[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch circulars data:", error);
      }
    };

    fetchData();
  }, []);

  const activeRegion = regions.find((r) => r.id === selectedRegion);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">

        {/* Header */}
        {header?.badge && (
          <span className="inline-flex items-center gap-2 bg-[#1F7A4D0F] text-[#1F7A4D] px-3 md:px-4 py-2 border border-[#1F7A4D0F] rounded-sm text-xs md:text-sm font-medium mb-4">
            {header.badge_img && (
              <img src={header.badge_img} alt="badge" className="w-3 h-3 md:w-4 md:h-4" />
            )}
            {header.badge}
          </span>
        )}

        {header?.title && (
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#001233] mb-8 md:mb-12">
            {header.title}
          </h2>
        )}

        {/* Region Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`relative p-3 md:p-4 bg-white rounded-xl border text-sm font-bold transition cursor-pointer h-24 md:h-32 ${
                selectedRegion === region.id
                  ? "border-[#1F7A4D] shadow-md"
                  : "border-[#E2E8F0]"
              }`}
            >
              {selectedRegion === region.id && (
                <div className="absolute top-2 right-2 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#1F7A4D] rounded-full" />
              )}
              {region.tab_name}
              <div className="text-xs text-[#62748E] mt-2 md:mt-4">View circulars</div>
            </button>
          ))}
        </div>

        {/* Circular List */}
        {activeRegion && (
          <div className="bg-[#ffffff] border border-[#1F7A4D] rounded-xl p-4 md:p-6 lg:p-8 text-left">
            <h3 className="text-lg md:text-xl font-bold text-[#0B3C5D] mb-4 md:mb-6">
              {activeRegion.tab_name} Circulars
            </h3>

            <div className="space-y-3 md:space-y-4">
              {activeRegion.circulartab?.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 p-3 md:p-4 border border-[#E2E8F0] rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-sm md:text-base text-[#0B3C5D] mb-1">{c.heading}</h4>
                    <p className="text-xs text-[#62748E] flex items-center">
                        <Calendar className="inline-block w-3 h-3 mr-1" />
                       Published: {new Date(c.date).toLocaleDateString()}
                    </p>
                  </div>

                  <a
                    href={c.button_url || "#"}
                    target="_blank"
                    className="text-[#1F7A4D] text-sm font-medium flex items-center gap-1 w-fit"
                  >
                    {c.button} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            <p className="text-xs md:text-sm text-center mt-6 md:mt-8 text-[#0B3C5D]">
              For assistance or queries, contact the regional office or email
              circulars@indianwindassociation.org
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
