"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ArrowRight } from "lucide-react";

interface LinkItem {
  lable: string;
  button: string;
  button_url: string | null;
}

interface Category {
  tab_name: string;
  link_item: LinkItem[];
}

interface ResourceData {
  badge: string;
  badge_img?: string;
  title: string;
  link_category: Category[];
}

export default function UsefulLinksPage() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;
  const [data, setData] = useState<ResourceData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API}/api/usefullink?populate=badge_img&populate=link_category.link_item`
        );

        const d = res.data.data;

        setData({
          badge: d.badge,
          badge_img: d.badge_img?.url ? `${API}${d.badge_img.url}` : undefined,
          title: d.title,
          link_category: d.link_category || [],
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <InnerPageLayout title="Useful Links" breadcrumbs={[{ label: "Useful Links" }]}>
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : !data || !data.link_category?.length ? (
        <div className="text-center py-20">No data available</div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-flex items-center gap-2 bg-[#1F7A4D0F] border-[0.86px] border-[#1F7A4D33] text-[#1F7A4D] px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium mb-4">
              {data.badge_img && (
                <img src={data.badge_img} alt="badge" className="w-3 h-3 md:w-4 md:h-4" />
              )}
              {data.badge}
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#001233]">
              {data.title}
            </h2>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
            {data.link_category.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative px-4 md:px-6 py-6 md:py-9 rounded-xl text-sm font-semibold border-[1.52px] transition-all cursor-pointer ${
                  activeIndex === i
                    ? "border-[#1F7A4D] text-[#0B3C5D] shadow-sm"
                    : "border-[#E2E8F0] text-[#0B3C5D] hover:border-[#1F7A4D]"
                }`}
              >
                {cat.tab_name}
                {activeIndex === i && (
                  <span className="absolute top-2 right-2 w-3 h-3 md:w-3.5 md:h-3.5 bg-[#1F7A4D] rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Active Panel */}
          {data.link_category[activeIndex] && (
            <div className="border border-[#1F7A4D] rounded-2xl p-4 md:p-6 lg:p-8 bg-[#FFFFFF] shadow-sm">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold text-[#0B3C5D]">
                  {data.link_category[activeIndex].tab_name}
                </h3>
                <button
                  onClick={() => setActiveIndex(-1)}
                  className="text-sm text-[#62748E] hover:text-[#0B3C5D]"
                >
                  Close ×
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                {data.link_category[activeIndex].link_item?.map((link, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 bg-[#FFFFFF] rounded-lg px-3 md:px-4 py-3 border-[0.76px] border-[#E2E8F0]"
                  >
                    <span className="text-[#0B3C5D] font-bold text-sm md:text-base">{link.lable}</span>
                    <a
                      href={link.button_url || "#"}
                      target="_blank"
                      className="text-[#1F7A4D] text-sm font-semibold hover:underline flex items-center gap-1 w-fit"
                    >
                      {link.button}<ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </InnerPageLayout>
  );
}
