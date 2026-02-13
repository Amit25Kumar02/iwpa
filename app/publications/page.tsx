"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Calendar } from "lucide-react";

interface Publication {
  id: number;
  date: string;
  year: number;
  img?: string;
}

interface SectionHeader {
  badge: string;
  badge_img?: string;
  title: string;
}

export default function PublicationsPage() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;

  const [publications, setPublications] = useState<Publication[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [header, setHeader] = useState<SectionHeader | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch header and publications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/publication?populate[0]=badge_img&populate[1]=publicationpagecard&populate[2]=publicationpagecard.img`);
        const d = res.data.data;
        
        setHeader({
          badge: d.badge,
          badge_img: d.badge_img?.url ? `${API}${d.badge_img.url}` : undefined,
          title: d.title,
        });
        
        // Extract publications from publicationpagecard array
        const publicationsArray = d.publicationpagecard || [];
        const formatted = publicationsArray.map((item: any) => {
          const dateObj = new Date(item.date);
          return {
            id: item.id,
            date: dateObj.toLocaleDateString(),
            year: dateObj.getFullYear(),
            img: item.img?.url ? `${API}${item.img.url}` : undefined,
          };
        });
        
        setPublications(formatted);
        setSelectedYear(formatted[0]?.year || null);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const years = [...new Set(publications.map((p) => p.year))];
  const filtered = selectedYear
    ? publications.filter((p) => p.year === selectedYear)
    : publications;

  return (
    <InnerPageLayout
      title="Publications"
      breadcrumbs={[{ label: "Publications" }]}
    >
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <>
          <div className="text-center mb-12 md:px-20">
        {header?.badge && (
          <span className="inline-flex items-center gap-2 bg-[#1F7A4D0F] border-[0.86px] border-[#1F7A4D33] text-[#1F7A4D] px-4 py-2 rounded-md text-sm font-medium mb-4">
            {header.badge_img && (
              <img
                src={header.badge_img}
                alt="badge"
                className="w-4 h-4"
              />
            )}
            {header.badge}
          </span>
        )}

        {header?.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-[#001233]">
            {header.title}
          </h2>
        )}
      </div>

      {/* Year Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 md:px-20">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedYear === year
                ? "bg-[#1F7A4D] text-[#ffffff]"
                : "bg-[#F6F8FA] text-[#001233] hover:bg-[#e2e8f0]"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Publication Grid */}
      <div className="grid md:grid-cols-4 gap-6 md:px-20">
        {filtered.map((publication) => (
          <div
            key={publication.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200"
          >
            {publication.img && (
              <img
                src={publication.img}
                alt={`Publication ${publication.year}`}
                className="w-full h-auto object-cover"
              />
            )}
            
            {/* <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span className="text-sm">{publication.date}</span>
              </div>
            </div> */}
          </div>
        ))}
      </div>
        </>
      )}
    </InnerPageLayout>
  );
}
