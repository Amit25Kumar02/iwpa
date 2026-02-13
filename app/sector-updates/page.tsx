"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { CalendarDays, Download } from "lucide-react";

import { formatImageUrl } from "@/lib/utils";

interface UpdateItem {
  id: number;
  heading: string;
  date: string;
  button: string;
  button_url: string | null;
}

interface PageData {
  badge: string;
  badge_img?: string;
  title: string;
  updates: UpdateItem[];
}

export default function SectorUpdatesPage() {
  const API = process.env.NEXT_PUBLIC_STRAPI_URL;
  const [data, setData] = useState<PageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API}/api/sectorupdate?populate=*`
        );

        const d = res.data.data;

        const formattedUpdates = d.sectorcard?.map((item: any) => ({
          id: item.id,
          heading: item.heading,
          date: new Date(item.date).toLocaleDateString(),
          button: item.button,
          button_url: item.button_url,
        })) || [];

        setData({
          badge: d.badge,
          badge_img: formatImageUrl(d.badge_img?.[0]?.url),
          title: d.title,
          updates: formattedUpdates,
        });
      } catch (err) {
        console.error("Sector updates fetch error:", err);
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <InnerPageLayout
      title="Sector Updates"
      breadcrumbs={[{ label: "Sector Updates" }]}
    >
      <div className="text-center mb-12 md:px-20">
        {data.badge && (
          <span className="inline-flex items-center gap-2 bg-[#1F7A4D0F] border-[0.86px] border-[#1F7A4D33] text-[#1F7A4D] px-4 py-2 rounded-md text-sm font-medium mb-4">
            {data.badge_img && data.badge_img !== '' && (
              <img
                src={data.badge_img}
                alt="badge"
                className="w-4 h-4"
              />
            )}
            {data.badge}
          </span>
        )}

        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-[#001233]">
            {data.title}
          </h2>
        )}
      </div>

      <div className="space-y-6 md:px-20">
        {data.updates.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#ffffff] p-6 rounded-xl border-[0.76px] border-[#E2E8F0] shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-[#0B3C5D] mb-2">
                {item.heading}
              </h3>
              <p className="flex items-center gap-2 text-sm text-[#62748E]">
                <CalendarDays size={14} />
                {item.date}
              </p>
            </div>

            <a
              href={item.button_url || "#"}
              target="_blank"
              className="inline-flex w-fit items-center gap-2 border-[1.52px] border-[#1F7A4D] text-[#1F7A4D] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0B6B3A] hover:text-[#ffffff] transition"
            >
              <Download size={16} />
              {item.button}
            </a>
          </div>
        ))}
      </div>
    </InnerPageLayout>
  );
}
