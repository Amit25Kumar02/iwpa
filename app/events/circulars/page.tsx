"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { formatImageUrl } from "@/lib/utils";

interface Circular {
  id: number;
  heading: string;
  button_url: string;
  date: string;
}

interface PageData {
  badge: string;
  badge_img?: string;
  title: string;
  circulars: Circular[];
}

export default function CircularsPage() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;
  const [data, setData] = useState<PageData | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchCirculars = async () => {
      try {
        const res = await axios.get(`${API}/api/circular?populate=*`);
        const d = res.data.data;
        
        const formattedCirculars = d.circularcard?.map((item: any) => ({
          id: item.id,
          heading: item.heading,
          button_url: item.button_url,
          date: item.date,
        })) || [];
        
        setData({
          badge: d.badge,
          badge_img: formatImageUrl(d.badge_img?.url),
          title: d.title,
          circulars: formattedCirculars,
        });
        
        // Extract unique years
        const uniqueYears = [...new Set(d.circularcard?.map((item: any) => new Date(item.date).getFullYear().toString()) || [])].sort();
        setYears(uniqueYears);
      } catch (err) {
        console.error("Circulars fetch error:", err);
      }
    };

    fetchCirculars();
  }, []);

  const filteredCirculars = selectedYear 
    ? data?.circulars.filter(circular => new Date(circular.date).getFullYear().toString() === selectedYear) || []
    : data?.circulars || [];

  if (!data) return null;

  return (
    <InnerPageLayout title="Circulars" breadcrumbs={[
      { label: "Circulars" },
    
    ]}
    >
      {/* <section className="bg-[#F6F8FA]"> */}
        {/* Tag */}
        <div className="text-center mb-10">
          {data.badge && (
            <span className="text-[#1F7A4D] Figtree bg-[#1F7A4D0F] px-4 py-1 border-[0.86px] border-[#1F7A4D0F] rounded-[3px] text-sm ">
              {data.badge_img && (
                <img
                  src={data.badge_img}
                  alt="badge"
                  className="w-4 h-4 inline mr-2"
                />
              )}
              {data.badge}
            </span>
          )}
          {data.title && (
            <h2 className="text-4xl md:text-5xl text-[#001233] font-bold mt-4">
              {data.title}
            </h2>
          )}
        </div>

        {/* Year Filters */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 mb-10 bg-[#FFFFFF] min-h-[60px] md:h-24 items-center shadow-sm rounded-lg px-4 md:px-6 w-fit mx-auto">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 md:px-4 py-2 rounded-md transition text-sm font-semibold cursor-pointer ${
                selectedYear === year ? "bg-[#1F7A4D] text-[#ffffff]" : "bg-[#F6F8FA] hover:bg-[#1F7A4D] hover:text-[#ffffff]"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Circular List */}
        <div className="space-y-4 max-w-7xl mx-auto mb-16 px-4">
          {filteredCirculars.length > 0 ? (
            filteredCirculars.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-[#ffffff] border-[0.76px] border-[#E2E8F0] shadow-sm rounded-lg p-4 md:px-6 md:py-4"
              >
                <div className="flex items-start md:items-center gap-3">
                  <div className="bg-linear-to-br from-[#FB2C36] to-[#E7000B] text-[#ffffff] p-2 rounded-lg flex-shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#0B3C5D] mb-2">{item.heading}</p>
                    <p className="text-sm text-[#62748E] flex items-center gap-2">
                      <Calendar size={16} /> 
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <a 
                  href={item.button_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#1F7A4D] flex gap-1 text-sm font-medium hover:underline self-start md:self-center"
                >
                  View PDF <ArrowRight size={18} />
                </a>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No circulars available at the moment.</p>
              <p className="text-gray-400 text-sm mt-2">Please check back later for updates.</p>
            </div>
          )}
        </div>
      {/* </section> */}
    </InnerPageLayout>
  );
}
